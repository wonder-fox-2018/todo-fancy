const mongoose = require('mongoose')
const Schema = mongoose.Schema

const listSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'not yet'
    },
    importance: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const List = mongoose.model('List', listSchema)
module.exports = List