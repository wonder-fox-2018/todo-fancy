'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// mongoose.connect('mongodb://localhost:27017/to-do');

var todoSchema = mongoose.Schema({

    title: String,
    task: String,
    date:Date,
    iduser: { type: Schema.Types.ObjectId, ref: 'Todo'},
    completed: {type: Boolean, default: false}
})

var Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;