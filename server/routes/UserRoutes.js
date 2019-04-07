'use strict'

const router = require('express').Router()
const UserController = require('../controllers/UserController')
const isLogin = require('../middlewares/isLogin')

router.get('/detail', isLogin, UserController.getUserDetail)

module.exports = router