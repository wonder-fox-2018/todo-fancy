var express = require('express');
var router = express.Router();
var cors = require('cors')
const axios = require('axios')
const jwt = require('jsonwebtoken')

const CLIENT_ID="151224793788-4r8plfdiothhuoc6rhu797no88ebcu7b.apps.googleusercontent.com";

const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);

const UserModel= require('../models/userModel');

class UserController{


    static loginG(req,res,next){
        var googleToken= req.body.googleToken;
                //console.log('jalan')
    
                axios({
                    method:'GET',
                    url:`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${googleToken}`
                    
                })
                .then(function(response){
                    console.log(response.data)
                    UserModel.findOne({email:response.data.email})
                    .then(result=>{
                        if(result==null){
                            UserModel.create({ //jika tidak ada maka login berdasarkan oauth,password empty
                                name: response.data.name, 
                                email: response.data.email,
                                oauth: 1
                            })
                            .then(result=>{
                                const payload={
                                    name: response.data.name, 
                                    email: response.data.email,
                                 };   
                                 let token=jwt.sign(payload,process.env.SECRET_KEY)
                                 res.status(200).json({token:token}) 
                            })      
                            .catch(err=>{
                                res.status(500).json({message:err.message})
                            })           
                        }
                        else{
                            const payload={
                                name: response.data.name, 
                                email: response.data.email,
                             };   
                             //console.log(payload)
                             let token=jwt.sign(payload,process.env.SECRET_KEY)
                             res.status(200).json({token:token})  
                        }

                    })
                    
                })
                .catch(function(err){
                    res.status(500).json({message:err.message})
                })
          

     }
    
  
}

module.exports=UserController;