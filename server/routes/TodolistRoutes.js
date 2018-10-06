'use strict'

const router = require('express').Router()
const TodolistController = require('../controllers/TodolistController')
const isLogin = require('../middlewares/isLogin')

router.post('/', isLogin, TodolistController.createTodo)
      .get('/lists', isLogin, TodolistController.displayListTodoByUserid)
      .get('/:id', isLogin, TodolistController.displayIndividualTodo)
      .put('/:id', isLogin, TodolistController.editIndividualTodo)
      .delete('/:id',isLogin, TodolistController.deleteIndividualTodo)

module.exports = router