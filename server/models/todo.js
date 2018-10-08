const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  name:  String,
  description: String,
  status: {
    type : Boolean,
    default : false
  },
  dueDate : Date,
}, {
    timestamps : true
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo