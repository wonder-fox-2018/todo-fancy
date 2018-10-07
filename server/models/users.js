const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    username:{
        type: String
    },
    email:{
        type: String,
        unique: true
    },
    password:{
        type: String
    },
    todolist : [{
      type : mongoose.Schema.Types.ObjectId,
      ref : 'ToDoList'
    }],
    googleUser :{
        type : Number,
        default : 0
    }
},{
    timestamps: true
});

userSchema.pre('save', function(next) {
    if(this.password){
        let salt = bcrypt.genSaltSync(10);
        this.password  = bcrypt.hashSync(this.password, salt);
    }
    next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;