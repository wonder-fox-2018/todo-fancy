const User = require("../models/user.js")
const Todo = require("../models/todo.js")
const {aunth} = require('../helpers')

module.exports = {

    create(req, res){
		User.create({
			name: req.body.name,
			email: req.body.email,
			password: aunth.hash(req.body.password)
		})
        .then(result =>{
            
            let token = aunth.createToken({
                id: result._id.toString()
            })

            res.status(200).json({
                message: "Register Success",
                token: token
            })
        }).catch(err =>
            res.status(400).json({
                message: err.message,
                data: err
            })
        );
    },
    
    verifyToken(req, res) {
		User.findById(
            ObjectId(aunth.decodeToken(req.body.token).id)
        )
        .then(userFound => {
            if (userFound) {
                res.status(200).json({
                    message: "OK",
                    data: {
                        name: userFound.name
                    }
                });
            } else {
                res.status(204).json({
                    message: "Not Found"
                });
            }
        })
        .catch(err => {
            res.status(400).json({
                message: err
            });
        });
    },
    
    login(req, res) {
		User.findOne({
            email: req.body.email
        })
        .exec()
        .then((user) => {
            if (user && aunth.compareSync(req.body.password,user.password)) {
                let token = aunth.createToken({
                    id: user._id.toString()
                })
                res.status(200).json({
                    message: "Login Success",
                    token: token
                })
            } else if(user !== null && req.body.password !== user.password){
                res.status(400).json({
                    message: "Wrong Password"
                })
            } else {
                res.status(400).json({
                    message: "Wrong Username & Password"
                })
            }
        })
        .catch(err => {
            res.status(402).json(err);
        });
    },
    
    getOneById(req, res) {
		User.findById(aunth.decodeToken(req.headers.token).id).populate("userTodos")
        .then(result => {
            res.status(200).json({
                message: "success",
                data: result
            });
        })
        .catch(err => {
            res.status(400).json({
                message: err.message,
                data: err
            })
        })
    },
    
    deleteById(req, res) {
		User.findById(req.headers.userId)
        .then(userFound => {
            if (userFound) {
                return Todo.remove({ _id: { $in: userFound.userTodos } });
            } else {
                res.status(404).json({
                    message: "User not found"
                });
            }
        })
        .then(response => {
            return User.deleteOne({ _id: ObjectId(req.headers.userId) });
        })
        .then(result => {
            res.status(200).json({
                message: "success",
                data: result
            });
        })
        .catch(err => {
            res.status(400).json({
                message: err.message,
                data: err
            });
        });
    },
    
    updatebyId(req, res) {
		let password = aunth.hash(
			req.body.password
		);
		User.findOneAndUpdate(
            { _id: ObjectId(req.headers.userId) }, 
            { password }
        )
        .exec()
        .then(result => {
            res.status(200).json({
                message: "update success",
                data: result
            });
        })
        .catch(err => {
            res.status(400).json({
                message: err.message,
                data: err
            });
        });
	}



}