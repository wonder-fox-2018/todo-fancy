var express = require('express');
var router = express.Router();
const UserController=require('../controllers/userController')




/* GET home page. */
router.post('/signin/google', UserController.loginG );


module.exports = router;
