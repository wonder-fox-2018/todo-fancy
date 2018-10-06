'use strict'

const jwt = require('jsonwebtoken')
const User = require('../models/user')

function isLogin(req,res,next){
    if(req.headers.hasOwnProperty('token')){

        // get the token
        jwt.verify(req.headers.token, process.env.SECRETTOKEN,(err,decoded)=>{
            if(!err){
                //get the user
                User.findOne({
                    _id: decoded.userid
                })
                  .then(user=>{
                     if(user){
                        req.decoded = decoded
                        next()
                     }else if(user=== null){
                        res.status(400).json({
                            msg: 'ERROR: User not found'
                        })  
                     }
                  })
                  .catch(error=>{
                    res.status(500).json({
                        msg: 'ERROR: ',err
                    })      
                  })
            }else{
                res.status(500).json({
                    msg: 'ERROR: ',err
                })
            }
        })
    }else{
        res.status(500).json({
            msg: 'ERROR: Token is missing'
        });
    }
}

module.exports = isLogin