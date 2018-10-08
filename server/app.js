const express = require('express'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    bodyParser= require('body-parser'),
    port = process.env.PORT || 3000,

    app = express()

const userRouter = require('./routes/users')

mongoose.connect('mongodb://localhost:27017/toDo');

app
    .use(express.json())
    .use(express.urlencoded({ extended: false }))
    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())
    .use(cors())

    .use('/', userRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
})