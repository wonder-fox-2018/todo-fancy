require("dotenv").config();
const cors = require("cors");
const express = require("express");
const logger = require("morgan");
const app = express();
const mongoose = require("mongoose");
const routes = require("./routes/index");
const authMiddleware = require("./middlewares/userAuth");
const User = require("./models/users");
const todoControl=require("./controllers/todoController")
jwt = require('jsonwebtoken')

mongoose.connect('mongodb://localhost:27017/todos',{ useNewUrlParser: true })

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.patch('/status/:todoId',todoControl.toogleStatus)
app.post('/signupgoogle',authMiddleware.googleAuth,function(req,res){
	User.findOne({
		email: req.body.email
	  })
		.then(data => {
		  if (!data) {
			User.create({
			  name: req.body.name,
			  email: req.body.email,
			  password: req.body.password
			})
			  .then(user => {
				jwt.sign({
				  id: user._id
				}, process.env.secret,
				  function (err, token) {
					res.status(200).json({
					  name: user.name,
					  token: token
					})
				})
			  })
			  .catch(err => {
				res.status(500).json({
				  message: err.message
				})
			  })
		  } else {
			jwt.sign({
			  id: data._id
			}, process.env.secret,
			  function (err, token) {
				res.status(200).json({
				  name: data.name,
				  token: token
				})
			  }
			)
		  }
		})

})

app.use("/", routes);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
	var err = new Error("Not Found");
	err.status = 404;
	next(err);
});


/// error handlers
// development error handler
// will print stacktrace
if (app.get("env") === "development") {
	app.use(function(err, req, res, next) {
		res.status(err.status).json({
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500).json({
		message: err.message,
		error: {}
	});
});

app.listen(process.env.PORT||3000, () => {
	console.log("Express connected!");
});

module.exports = app;
