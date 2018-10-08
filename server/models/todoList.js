const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    description : {
        type : String
    },
    dueDate:{
        type: Date,
    },
    status : {
        type : String,
        default : "Unfinished"
    }
},{
    timestamps: true
});

const ToDoList = mongoose.model('ToDoList', todoSchema);
module.exports = ToDoList;