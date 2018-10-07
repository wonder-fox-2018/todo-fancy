const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var isEmail = function(val) {
    
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    return re.test(val);
}


const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'An Email with that address has already been registered, please use another one'],
        validate: isEmail
    },
    password: {
        type: String
    },
    name : {
        type: String,
        required: [true, 'name is required']
    },
    oauth: {
        type: Boolean,
        required: true
    },
    todo: [{type: Schema.Types.ObjectId, ref: 'Task'}]
}, {
    timestamps: true
})

var User = mongoose.model('User', userSchema);

module.exports = User;