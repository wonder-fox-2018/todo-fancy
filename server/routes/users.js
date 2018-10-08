var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController')


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/all', userController.findAllUser)
router.get('/showAll', userController.showAllUserTodos)
router.get('/profile',userController.viewProfile)
router.put('/edit', userController.updateUser)
router.delete('/deleteProfile', userController.deleteUser)




module.exports = router;
