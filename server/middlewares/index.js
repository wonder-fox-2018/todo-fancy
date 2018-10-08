require('dotenv').config();
const jwt = require('jsonwebtoken');
const ServerResponse = require('../helpers/serverResponse');
const User = require('../models/user');
const mongoose = require('mongoose')

module.exports = {
    isLogin: (req, res, next) => {
        try {
            let decoded = jwt.verify(req.headers['access-token'], process.env.JWT_KEY);
            
            req.decoded = decoded;
            
            User.findById(req.decoded.id).then((result) => {
                next();
            }).catch((err) => {
                ServerResponse.error(res, 401, {message: 'user is not authorized'});
            });
            
            
        } catch (error) {
            ServerResponse.error(res, 401, {message: 'Please login first'});
        }
    },

    hasAuthorization: (req, res, next) => {
        
        User.findById(req.decoded.id).populate('todo').exec().then((user) => {
            
            let hasAuthorization = false;
            
            user.todo.forEach(task => {
                
                if (task._id == req.body.id) {
                    hasAuthorization = true;
                }
            });

            if (hasAuthorization) {
                next()
            } else {
                ServerResponse.error(res, 401, {message: 'user is not authorized'});
            }
        }).catch((err) => {
            ServerResponse.error(res, 500, err);
        });
    }
};
