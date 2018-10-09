var express = require('express');
var router = express.Router();
const TodoController=require('../controllers/todoController')
const isLogin = require('../middleware/isLogin')



router.get('/', isLogin, TodoController.showTask)
router.get('/:id', isLogin, TodoController.showTaskbyid)
router.delete('/:id', isLogin, TodoController.deleteTaskbyid)
router.put('/:id', isLogin, TodoController.updateTaskbyid)
router.post('/', isLogin, TodoController.addTask)

module.exports = router;


