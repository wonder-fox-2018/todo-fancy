const Todo = require('../models/todo')
const User = require('../models/users')

class Controller {

    static create(req,res){
        let newTask = new Todo({
            name : req.body.name,
            description: req.body.description,
            dueDate : new Date()
            // dueDate : req.body.dueDate
        })

        newTask.save()
        .then(function(task){

            User.findByIdAndUpdate(
                { _id : req.id}, 
                { $push : { todoList : task._id } } 
            )
            .then(()=>{})
            .catch(()=>{})

            res.status(200).json({
                task
            })
        })
        .catch(function(err){
            res.status(500).json({
                err
            })
        })
    }

    static read(req,res){
        User.findById(req.id)
        .populate("todoList")
        .then(function(task){
            res.status(200).json({
                task
            })
        })
        .catch(function(err){
            res.status(500).json({
                err
            })
        })
    }

}

module.exports = Controller;