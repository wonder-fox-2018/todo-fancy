var mongoose = require('mongoose');
var assert = require('assert');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: {
    type: String,
    required:true
  },
  email:  { 
    type: String,
    unique: true,
    required:true 
  },
  password: {
    type: String
    },
  role: String,
  oauth :{ 
    type:Number,
    default: 0
  }

});

var User=mongoose.model('User',userSchema);

module.exports=User;