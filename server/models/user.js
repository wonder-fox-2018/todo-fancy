const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const generatePassword = require('../helpers/generatePassword')

const userSchema = new Schema({
  name:   {
    type: String,
    required: [true,'name is required']
  },
  phoneNumber: {
    type: String,
    required: [true, 'phone number is required']
  },
  email: {
    type: String,
    required: [true, 'email is required'],
    unique: [true, 'email already exist']
  },
  password: {
    type: String,
    required: [true, 'password number is required']
  },
  todoList: [{ type: Schema.Types.ObjectId, ref: 'Todo' }]
}, {
    timestamps : true
});

userSchema.post('save', function(user) {

  generatePassword(this.email, this.password)
  .then(function(newPassword){
      User.update(
          { _id : user._id},
          { password : newPassword}
      )
      .then(function(){})
      .catch(function(){})
  })

})

const User = mongoose.model('User', userSchema);

module.exports = User