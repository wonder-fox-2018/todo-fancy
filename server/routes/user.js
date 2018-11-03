const router = require('express').Router()
const Controller = require('../controllers/userController')
// const isLogin = require('../middleware/isLogin')

router.post('/signup', Controller.signup)
router.post('/signin', Controller.signin)
router.post('/signinGoogle', Controller.signinGoogle)
// router.put('/update/:id', isLogin, Controller.update)
// router.delete('/delete/:id', isLogin, Controller.remove)

module.exports = router