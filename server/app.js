require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const cors = require('cors');
const indexRouter = require('./routes/indexRouter.js');
const userRouter = require('./routes/userRouter.js');
const taskRouter = require('./routes/taskRouter.js');

mongoose.connect('mongodb://localhost/todo-fancy', {useNewUrlParser: true});

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/tasks', taskRouter);

app.listen(port, function() {
    console.log('Listening on port', port);
});