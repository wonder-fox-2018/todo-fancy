const jwt = require('jsonwebtoken')

const isLogin = (req, res, next) => {
  let token = req.headers.token

  if (token) {
    let decoded = jwt.verify(token, process.env.SECRET_KEY)
    req.params.decoded=decoded
    req.body.decoded = decoded
        //must check database
    next()
  } else {
    res.status(500).json({
        status: 'failed',
        message: 'you need to login first'
    })
  }
}

module.exports = isLogin