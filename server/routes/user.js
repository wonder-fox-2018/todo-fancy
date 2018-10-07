const router = require('express').Router()
const { GLogin } = require('../controllers/userController')

router.get('/glogin', GLogin)

module.exports = router