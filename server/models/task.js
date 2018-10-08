const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    name: String,
    description: String,
    isComplete: Boolean,
    due_date: Date
}, {
    timestamps: true
})

var Task = mongoose.model('Task', taskSchema);

module.exports = Task;