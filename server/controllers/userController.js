const User = require('../models/users');
const mongodb = require('mongodb');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const axios = require('axios');
const nodeMailer = require('nodemailer');
const transporter = nodeMailer.createTransport({
  service: 'Gmail',
  auth: {
      user: 'agungatidhira@gmail.com',
      pass: process.env.GMAIL_PASSWORD
  }
});

module.exports = {
  addUser : function(req,res){
    User.create({
      username : req.body.username,
      email : req.body.email,
      password : req.body.password
    })
    .then(data=>{
      const mailOptions = {
        from: '"ToDoList"', // sender address
        to: req.body.email, // list of receivers
        subject: `Hello, ${req.body.username}`, // Subject line
        text: 'Welcome to fancy todo list!, click link below to go to the web', // plain text body
        html: `<h1 style="
        border-bottom : 1px black solid;
        ">Welcome To Fancy Todo</h1>
          <h2>${req.body.username}</h2>
          <a href"#">Click Here!</a>
        `
    };
        transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          res.status(500).json({
            error
          });
        } else {
          res.status(201).json({
            data
          });
        }
        });
    })
    .catch(err=>{
      res.status(500).json({
        err
      });
    });
  },

  showUser: (req, res) => {
    console.log(req.body);
    User
      .findOne({
          email: req.body.email
      })
      .then(user => {
        let isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
        if(isPasswordValid){
          jwt.sign({
            email : user.email
          }, process.env.JWT_SECRET,( err,token )=>{
            if( err ){
              res.status( 500 ).json({
                message : err.message
              });
            }
            else{
              res.status( 200 ).json({
                message : 'login success',
                token : token,
                email : user.email,
              });
            }
          });

          } else{
              res.status(404).json({
                  message: `Email not found`,
              });
          }
      })
      .catch(err => {
          res.status(404).json({
              message: err.message
          });
      });
  },
  googleLogin : function(req,res){
    //*Axios Request
    const {OAuth2Client} = require('google-auth-library');
    const client = new OAuth2Client('595266228745-tcbrob223qgqidcd75v31s6pp77bgor2.apps.googleusercontent.com');

    let ticket = new Promise((resolve, reject)=>{
      console.log(req.body.token)
      client.verifyIdToken({
      idToken: req.body.token,
      audience: '595266228745-tcbrob223qgqidcd75v31s6pp77bgor2.apps.googleusercontent.com',  
    },(err, data)=>{
        if(!err) {
          const payload = data.getPayload();
          const userid = payload['sub'];
          resolve(userid)
        } else {
          reject(err)
        }
      })
    })
    .then(userid=>{
      // console.log('masuk userid', req.body.token)
      axios({
        method: 'get',
        url: `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${req.body.token}`
      })
      .then(data=>{
        let token = jwt.sign({
          username: data.data.name,
          email: data.data.email
        }, process.env.JWT_SECRET)
  
        res.status(200).json({jwt: token, message : 'login success'})
      
      //*Check if user already in database
      User.findOne({
        email : data.data.email
      },(err,users)=>{
        if(!err){
          if(users === null){
            User.create({
              username : data.data.name,
              email : data.data.email,
              googleUser : 1
            }, (err,instance)=>{
              if(!err){
                console.log('new user created')
                // const mailOptions = {
                //   from: '"Fancy Todo"', // sender address
                //   to: data.data.email, // list of receivers
                //   subject: `Hello, ${data.data.name}`, // Subject line
                //   text: 'Hello world?', // plain text body
                //   html: `
                //   <h1 style="border-bottom : 1px black solid;>Welcome To Fancy Todo</h1>
                //     <h2>${data.data.name}</h2>
                //     <a href="#">Click Here!</a>
                //   `
                // };
                // transporter.sendMail(mailOptions, (error, info) => {
                //   if (error) {
                //     res.status(500).json({
                //       error
                //     });
                //   } else {
                //     res.status(201).json({
                //       data
                //     });
                //   }
                // });   
              }
              else {
                console.log('failed adding data');
                // res.status(500).json({
                //   message : "failed adding data"
                // });
              }
            });
          }
          //users not null
          else{
            console.log('already exist');
            // res.status(500).json({
            //   message : "email is already registered"
            // });
          }
        }
        //else error when findOne
        else{
          console.log('error connecting to database');
          // res.status(500).json({
          //   message : "error connecting to database"
          // });
        }
      });
    })
  })
  .catch(err=>{
    console.log('error in getting token google');
    res.send(err);
    });
  },

  findUser: (req, res) => {
    jwt.verify(req.headers.token,process.env.JWT_SECRET,(err,decoded)=>{
      if(!err){
        User.findOne({
          email: decoded.email
        })
        .populate('ToDoList')
        .exec(function (error, data) {
          if(!err){
            res.status(200).json({
              data: data.todolist
            });
          }
          else{
            res.status(500).json({
              error: error
            });
          }

        });
      }

      else{
        res.status(500).json({
          err
        });
      }

    });
  }
};