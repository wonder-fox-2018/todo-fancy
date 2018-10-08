require('dotenv').config()
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.G_CLIENT);
const User = require('../models/users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = {
    create: function(req, res){        
        User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        .then((result) => {            
            res.status(201).json({message: "User Created"})
        })
        .catch((err) => {            
            if(err) res.status(500).json({message: "create failed"})
        })
    },
    login: function(req, res){ 
               
        User.findOne({
            email: req.body.email,
            isGoogle: false
        })
        .then((data) => {                                                
            if(!data){
                res.status(400).json({message: "user not found"})
            } else {      
                // let isPass = bcrypt.compareSync(req.body.password, data.password)   
                if(req.body.password === data.password){  
                     console.log(data);
                                      
                    let user = jwt.sign({
                        id: data._id,
                        email: data.email,
                        name: data.name },
                        process.env.JWT_KEY );                              
                    res.status(200).json({
                        token: user
                    })
                } else {                    
                    res.status(400).json({message: "Wrong Password"})
                }
            }
        })
        .catch((err) => {
            res.status(500).json({message: err})
        })
    },
    cekLogin: function(req, res){




    }

        

}