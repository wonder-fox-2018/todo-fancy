const User = require("../models/user");
const {auth} = require("../helpers");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports = {

    checkToken(req, res, next) {
		if (!req.headers.token) {
			res.status(401).json({
				message: "Unauthorized Access, please signin"
			});
		} else {
			next();
		}
    },
    
    checkifTokenValid(req, res, next) {
		let id;
		try {
            id = auth.decodeToken(req.headers.token).id;
            
			User.findById(ObjectId(id))
            .then(userFound => {
                if (userFound) {
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
				message: "Invalid Creditial"
			});
		}
    },
    
    addEmailToHeader(req, res, next) {

		User.findById(ObjectId(auth.decodeToken(req.headers.token).id))
        .then(userFound => {
            if (userFound) {
                req.headers.email = userFound.email;
                req.headers.userId = userFound._id;
                next();
            } else {
                res.status(204).json({
                    message: "invalid user"
                });
            }
        })
        .catch(err => {
            res.status(400).json(err)
        });
    },

    checkIfTodoOwnedByUser(req, res, next) {

		User.findById(ObjectId(auth.decodeToken(req.headers.token).id))
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
                    message: "Not Found"
                });
            }
        })
        .catch(err => {
            res.status(400).json(err);
        });
	}

}