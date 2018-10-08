const Todo = require('../models/todoList');
const mongodb = require('mongodb');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const nodeMailer = require('nodemailer');
const transporter = nodeMailer.createTransport({
  service: 'Gmail',
  auth: {
      user: 'agungatidhira@gmail.com',
      pass: process.env.GMAIL_PASSWORD
  }
});

module.exports = {
  addTask : function(req,res){
    // console.log(req.body);
    Todo.create({
      title : req.body.title,
      dueDate : req.body.dueDate,
      description : req.body.description
    })
    .then(data=>{
      console.log('ini datea--',data)
      //Verifying Token
      jwt.verify(req.body.token, process.env.JWT_SECRET, (err,decoded)=>{
       console.log(decoded)
        User.findOneAndUpdate({ email: decoded.email },
          { $push: { todolist: data._id } }
          )
          .then(data=>{
            console.log('keupdate', data)
            res.status(200).json({message: 'new todo is added'})
          })
          .catch(err=>{
            res.status(500).json({
              err
            });
          });
      });

    })
    .catch(err=>{
      res.status(500).json({
        err
      });
    });
  },

  deleteTask : function(req,res){
    Todo.deleteOne({_id: new mongodb.ObjectID(req.params.id)},(err)=>{
      if(!err){
        console.log(`Removed the document with the id a equal to ${req.params.id}`);
        res.status(200).json({
          msg : `success deleting with id : ${req.params.id}`
        });
      }
      else{
        res.status(500).json({
          msg : "failed deleting from database"
        });
      }
    });
  },

  updateTask : function(req,res){
    const data = req.body;
    Todo.updateOne({_id: new mongodb.ObjectID(req.params.id)},data,(err)=>{
      if(!err){
        res.status(200).json({
          msg : `Updated the document with id: ${req.params.id}`,
        });
      }
      else{
        res.status(500).json({
          msg : "failed updating to database"
        });
      }
    });
  },

  finishTask : function(req,res){
    Todo.updateOne({_id: new mongodb.ObjectID(req.params.id)},{status : "Finished"},(err)=>{
      if(!err){
        res.status(200).json({
          msg : `Updated the document with id: ${req.params.id}`,
        });
      }
      else{
        res.status(500).json({
          msg : "failed updating to database"
        });
      }
    });
  }
};