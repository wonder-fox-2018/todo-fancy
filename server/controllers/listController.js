const listModel = require('../models/listModel')

module.exports = {
    add: function(req, res) {
        listModel.find({
            name: req.body.name,
            userId: req.userId
        })
        .then(data => {
            if(data.length < 1) {
                listModel.create({
                    name: req.body.name,
                    desc: req.body.desc,
                    dueDate: req.body.dueDate,
                    importance: req.body.importance,
                    userId: req.userId
                })
                .then(() => {
                    res.status(201).json({})
                })
                .catch(err => {
                    res.status(500).json({message: err.message})
                })
            } else {
                res.status(500).json({message: 'Name has to be unique'})
            }
        })
        .catch(err => {
            res.status(500).json({message: err.message})
        })
    },

    show: function(req, res) {
        listModel.find({
            userId: req.userId
        })
        .then(data => {
            res.status(200).json({tasks: data})
        })
        .catch(err => {
            res.status(500).json({message: err.message})
        })
    },

    showImportance: function(req, res) {
        var result = [];
        if (req.params.state === 'a') {
            if (req.params.dir === 'asc') {
                listModel.find({
                    userId: req.userId,
                    importance: 'Very Important'
                })
                .then(data => {
                    listModel.find({
                        userId: req.userId,
                        importance: 'Important'
                    })
                    .then(data2 => {
                        listModel.find({
                            userId: req.userId,
                            importance: 'Unimportant'
                        })
                        .then(data3 => {
                            result.push(data, data2, data3)
                            res.status(200).json({tasks: result})
                        })
                    })
                })
                .catch(err => {
                    res.status(500).json({message: err.message})
                })
            } else if (req.params.dir === 'desc') {
                listModel.find({
                    userId: req.userId,
                    importance: 'Unimportant'
                })
                .then(data => {
                    listModel.find({
                        userId: req.userId,
                        importance: 'Important'
                    })
                    .then(data2 => {
                        listModel.find({
                            userId: req.userId,
                            importance: 'Very Important'
                        })
                        .then(data3 => {
                            result.push(data, data2, data3)
                            res.status(200).json({tasks: result})
                        })
                    })
                })
                .catch(err => {
                    res.status(500).json({message: err.message})
                })
            }
        } else {
            let month = String(new Date().getMonth() + 1)
            if (month.length === 1) {
                month = '0' + month
            }
            let day = String(new Date().getDate())
            if (day.length === 1) {
                day = '0' + day
            }
            if (req.params.dir === 'asc') {
                listModel.find({
                    userId: req.userId,
                    importance: 'Very Important',
                    dueDate: new Date().getFullYear() + '-' + month + '-' + day + ' 00:00:00.000Z'
                })
                .then(data => {
                    listModel.find({
                        userId: req.userId,
                        importance: 'Important',
                        dueDate: new Date().getFullYear() + '-' + month + '-' + day + ' 00:00:00.000Z'
                    })
                    .then(data2 => {
                        listModel.find({
                            userId: req.userId,
                            importance: 'Unimportant',
                            dueDate: new Date().getFullYear() + '-' + month + '-' + day + ' 00:00:00.000Z'
                        })
                        .then(data3 => {
                            result.push(data, data2, data3)
                            res.status(200).json({tasks: result})
                        })
                    })
                })
                .catch(err => {
                    res.status(500).json({message: err.message})
                })
            } else if (req.params.dir === 'desc') {
                listModel.find({
                    userId: req.userId,
                    importance: 'Unimportant',
                    dueDate: new Date().getFullYear() + '-' + month + '-' + day + ' 00:00:00.000Z'
                })
                .then(data => {
                    listModel.find({
                        userId: req.userId,
                        importance: 'Important',
                        dueDate: new Date().getFullYear() + '-' + month + '-' + day + ' 00:00:00.000Z'
                    })
                    .then(data2 => {
                        listModel.find({
                            userId: req.userId,
                            importance: 'Very Important',
                            dueDate: new Date().getFullYear() + '-' + month + '-' + day + ' 00:00:00.000Z'
                        })
                        .then(data3 => {
                            result.push(data, data2, data3)
                            res.status(200).json({tasks: result})
                        })
                    })
                })
                .catch(err => {
                    res.status(500).json({message: err.message})
                })
            }
        }
    },

    showSorted: function(req, res) {
        if (req.params.state === 'a') {
            listModel.find({
                userId: req.userId
            }).sort({
                [req.params.sort]: req.params.dir
            }).exec(function(err, data) {
                if (err) {
                    res.status(500).json({message: err.message})
                } else {
                    res.status(200).json({tasks: data})
                }
            });
        } else {
            let month = String(new Date().getMonth() + 1)
            if (month.length === 1) {
                month = '0' + month
            }
            let day = String(new Date().getDate())
            if (day.length === 1) {
                day = '0' + day
            }
            listModel.find({
                userId: req.userId,
                dueDate: new Date().getFullYear() + '-' + month + '-' + day + ' 00:00:00.000Z'
            }).sort({
                [req.params.sort]: req.params.dir
            }).exec(function(err, data) {
                if (err) {
                    res.status(500).json({message: err.message})
                } else {
                    res.status(200).json({tasks: data})
                }
            });
        }
    },

    showToday: function(req, res) {
        let month = String(new Date().getMonth() + 1)
        if (month.length === 1) {
            month = '0' + month
        }
        let day = String(new Date().getDate())
        if (day.length === 1) {
            day = '0' + day
        }
        listModel.find({
            userId: req.userId,
            dueDate: new Date().getFullYear() + '-' + month + '-' + day + ' 00:00:00.000Z'
        })
        .then(data => {
            res.status(200).json({tasks: data})            
        })
        .catch(err => {
            res.status(500).json({message: err.message})
        })
    },

    complete: function(req, res) {
        listModel.updateOne({_id: req.params.id, userId: req.userId}, {
            status: 'completed'
        })
        .then(() => {
            res.status(200).json({})
        })
        .catch(err => {
            res.status(500).json({message: err.message})
        })
    },

    remove: function(req, res) {
        listModel.deleteOne({_id: req.params.id, userId: req.userId})
        .then(() => {
            res.status(200).json({})
        })
        .catch(err => {
            res.status(500).json({message: err.message})
        })
    },

    edit: function(req, res) {
        let importancePossible = ['Very Important', 'Important', 'Unimportant']
        if (importancePossible.indexOf(req.body.importance) === -1) {
            listModel.updateOne({
                _id: req.params.id,
                userId: req.userId
            }, {
                name: req.body.name,
                desc: req.body.desc,
                dueDate: req.body.dueDate,
            })
            .then(() => {
                res.status(200).json({})
            })
            .catch(err => {
                res.status(500).json({message: err.message})
            })
        } else {
            listModel.updateOne({
                _id: req.params.id,
                userId: req.userId
            }, {
                name: req.body.name,
                desc: req.body.desc,
                dueDate: req.body.dueDate,
                importance: req.body.importance
            })
            .then(() => {
                res.status(200).json({})
            })
            .catch(err => {
                res.status(500).json({message: err.message})
            })
        }
        
    }
}