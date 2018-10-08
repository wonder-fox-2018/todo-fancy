var express = require('express');
var router = express.Router();
const Controller = require('../controllers/todoController')

// To-do
router.post('/', Controller.addTask);
router.put('/:id', Controller.updateTask);
router.delete('/:id', Controller.deleteTask);
router.patch('/:id', Controller.finishTask);

module.exports = router;
