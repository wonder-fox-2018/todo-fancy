var express = require('express');
var router = express.Router();
const UserController = require('../controllers/userController');
const Middlewares = require('../middlewares');
const taskRoute = require('./task');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('home');
});

router.post('/register', UserController.register);

router.post('/login', UserController.login);

router.post('/signin/google', UserController.googleSignIn);

router.use(Middlewares.isLogin);

router.get('/user-info', UserController.findById);

router.use('/task', taskRoute);




module.exports = router;
