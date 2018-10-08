var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('dotenv').config()
const bcrypt = require('bcryptjs') 

var isEmail = function(val) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(val);
}

const userSchema = new Schema({
    name: String,
    email: {
      type: String,
      unique: true,
      validate: isEmail,
      required: true
    },
    isGoogle: { 
      type: Boolean,
      default: false
    },
    password: {
      type: String,
      require: true
    }
}, {
  timestamps: true
});

// userSchema.pre('save', function(next){
//   console.log(this.password);
//   console.log(process.env.SALT);
  
//   this.password = bcrypt.hashSync(this.password, process.env.SALT)
//   console.log(this.password);
  
//   next()
// })

var User = mongoose.model('User', userSchema);

module.exports = User;