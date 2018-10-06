require('dotenv').config();
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

   findById: (req, res) => {
       User.findById(req.decoded.id).populate('todo').exec().then((user) => {
           ServerResponse.success(res, 200, 'user info', user);
       }).catch((err) => {
           ServerResponse.error(res, 500, err);
       });
   }
};




