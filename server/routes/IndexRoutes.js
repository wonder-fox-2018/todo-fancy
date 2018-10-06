'use strict'
const router = require('express').Router()
const UserController = require('../controllers/UserController')

router.post('/register', UserController.registerUser)
      .post('/login', UserController.loginUser)
      .post('/logingoogle', UserController.loginGoogle)