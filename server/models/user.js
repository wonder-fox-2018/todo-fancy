const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'Email already use']
    },
    password: {
        type: String,
        required : [true, 'Password is required']
    },
    name : {
        type: String,
        required: [true, 'name is required']
    },
    isGoogle: {
        type: Boolean,
        default : false
    },
    todo: [{type: Schema.Types.ObjectId, ref: 'Todo'}]
}, {
    timestamps: true
})

var User = mongoose.model('User', userSchema);

module.exports = User;