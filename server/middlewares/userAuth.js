const User = require("../models/users");
const AuthHelper = require("../helpers/authhelper");
const ObjectId = require("mongoose").Types.ObjectId;
require('dotenv').config()
PassWordGenerator = require('generate-password'),
jwt = require('jsonwebtoken'),
axios = require('axios'),
CLIENT_ID = process.env.CLIENT_ID,
{OAuth2Client} = require('google-auth-library'),
client = new OAuth2Client(CLIENT_ID)

class userAuthMiddleware {
	constructor() {}

	static googleAuth(req,res,next){
			console.log('masuk middleware/googleAuth')
			let googleToken = req.body.googleToken
			let ticket = new Promise(function(resolve, reject) {
			  client.verifyIdToken({
				idToken: googleToken,
				audience: CLIENT_ID
			  }, function(err, data) {
				if (!err) {
				  let payload = data.getPayload()
				  let userid = payload['sub']
				  resolve(userid)
				} else {
				  reject(err)
				}
			  })
			})
			.then (userid => {
		
			  axios({
				method: 'GET',
				url: `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${googleToken}`
			  })
			  .then(result => {
				req.body.name = result.data.name
				req.body.email = result.data.email
				let randomPassword = PassWordGenerator.generate()
				req.body.password = randomPassword
				next()
			  })
			  .catch(err => {
				res.status(500).json({
				  message: `access denied`
				})
			  })
			}) 
	}
	
	static checkToken(req, res, next) {
		//console.log(req.headers.token);
		if (!req.headers.token) {
			res.status(401).json({
				message: "Unauthorized Access, please signin"
			});
		} else {
			next();
		}
	}

	static checkifTokenValid(req, res, next) {
		let id;
		try {
			id = AuthHelper.decodeToken(req.headers.token).id;
			User.findById(ObjectId(id))
				.then(userFound => {
					if (userFound) {
						console.log("user found!");
						req.headers.userId = userFound._id;
						next();
					} else {
						res.status(204).json({
							message: "NK"
						});
					}
				})
				.catch(err => {
					res.status(400).json({
						message: err
					});
				});
		} catch (err) {
			res.status(400).json({
				message: "Invalid Signature"
			});
		}
	}

	static addEmailToHeader(req, res, next) {
		let id = AuthHelper.decodeToken(req.headers.token).id;
		User.findById(ObjectId(id))
			.then(userFound => {
				if (userFound) {
					console.log("user found!");
					req.headers.email = userFound.email;
					req.headers.userId = userFound._id;
					next();
				} else {
					res.status(204).json({
						message: "NK"
					});
				}
			})
			.catch(err => {
				res.status(400).json({
					message: err
				});
			});
	}

	static checkIfTodoOwnedByUser(req, res, next) {
		let id = AuthHelper.decodeToken(req.headers.token).id;
		User.findById(ObjectId(id))
			.then(userFound => {
				if (userFound) {
					if(userFound.userTodos.some(x => x.valueOf() == req.params.todoId)){
						next();
					}
					else{
						res.status(401).json({
							message:"Not Authorized"
						});
					}
					
				} else {
					res.status(204).json({
						message: "NK"
					});
				}
			})
			.catch(err => {
				res.status(400).json({
					message: err
				});
			});
	}
}

module.exports = userAuthMiddleware;
