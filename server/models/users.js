const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name:   {
    type: String,
    required: [true,'Error "name" is required']
  },
  gender: {
    type: String,
    required: [true, 'Error "gender" is required']
  },
  phoneNumber: {
    type: String,
    required: [true, 'Error "phone number" is required']
  },
  address : {
    type: String,
    required: [true, 'Error "address" is required']
  },
  email: {
    type: String,
    required: [true, 'Error "email" is required'],
    unique: [true, 'Error "email" already in use']
  },
  password: {
    type: String,
    required: [true, 'Error "password" is required']
  },
  todoList: [{ type: Schema.Types.ObjectId, ref: 'Todo' }]
}, {
    timestamps : true
});

const User = mongoose.model('User', userSchema);

module.exports = User