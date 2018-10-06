'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const beautify = require('mongoose-beautiful-unique-validation')

const UserSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        unique: 'Email has to be unique'
    },
    password: {
        type: String
    },
    thirdpartylogin: {
        type: String
    }
},{
    timestamps : true
})

UserSchema.plugin(beautify)

const User = mongoose.model('User', UserSchema)
module.exports = User