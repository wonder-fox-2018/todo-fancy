const User = require('../models/userModel')
const jwt = require('jsonwebtoken');

module.exports = {
    isLogin: function (req, res, next) {
        jwt.verify(req.body.jwtToken, process.env.JWT_KEY, (err, decoded) => {
            if (err) {
                next(err.message)
            } else {
                req.userEmail = decoded.email,
                next()
            }
        })
    }
}