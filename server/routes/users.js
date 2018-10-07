const router = require('express').Router()
const userController = require('../controllers/userController')

// router.get('/',(req,res)=>{
//     res.send('halo dari users')
// })

//BASIC SIGNUP AND SIGNIN
router.post('/signup',userController.signup)
router.post('/signin',userController.signin)

module.exports = router