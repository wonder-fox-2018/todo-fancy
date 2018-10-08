const User = require('../models/user')
const Todo = require('../models/todo')

class TodoController{
    static addTodo(req, res){
        Todo.create({
            title : req.body.title,
            description : req.body.description,
            dueDate : req.body.dueDate
        })
        .then(todo => {
            User.findByIdAndUpdate(req.login.id,{
                $push :{
                    todo : todo._id
                }
            })
            .then(user => {
                res.status(200).json({
                    message : `Success create todo list`
                })
            })
        })
        .catch(err => {
            res.status(500).json({message : err})
        })
    }
    
    static updateTodo(req, res){
        Todo.update({_id:req.params.id},{
            title : req.body.title,
            description : req.body.description,
            dueDate : req.body.dueDate
        })
        .then(todo => {
            res.status(200).json({
                message : `Update todo Success`
            })
        })
        .catch(err => {
            res.status(500).json({
                message : err
            })
        })
    }

    static findAllTodo(req, res){
        Todo.find()
        .then(todos => {
            res.status(200).json({todos})
        })
        .catch(err => {
            res.status(500).json({
                message : err
            })
        })

    }

    static deleteTodo(req, res){
        Todo.deleteOne({_id : req.params.id})
        .then(todo => {
            res.status(200).json({
                message : `Delete Success`
            })
        })
        .catch(err => {
            res.status(500).json({
                message : err
            })
        })
    }

    static setFinish(req, res){
        Todo.findOneAndUpdate({
            _id : req.params.id
        },{
            $set : {
                isFinish : true
            }
        })
        .then(todo => {
            res.status(200).json({
                message : `Your todo has been set to finish`
            })
        })
        .catch(err => {
            res.status(500).json({
                message : err
            })
        })
    }
    static setNotFinishYet(req, res){
        Todo.findOneAndUpdate({
            _id : req.params.id
        },{
            $set : {
                isFinish : false
            }
        })
        .then(todo => {
            res.status(200).json({
                message : `Your todo has been set to unFinish`
            })
        })
        .catch(err => {
            res.status(500).json({
                message : err
            })
        })
    }
    static showOne(req, res){
        Todo.findById(req.params.id)
        .then(todo => {
            res.status(200).json({todo})
        })
        .catch(err => {
            res.status(500).json({err})
        })
    }
}

module.exports = TodoController