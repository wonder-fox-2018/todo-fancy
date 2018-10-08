const router = require('express').Router()
const userController = require('../controllers/userController')
const todoController = require('../controllers/todoController')

router.get('/', (req, res, next) => {
    res.send(`todo`)
})

router.post('/add', todoController.addTodo)
router.put('/update/:id', todoController.updateTodo)
router.get('/show', todoController.findAllTodo)
router.get('/showOne/:id', todoController.showOne)
router.delete('/delete/:id', todoController.deleteTodo)

router.patch('/setfinish/:id', todoController.setFinish)
router.patch('/setNotFinishYet/:id', todoController.setNotFinishYet)


module.exports = router