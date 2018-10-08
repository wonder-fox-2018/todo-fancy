const router = require('express').Router()
const todoController = require('../controllers/todoController')
const middleware = require('../middleware/middleware')

router.post('/create',middleware.authenticate, todoController.create)
router.get('/read',middleware.authenticate,todoController.read)
router.put('/update/:id',todoController.update)
router.delete('/delete/:id',todoController.delete)
router.put('/complete/:id',todoController.complete)

module.exports = router