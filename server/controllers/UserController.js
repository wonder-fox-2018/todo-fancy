'use strict'

const jwt = require('jsonwebtoken')
const User = require('../models/user')
const hashPassword = require('../helpers/hashPassword')
const isEmail = require('../helpers/isEmail')

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
                            msg: 'ERROR: ',err
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

    }

    // login with Google
    static loginGoogle(req,res){

    }
}

module.exports = UserController