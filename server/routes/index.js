const router = require("express").Router()

router.use('/api/users',require('./users.js'))
router.use('/api/todos', require('./todos.js'));


module.exports = router;
