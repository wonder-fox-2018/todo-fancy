const Todo = require('../models/todos')

module.exports = {
    addTask: function(req, res){
        Todo.create({
            name: req.body.name,
            description: req.body.description,
            dueDate: req.body.dueDate,
            owner: req.user.id
        })
        .then((result) => {
            res.status(201).json({message: 'Add Task Sucess'})
        }).catch((err) => {
            res.status(500).json(err)
        });


    },
    editTask: function(req, res){
        Todo.updateOne({_id: req.params.id},
            {$set: {
                name: req.body.name,
                description: req.body.description,
                dueDate: req.body.dueDate,
                status: req.body.status
                }
            })
            .then((result) => {
                res.status(200).json({message: 'Update Task Sucess'})
            }).catch((err) => {
                res.status(500).json(err)
            });
    },
    deleteTask: function(req, res){
        Todo.deleteOne({
            _id: req.params.id
        })
        .then(result => {
            res.status(200).json({message: 'delete Task Sucess'})
        }).catch((err) => {
            res.status(500).json(err)
        });
    },
    showTask: function(req, res){
        Todo.find({
            owner: req.user.id
        })
        .then(result => {
            res.status(200).json({data: result})
        })
        .catch(err => {
            res.status(500).json(err)
        })
    },
    finishTask: function(req, res){
        console.log('masuk');
        
        Todo.updateOne({_id: req.params.id},
            {$set: {
                status: true
            }
        })
        .then((result) => {
            res.status(200).json({message: "Task finished"})
        }).catch((err) => {
            res.status(500).json(err)
        });
    },
    deletetask: function(req, res){
        Todo.deleteOne({
            _id: req.params.id
        })
        .then((result) => {
            res.status(200).json({message: "Task Deleted"})
        }).catch((err) => {
            res.status(500).json(err)
        });
    },
    updateTask: function(req, res){
        Todo.updateOne({_id: req.params.id},
            {$set: {
                name: req.body.name,
                description: req.body.description,
                dueDate: req.body.dueDate,
            }
        })
        .then((result) => {
            res.status(200).json({message: "Task Updated"})
        }).catch((err) => {
            res.status(500).json(err)
        });
    }




    
}