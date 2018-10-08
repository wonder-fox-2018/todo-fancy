var express = require('express');
var mongoose = require('mongoose')
// mongoose.connect('mongodb://dwiwicaksono:yonetciomas2@ds123783.mlab.com:23783/todofancy', { useNewUrlParser: true })
mongoose.connect('mongodb://localhost:27017/todofancy', {useNewUrlParser: true});

var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users');
var todosRouter = require('./routes/todos');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter)
app.use('/users', usersRouter);
app.use('/todos', todosRouter);


module.exports = app;
