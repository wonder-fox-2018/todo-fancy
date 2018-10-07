require('dotenv').config();
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const axios = require('axios');
const User = require('../models/user');
const ServerResponse = require('../helpers/serverResponse');
const Token = require('../helpers/token');

module.exports = {
   register: (req, res) => {

        req.body.oauth = false;
        console.log(req.body);

        let {email, password, oauth, todo, name} = req.body;
        User.create({
            email,
            password,
            name,
            oauth,
            todo
        }).then((user) => {
            ServerResponse.success(res, 200, 'user has been registered', user);
        }).catch((err) => {
            ServerResponse.err(res, 500, 'unable to register user', err);
        });

   },

   login: (req, res) => {
       console.log('login');
       let {email, password} = req.body;

       User.findOne({
           email,
           password
       }).then((user) => {

            if (user) {
                let token = Token.sign(user);

                ServerResponse.success(res, 200, 'user has been logged in', token);
            } else {

                ServerResponse.error(res, 401, {message: 'unable to find the user'});
            }
            
       }).catch((err) => {
           
            ServerResponse.error(res, 500, err);

       });
       
   },

   googleSignIn(req, res) {

        let googleToken = req.body.token;

        var ticket = new Promise((resolve, reject) => {
            client.verifyIdToken({
                idToken: googleToken,
                audience: process.env.GOOGLE_CLIENT_ID
            }, (err, data) => {

                if (err) {
                    reject(err);
                } else {
                    const payload = data.getPayload();

                    const userId = payload['sub'];
                    resolve(userId);
                }
            })
        }).then((userId) => {

            axios({
                method: 'GET',
                url: `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${googleToken}`
            }).then((result) => {

                User.findOne({
                    email: result.data.email
                }).then((user) => {

                    if (user) {

                        let token = Token.sign(user);

                        ServerResponse.success(res, 200, 'user has been logged in', token);

                    } else {
                        let firstName = result.data.name.split(' ')[0];

                        User.create({
                            email: result.data.email,
                            password: null,
                            oauth: false,
                            name: result.data.name
                        }).then((user) => {
                            ServerResponse.success(res, 200, 'user has been registered', user);
                        }).catch((err) => {
                            ServerResponse.err(res, 500, 'unable to register user', err);
                        }); 
                    }
                }).catch((err) => {
                    res.status(500).json(err);
                });

            }).catch((err) => {
                res.status(500).json(err);
            });

        }).catch((err) => {
            res.status(500).json(err);
        });

   },

   findById: (req, res) => {
       User.findById(req.decoded.id).populate('todo').exec().then((user) => {
           ServerResponse.success(res, 200, 'user info', user);
       }).catch((err) => {
           ServerResponse.error(res, 500, err);
       });
   }
};




