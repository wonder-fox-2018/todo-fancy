const router = require('express').Router()
const todoController = require('../controllers/todoController')
const middleware = require('../middleware/middleware')

router.post('/create',middleware.authenticate, todoController.create)
router.get('/read',middleware.authenticate,todoController.read)


module.exports = router