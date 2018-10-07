const User = require('../models/userModel')
const axios = require('axios')
const jwt = require('jsonwebtoken');

module.exports = {
    
    FBLogin: function (req, res) {
        axios({
            method:'get',
            url:`https://graph.facebook.com/me?fields=email,name&access_token=${req.body.accessToken}`,
        })
        .then(result => {
            User.findOne({email: result.data.email}, (err, findResult) => {
                if (err) {
                    console.log(err)
                } else {
                    if(findResult) {
                        jwt.sign({
                            id: findResult._id,
                            email: result.data.email,
                            name: result.data.name
                        }, process.env.JWT_KEY, (err, token) => {
                            if (err) {
                                res.status(500).json({message: err.message})
                            } else {
                                res.status(201).json({token: token})
                            }
                        })
                    } else {
                        User.create({
                            email: result.data.email,
                            name: result.data.name
                        }, (err, user) => {
                            if (err) {
                                res.status(500).json({message: err.message})
                            } else {
                                jwt.sign({
                                    id: user._id,
                                    email: result.data.email,
                                    name: result.data.name
                                }, process.env.JWT_KEY, (err, token) => {
                                    if (err) {
                                        res.status(500).json({message: err.message})
                                    } else {
                                        res.status(201).json({token: token})
                                    }
                                })
                            }
                        })
                    }
                }
            })
        })
        .catch(err => {
            console.log(err)
        })
    },
    
    GLogin: function (req, res) {
        let name = req.body['profile[ig]']
        let email = req.body['profile[U3]']
        User.findOne({email: email}, (err, result) => {
            if (err) {
                console.log(err)
            } else {
                if(result) {
                    jwt.sign({
                        id: result._id,
                        email: email,
                        name: name
                    }, process.env.JWT_KEY, (err, token) => {
                        if (err) {
                            res.status(500).json({message: err.message})
                        } else {
                            res.status(201).json({token: token})
                        }
                    })
                } else {
                    User.create({
                        email: email,
                        name: name
                    }, (err, user) => {
                        if (err) {
                            res.status(500).json({message: err.message})
                        } else {
                            jwt.sign({
                                id: user._id,
                                email: email,
                                name: name
                            }, process.env.JWT_KEY, (err, token) => {
                                if (err) {
                                    res.status(500).json({message: err.message})
                                } else {
                                    res.status(201).json({token: token})
                                }
                            })
                        }
                    })
                }
            }
        })
    }
}