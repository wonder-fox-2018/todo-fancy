const taskRouter = require('express').Router();
const TaskController = require('../controllers/taskController.js');
const isLogin = require('../middlewares/isLogin.js');

taskRouter.get('/', isLogin, TaskController.showAll);
taskRouter.get('/:id', isLogin, TaskController.showOne);
taskRouter.post('/create', isLogin, TaskController.add);
taskRouter.put('/update/:id', isLogin, TaskController.update);
taskRouter.delete('/delete/:id', isLogin, TaskController.delete);
taskRouter.patch('/markdone/:id', isLogin, TaskController.markAsDone);
taskRouter.patch('/markundone/:id', isLogin, TaskController.markAsUndone);

module.exports = taskRouter;