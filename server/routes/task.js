const router = require('express').Router();
const TaskController = require('../controllers/taskController');
const Middlewares = require('../middlewares');

router.get('/', TaskController.showAll);

router.post('/', TaskController.add);

router.use(Middlewares.hasAuthorization);

router.patch('/', TaskController.markAsComplete);

router.put('/', TaskController.update);

router.delete('/', TaskController.delete);

router.get('/info', TaskController.findById);


module.exports = router;