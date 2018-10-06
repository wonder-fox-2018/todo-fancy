'use strict'

const Todolist = require('../models/todolist')
const User = require('../models/user')
const checkDate = require('../helpers/checkDate')

class TodolistController{

    // create new todo
    static createTodo(req,res){

        // check the date
        let datecheck = checkDate(req.body.duedate)

        Todolist.create({
            title: req.body.title,
            description: req.body.description,
            status: 'INCOMPLETE',
            duedate: datecheck,
            todouserid: req.decoded.userid
        })
          .then(todolist=>{
            let newTodo = todolist  
            // Update the user table
            User.findOneAndUpdate({
                _id: todolist.todouserid
            }, {
                $push: { listsTask: todolist._id}
            })
             .then(user=>{
                res.status(200).json({
                    msg: 'Todolist successfully created',
                    data: newTodo
                }) 
             })
             .catch(error=>{
                res.status(500).json({
                    msg: 'ERROR Create Todolist: ',error
                })
             })
          })
          .catch(error=>{
              res.status(500).json({
                  msg: 'ERROR Create Todolist: ',error
              })
          })
    }

    // display lists of todo by user id
    static displayListTodoByUserid(req,res){
        Todolist.find({
            todouserid: req.decoded.userid
        })
          .then(todolists=>{
            res.status(200).json({
                msg: `List of todo by user ${req.decoded.name}`,
                data: todolists
            })
          })
          .catch(error =>{
              res.status(500).json({
                  msg: 'ERROR Display list of Todo ', error
              })
          })
    }

    // display individual todo
    static displayIndividualTodo(req,res){
        Todolist.findOne({
            _id: req.params.id
        })
         .then(todolist =>{
             res.status(200).json({
                msg: 'Detail of todo',
                data: todolist
             })
         })
         .catch(error =>{
             res.status(500).json({
                 msg: 'ERROR Display details of Todo ',error
             }) 
         })
    }

    // edit individual todo
    static editIndividualTodo(req,res){
        Todolist.findOne({
            _id: req.params.id    
        })
         .then(todolist =>{
            // check if the user is authorized
            if(todolist && todolist.todouserid == req.decoded.userid){
                // validate status
                if(req.body.status === 'COMPLETE' || req.body.status === 'INCOMPLETE'){
                    let editDate = checkDate(req.body.duedate)

                    Todolist.findOneAndUpdate({
                        _id: req.params.id
                    },{
                        title: req.body.title,
                        description: req.body.description,
                        status: req.body.status,
                        duedate: editDate,
                        todouserid: req.decoded.userid
                    })
                     .then(todoupdate =>{
                        res.status(200).json({
                            msg: 'Todo has been updated',
                            data: todoupdate
                        })
                     })
                     .catch(error =>{
                         res.status(500).json({
                             msg: 'ERROR: ',error
                         })
                     })

                }else{
                    res.status(500).json({
                        msg: 'ERROR Status should be COMPLETE or INCOMPLETE'
                    })
                }
            }else if(todolist === null){
                res.status(400).json({
                    msg: 'Todolist was not found'
                })
            }else if(todolist.todouserid != req.decoded.userid){
                res.status(403).json({
                    msg: 'You are not authorized to edit'
                })
            }
         })
         .catch(error=>{
            res.status(500).json({
                msg: 'ERROR Edit details of Todo ',error
            }) 
         })
    } 

    // delete individual todo
    static deleteIndividualTodo(req,res){
        Todolist.findOne({
            _id: req.params.id
        })
         .then( todolist =>{
            // check if the user is authorized
            if(todolist && todolist.todouserid == req.decoded.userid){
                // delete the id from user table
                User.findOneAndUpdate({
                    _id: req.decoded.userid
                },{
                    $pull: {
                        listsTask: todolist._id
                    }
                })
                .then(user =>{
                    // now delete the todolist
                    Todolist.findOneAndRemove({
                        _id: req.params.id
                    })
                     .then(tododelete =>{
                        res.status(200).json({
                            msg: 'Todo has been deleted',
                            data: tododelete
                        })
                     })
                     .catch(error=>{
                        res.status(500).json({
                            msg: 'ERROR Delete todo ',error
                        }) 
                     })
                })
                .catch(error=>{
                    res.status(500).json({
                        msg: 'ERROR removing todo from user table ',error
                    })
                })
            }else if(todolist === null){
                res.status(400).json({
                    msg: 'Todolist was not found'
                })
            }else if(todolist.todouserid != req.decoded.userid){
                res.status(403).json({
                    msg: 'You are not authorized to delete'
                })
            }
         })
         .catch( error =>{
            res.status(500).json({
                msg: 'ERROR Delete details of Todo ',error
            })
         })
    }
}

module.exports = TodolistController