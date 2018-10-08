const router = require('express').Router(),
      { signIn, signUp } = require('../controllers/users'),
      { googleSignUp } = require('../controllers/googleSingIn'),
      { googleAuth, isLogin } = require('../middlewares/auth')


router
    .post('/create', signUp)
    .post('/login', signIn)
    .post('/googleLogin',googleAuth, googleSignUp)



module.exports = router