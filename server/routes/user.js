const router = require('express').Router()
const { GLogin, RLogin, RRegister } = require('../controllers/userController')

router.get('/glogin', GLogin)
router.post('/rlogin', RLogin)
router.post('/register', RRegister)

module.exports = router