var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const todoSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    },
    dueDate: {
        type: Date,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})

var Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo