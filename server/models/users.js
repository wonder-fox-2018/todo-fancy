let hashPass = require("../helpers/hashPass")

const mongoose = require('mongoose'),
    Schema = mongoose.Schema

const userScheme = new Schema({
    name: {
        type: String,
        required: [true, 'username is required']
    },
    email: {
        type: String,
        unique: [true, `email is already exists`],
        required: [true, 'email is required']
    },
    password: {
        type: String,
        minlength: [5, 'password min 5 character'],
        required: [true, 'password is required']
    }
}, {
    timestamps: true
})

userScheme.pre('save', function(next) {
    this.password = hashPass(this.password)
    next()
})
  
const User = mongoose.model('User', userScheme)
module.exports = User