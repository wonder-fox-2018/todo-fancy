const router = require('express').Router()

router.get('/',(req,res)=>{
    res.send('halo dari fancy todo index.js')
})

module.exports = router