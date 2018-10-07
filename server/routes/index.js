var express = require('express');
var router = express.Router();
const ControllerUser = require('../controllers/userController')

/* GET home page. */
//User
router.post('/google-login',ControllerUser.googleLogin);
router.post('/register',ControllerUser.addUser);
router.post('/login',ControllerUser.showUser);
router.post('/findUser',ControllerUser.findUser);

module.exports = router;
