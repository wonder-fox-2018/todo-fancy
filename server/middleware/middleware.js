const User = require('../models/users')
const jwt = require('jsonwebtoken')

class Middleware {
    static authenticate(req,res,next){
        let token = req.headers.token
        if (token) {
            jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
                if (!err) {
                    User.findById(decoded.userId)
                    .then(function (user) {
                        req.id = user._id
                        next()
                    })
                } else {
                    res.status(403).json({
                        message : 'invalid token'
                    })
                }
            })
        } else {
            console.log('token not found')
            res.status(403).json({
                message : 'token not found'
            })
        }
    }    
}

module.exports = Middleware;