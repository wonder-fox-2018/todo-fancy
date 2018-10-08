const User = require('../models/user')

function authTodoUser(req,res,next) {

  User.find({todoList : req.query.todosId})
  .populate("todoList")
  .then(function(task){
      next()
  })
  .catch(function(err){
      res.status(500).json({
          message : `access denied`
      })
  })

}

module.exports = authTodoUser