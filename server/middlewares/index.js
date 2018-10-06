require('dotenv').config();
const jwt = require('jsonwebtoken');
const ServerResponse = require('../helpers/serverResponse');

module.exports = {
    isLogin: (req, res, next) => {
        try {
            let decoded = jwt.verify(req.headers['access-token'], process.env.JWT_KEY);
            
            req.decoded = decoded;
            
            next();
        } catch (error) {
            ServerResponse.error(res, 401, {message: 'Please login first'});
        }
    }
};
