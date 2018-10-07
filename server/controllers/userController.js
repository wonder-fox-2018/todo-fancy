const User = require('../models/users')
const { encrypt } = require('../helpers')
const jwt  = require('jsonwebtoken')
require('dotenv').config()
const bcrypt = require('bcrypt')

class Controller {
    static signup(req,res){
        encrypt(req.body.email, req.body.password)
        .then(function(encryptedPassword) {
            let newUser = new User({
                name:  req.body.name,
                gender: req.body.gender,
                phoneNumber: req.body.phone,
                address : req.body.address,
                email:   req.body.email,
                password: encryptedPassword
            })
            return newUser
        })
        .then(function(newUser) {
            newUser.save()

            res.status(200).json({
                message : 'Signup Success'
            })

        })
        .catch(function(err){
           console.log(err)
           res.status(500).json({
               error : err.errors
           })
        })
    }

    static signin(req,res){
        console.log('signin proces...')
        User.findOne({
            email : req.body.email
        })
        .then(function(dataUser){
            console.log(dataUser)
            let text = req.body.email + req.body.password
            let decrypt = bcrypt.compareSync(text, dataUser.password); // true

            if(decrypt == true){
                let token = jwt.sign({
                    userId : dataUser._id,
                    name : dataUser.name,
                    email : dataUser.email
                }, process.env.SECRET_KEY)

                res.status(200).json({
                    userId : dataUser._id,
                    name : dataUser.name,
                    email : dataUser.email,
                    token : token
                })
            }else{
                res.status(500).json({
                    message : 'Invalid password'
                })
            }
        })
        .catch(function(){
            res.status(500).json({
                message : `Invalid username`
            })
        })
    }
}

module.exports = Controller;