'use strict'

const router = require('express').Router()
const UserController = require('../controllers/UserController')

router.post('/detail', UserController.getUserDetail)

module.exports = router