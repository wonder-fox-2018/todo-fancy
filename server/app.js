const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

// let mongoDB = `mongodb://${process.env.mongodb_username}:${process.env.mongodb_password}@${
// 	process.env.mongodb_host
// }:${process.env.mongodb_port}/todofancy`;
// mongoose.connect(
// 	mongoDB,
// 	{ useNewUrlParser: true }
// );
// let db = mongoose.connection;
// db.on("error", console.error.bind(console, "MongoDB connection error"));
// db.once("open", function() {
// 	console.log("MongoDB Connected!");
// });

mongoose.connect('mongodb://localhost:27017/jqueryTodo',{ useNewUrlParser: true })

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.use('/', require('./routes'));

app.use(function(req, res, next) {
	next(new Error("Not Found").status(404))
})

module.exports = app;
