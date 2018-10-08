const router = require('express').Router()
const Controller = require('../controllers/todoController')
const isLogin = require('../middleware/isLogin')
const authTodoUser = require('../middleware/authTodoUser')

router.get('/findTask', isLogin, Controller.findAll)
router.post('/create', isLogin, Controller.create)
router.put('/update', isLogin, authTodoUser, Controller.update)
router.delete('/delete', isLogin, authTodoUser, Controller.remove)
router.put('/complete', isLogin, authTodoUser, Controller.complete)
router.put('/uncomplete', isLogin, authTodoUser, Controller.uncomplete)

//ADDITIONAL API
router.get('/quotes', Controller.quotes)

module.exports = router