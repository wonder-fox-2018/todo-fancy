const router = require('express').Router()
const userController = require('../controllers/user')


router.get('/',(req,res)=>{
    res.send('halo dari users')
})

module.exports = router