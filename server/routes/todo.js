const router = require('express').Router()

router.get('/',(req,res)=>{
    res.send('halo dari todo')
})

module.exports = router