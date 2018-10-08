var express = require('express');
var router = express.Router();
const {create, login, cekLogin} = require('../controllers/users')
const {isLogin} = require('../middlewares/index')

router.post('/create', create)
router.post('/login', login)
router.get('/ceklogin', isLogin, (req, res) => {
    res.status(200).json({isLogin: true})
})



module.exports = router;
