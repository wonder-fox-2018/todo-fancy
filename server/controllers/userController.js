const User = require('../models/userModel.js');
const jwt = require('jsonwebtoken');
const encryptPassword = require('../helpers/encryptPassword.js');
const axios = require('axios');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

class UserController {
    static register(req, res) {
        encryptPassword(req.body);

        User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            googleLogin: 0
        })
            .then(function(user) {
                res.status(200).json(user);
            })
            .catch(function(err) {
                res.status(500).json(err.message);
            });
    }

    static login(req, res) {
        encryptPassword(req.body);

        User.findOne({
            email: req.body.email,
            password: req.body.password
        })
            .then(function(user) {
                if (user) {
                    const token = jwt.sign({id: user._id, name: user.name, email: user.email}, process.env.SECRET_TOKEN);
                    res.status(200).json({token: token});
                } else {
                    const err = {
                        message: 'Validation error: Wrong username or password'
                    };

                    res.status(500).json(err.message);
                }
            })
            .catch(function(err) {
                res.status(500).json(err.message);
            });
    }

    static googleLogin(req, res) {
        const googleToken = req.body.googleToken;
        var ticket = new Promise(function(resolve, reject) {
            client.verifyIdToken({
                idToken: googleToken,
                audience: process.env.GOOGLE_CLIENT_ID
            }, function(err, data) {
                if (err) {
                    reject(err);
                } else {
                    const payload = data.getPayload();
                    const userid = payload['sub'];
                    resolve(userid);
                }
            });
        })
            .then(function(userid) {
                axios({
                    method: 'GET',
                    url: `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${googleToken}`
                })
                    .then(function(userData) {
                        User.findOne({email: userData.data.email})
                            .then(function(user) {
                                if (user) {
                                    const token = jwt.sign({id: user._id, name: user.name, email: user.email}, process.env.SECRET_TOKEN);
                                    res.status(200).json({token: token});
                                } else {
                                    User.create({
                                        name: userData.data.name,
                                        email: userData.data.email,
                                        password: process.env.GIVEN_PASSWORD,
                                        googleLogin: 1
                                    })
                                        .then(function(newUser) {
                                            res.status(200).json(newUser);
                                        })
                                        .catch(function(err) {
                                            res.status(500).json(err.message);
                                        });
                                }
                            })
                            .catch(function(err) {
                                res.status(500).json(err.message);
                            });
                    })
                    .catch(function(err) {
                        res.status(500).json(err.message);
                    });
            })
            .catch(function(err) {
                res.status(500).json(err.message);
            });
    }

    static getUserProfile(req, res) {
        User.findOne({
            email: req.user.email
        }).populate('taskList')
            .then(function(user) {
                res.status(200).json(user);
            })
            .catch(function(err) {
                res.status(500).json(err.message);
            });
    }
}

module.exports = UserController;