const Task = require('../models/taskModel.js');
const User = require('../models/userModel.js');

class TaskController {
    static add(req, res) {
        Task.create({
            title: req.body.title,
            description: req.body.description,
            dueDate: req.body.dueDate
        })
            .then(function(task) {
                User.findOneAndUpdate({
                    _id: req.user._id
                }, {
                    $push: {
                        taskList: task._id
                    }
                })
                    .then(function(user) {
                        res.status(200).json({
                            task: task,
                            message: 'Successfully created a task'
                        });
                    })
                    .catch(function(err) {
                        res.status(500).json(err.message);
                    });
            })
            .catch(function(err) {
                res.status(500).json(err.message);
            });
    }

    static showAll(req, res) {
        Task.find({user: req.user._id}).populate('user')
            .then(function(tasks) {
                res.status(200).json(tasks);
            })
            .catch(function(err) {
                res.status(500).json(err.message);
            });
    }

    static showOne(req, res) {
        Task.find({_id: req.params.id}).populate('user')
            .then(function(task) {
                res.status(200).json(task);
            })
            .catch(function(err) {
                res.status(500).json(err.message);
            });
    }

    static update(req, res) {
        Task.update({_id: req.params.id}, {
            title: req.body.title,
            description: req.body.description,
            dueDate: req.body.dueDate
        })
            .then(function(task) {
                res.status(200).json({
                    message: 'Successfully updated task'
                });
            })
            .catch(function(err) {
                res.status(500).json(err.message);
            });
    }

    static delete(req, res) {
        Task.deleteOne({_id: req.params.id})
            .then(function(task) {
                res.status(200).json({
                    message: 'Successfully deleted task'
                });
            })
            .catch(function(err) {
                res.status(500).json(err.message);
            });
    }

    static markAsDone(req, res) {
        Task.findOneAndUpdate({_id: req.params.id}, {
            $set: {
                isDone: true
            }
        })
            .then(function(task) {
                res.status(200).json({
                    message: 'Successfully done the task'
                });
            })
            .catch(function(err) {
                res.status(500).json(err.message);
            });
    }

    static markAsUndone(req, res) {
        Task.find({_id: req.params.id})
            .then(function(task) {
                if (task[0].isDone === true) {
                    Task.update({_id: req.params.id}, {isDone: false})
                        .then(function(task) {
                            res.status(200).json({
                                message: 'Successfully undone the task'
                            });
                        })
                        .catch(function(err) {
                            res.status(500).json(err.message);
                        });
                } else if (task[0].isDone === false) {
                    const err = {
                        message: 'Your task is still marked as undone'
                    };
                    
                    res.status(500).json(err.message);
                }
            })
            .catch(function(err) {
                res.status(500).json(err.message);
            });
    }
}

module.exports = TaskController;