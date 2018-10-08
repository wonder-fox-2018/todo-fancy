var express = require('express');
var router = express.Router();
const {addTask, showTask, finishTask, deleteTask, updateTask} = require('../controllers/todos')
const {isLogin} = require('../middlewares/index')


router.post('/addTask', isLogin, addTask)
router.get('/showTask', isLogin, showTask)
router.put('/finishTask/:id', isLogin, finishTask)
router.delete('/:id', isLogin, deleteTask)
router.put('/:id', isLogin, updateTask)

module.exports = router;
