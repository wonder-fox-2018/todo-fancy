const router = require('express').Router();
const TaskController = require('../controllers/taskController');

router.get('/', TaskController.showAll);

router.post('/', TaskController.add);

router.patch('/', TaskController.markAsComplete);

router.put('/', TaskController.update);

router.delete('/', TaskController.delete);

router.get('/info', TaskController.findById);


module.exports = router;