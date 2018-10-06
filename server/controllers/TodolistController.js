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
            status: 'UNCOMPLETE',
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

    }

    // display individual todo
    static displayIndividualTodo(req,res){

    }

    // edit individual todo
    static editIndividualTodo(req,res){

    }

    // delete individual todo
    static deleteIndividualTodo(req,res){

    }
}

module.exports = TodolistController