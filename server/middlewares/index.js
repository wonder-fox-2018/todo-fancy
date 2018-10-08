const jwt = require('jsonwebtoken')

module.exports = {
    isLogin: (req, res, next) => {
        let token = req.headers.token
        jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
            if (err) {
                next("Please Login first")
            } else {
                req.user = decoded
                next()
            }
        })
    }
}