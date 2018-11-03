const router = require('express').Router()
const routerUser = require('./user')
const routerTodos = require('./todo')

router.use('/users', routerUser)
router.use('/todos', routerTodos)

module.exports = router
