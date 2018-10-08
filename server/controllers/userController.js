const User  = require('../models/user')
const jwt   = require('jsonwebtoken')
const axios = require('axios')
const checkPassword = require('../helpers/checkPassword')
const { OAuth2Client } = require('google-auth-library')

module.exports = {

  signup: function (req, res) {

    let dataUser = new User({
      name: req.body.name,
      phoneNumber: req.body.phone,
      email: req.body.email,
      password: req.body.password
    })

    dataUser.save()
      .then( () => {
        res.status(200).json({
          message: 'signup success'
        })
      })
      .catch( (err) => {
        res.status(500).json({
          error : err.errors
        })
      })

  },

  signin: function (req,res) {

    let user = null
    User.findOne({
        email : req.body.email
    })
    .then(function(dataUser){
        if(dataUser) {
          user = dataUser
          return checkPassword(user.password, req.body.password, req.body.email)
        }else {
          res.status(404).json({
            message : `Email and password didn't match`
          })
        }
    })
    .then(function(){
      jwt.sign({
        userId : user._id,
      }, process.env.DATA_ACCESS, function(err,token){
        if(!err){
            res.status(200).json({
                name : user.name,
                email: user.email,
                token : token
            })
        } else {
            res.status(500).json({
                message : `Token not valid`
            })
        }
      })
    })
    .catch(function(){
        res.status(500).json({
            message : `Email and password didn't match`
        })
    })

  },

  signinGoogle(req, res) {
    const token = req.body.token
    const CLIENT_ID = '196184982638-ld52a4693dest6f343llmd86i85ula1q.apps.googleusercontent.com'

    const client = new OAuth2Client(CLIENT_ID)
    async function verify() {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID
      })
      const payload = ticket.getPayload();
      const userid = payload['sub']

      User.findOne({
          email: payload.email
        })
        .then((user) => {
          if (user) {
            let password = user.email + process.env.HASH_GOOGLE_LOGIN
            checkPassword(user.password, password, user.email)
              .then(function () {
                jwt.sign({
                  userId: user._id
                }, process.env.DATA_ACCESS, function (err, token) {
                  if (!err) {
                    res.status(200).json({
                      name: user.name,
                      email: user.email,
                      token: token
                    })
                  } else {
                    res.status(500).json({
                      err
                    })
                  }
                })
              })
              .catch((err) => {
                res.status(500).json({
                  message: `email and password didn't match`
                })
              })

          }  else {

            let dataUser = new User({
              name: payload.name,
              email: payload.email,
              phoneNumber: payload.email,
              password: payload.email + process.env.HASH_GOOGLE_LOGIN
            })

            dataUser.save()
              .then((user) => {
                jwt.sign({
                  userId : user._id,
                }, process.env.DATA_ACCESS, function(err,token){
                  if(!err){
                    res.status(200).json({
                      name : user.name,
                      email: user.email,
                      token : token
                    })
                  } else {
                    res.status(500).json({
                      message : `Token not valid`
                    })
                  }
                })
              })
              .catch((err) => {
                res.status(500).json({
                  err
                })
              })
          }
        })
    }
    verify().catch(console.error);
  }
}