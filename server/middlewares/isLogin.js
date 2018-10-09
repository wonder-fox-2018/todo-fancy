const jwt = require('jsonwebtoken');

module.exports = {
    isLogin: function (req, res, next) {
        jwt.verify(req.headers.token, process.env.JWT_KEY, (err, decoded) => {
            if (err) {
                next(err.message)
            } else {
                req.userId = decoded.id,
                next()
            }
        })
    }
}