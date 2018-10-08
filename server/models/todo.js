const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({
    title : String,
    description : String,
    isFinish : {
        type : Boolean,
        default : false
    },
    dueDate : Date
}, {
    timestamps : true
})

const Todo = mongoose.model('Todo', todoSchema)
module.exports = Todo