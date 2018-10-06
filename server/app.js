'use strict'
require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

mongoose.connect('mongodb://localhost:27017/todolistfancydb' ,{useNewUrlParser : true})
app.use(express.urlencoded({ extended: false}))
app.use(express.json())
app.use(cors())

app.get('/' ,(req,res) => {  res.send('OK')  })

app.listen(process.env.PORT || 3000, () => { 
    console.log('You are listening to PORT ', process.env.PORT)
})