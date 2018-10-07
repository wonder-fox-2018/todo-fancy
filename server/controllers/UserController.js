'use strict'

const jwt = require('jsonwebtoken')
const User = require('../models/user')
const axios = require('axios')
const hashPassword = require('../helpers/hashPassword')
const isEmail = require('../helpers/isEmail')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

class UserController{

    // register user
    static registerUser(req,res){
        // check email first
        if(isEmail(req.body.email)){
            let hash = hashPassword(req.body.password)

            User.create({
                name: req.body.name,
                email: req.body.email,
                password: hash,
                thirdpartylogin: 'NO'
            })
            .then(user =>{
                // get jwt token
                jwt.sign({
                    userid: user._id,
                    name: user.name,
                    email: user.email
                },process.env.SECRETTOKEN, (err, token)=>{
                    if(!err){
                        res.status(200).json({
                            msg: 'User Registration Success',
                            token: token
                        })
                    }else{
                        res.status(500).json({
                            msg: 'ERROR TOKEN: ',err
                        })
                    }
                })
            })
            .catch(error =>{
                res.status(500).json({
                    msg: 'ERROR: ',error
                })
            })
        }else{
            res.status(500).json({
                msg: 'ERROR: Please check your email'
            })
        }
    }

    // login user
    static loginUser(req,res){
        // check email
        if(isEmail(req.body.email)){
            let hash = hashPassword(req.body.password)
            User.findOne({
                email: req.body.email,
                password: hash
            })
            .then(user=>{
                if(user){
                    // get the token
                    jwt.sign({
                        userid: user._id,
                        name: user.name,
                        email: user.email
                    },process.env.SECRETTOKEN, (err, token)=>{
                        if(!err){
                            res.status(200).json({
                                msg: 'User Login Success',
                                token: token
                            })
                        }else{
                            res.status(500).json({
                                msg: 'ERROR TOKEN: ',err
                            })
                        }
                    })
                }else if(user=== null){
                    res.status(400).json({
                        msg: 'User not found, Please check your email/password'
                    })
                }
            })
            .catch(error =>{
                res.status(500).json({
                    msg: 'ERROR: ',error
                })
            })
        }else{
            res.status(500).json({
                msg: 'ERROR: Please check your email'
            })
        }
    }

    // login with Google
    static loginGoogle(req,res){
        return new Promise((resolve,reject)=>{
            client.verifyIdToken({
              idToken: req.body.googletoken,
              audience: process.env.GOOGLE_CLIENT_ID
            },(err,result)=>{
                if(!err){
                    // console.log('RESULT--->', result)
                    // const payload = result.getPayload()
                    // const userid = payload['sub']
                    resolve('anything') // replace with anything instead of userid
                }else{
                    reject(err)
                }
            })
        })
         .then(accessok =>{
            // gain the data from Google
            axios({
               method: 'GET',
               url: `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${req.body.googletoken}` 
            })
              .then(result=>{
                // console.log('HASIL DATA--->', result.data)
                // check the user first
                User.findOne({
                   email: result.data.email  
                })
                 .then(user=>{
                    if(user){
                        // get the jwt token
                        jwt.sign({
                            userid: user._id,
                            name: user.name,
                            email: user.email
                        },process.env.SECRETTOKEN, (err,token)=>{
                            if(!err){
                              res.status(200).json({
                                 msg: 'User Login via Google Success',
                                 token: token
                              })
                            }else{
                              res.status(500).json({
                                  msg: 'ERROR TOKEN: ',err
                              })
                            }
                        })
                    }else if(user===null){
                        //create new user
                        let hash = hashPassword(process.env.DEFAULT_PASSWORD)
                        User.create({
                          name: result.data.name,
                          email: result.data.email,
                          password: hash,
                          thirdpartylogin: 'YES'
                        })
                         .then(user=>{
                            jwt.sign({
                               userid: user._id,
                               name: user.name,
                               email: user.email 
                            },process.env.SECRETTOKEN, (err,token)=>{
                               if(!err){
                                  res.status(200).json({
                                     msg: 'User Registration via Google Success',
                                     token: token
                                  })
                                }else{
                                    res.status(500).json({
                                        msg: 'ERROR TOKEN: ',err
                                    })
                                }
                           })
                         })
                         .catch(error =>{
                            res.status(500).json({
                                msg: 'ERROR: ',error
                            })         
                         })
                    }
                 })
                 .catch(error=>{
                    res.status(500).json({
                        msg: 'ERROR: ',error
                    })     
                 })
              })
              .catch(error=>{
                res.status(500).json({
                    msg: 'ERROR Get Data Google Login: ',error
                })      
              })
         })
         .catch(error =>{
            res.status(500).json({
                msg: 'ERROR Verify Google TOKEN Google Login: ',error
            })
         })
    }

    // get info of user by email
    static getUserDetail(req,res){
        User.findOne({
            email: req.decoded.email
        }).populate('listsTask')
          .then(user =>{
            res.status(200).json({
                msg: `Detail of user ${user.name}`,
                userid: user._id,
                name: user.name,
                email: user.email
            })
          })
          .catch(error =>{
            res.status(500).json({
                msg: 'ERROR: ',error
            })
          })
    }
}

module.exports = UserController