const router = require('express').Router()
const { FBLogin, GLogin } = require('../controllers/userController')

router.post('/fblogin', FBLogin)
router.post('/glogin', GLogin)

module.exports = router