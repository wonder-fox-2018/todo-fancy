const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const toDoScheme = new Schema({
    name: String,
    description: String,
    status: Boolean,
    due_date: Number
}, {
    timestamps: true
});

const ToDo = mongoose.model('ToDo', toDoScheme)
module.exports = ToDo