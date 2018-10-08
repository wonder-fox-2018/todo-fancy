const router = require("express").Router()
const userController = require('../controllers/userController.js')

// /api/users
router
.post("/signup", userController.create)
.post("/login", userController.login)
.post("/verifytoken", userController.verifyToken)

router
.get('/', userController.getOneById) 
.delete('/', userController.deleteById) 
.patch('/', userController.updatebyId); 


module.exports = router;
