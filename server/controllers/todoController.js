const Todo = require("../models/todo");
const User = require("../models/user");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports = {

    create(req, res) {
		User.findById(req.headers.userId)
        .exec()
        .then(userFound => {
            if (userFound) {
                Todo.create({
                    title: req.body.title,
                    deadline: req.body.deadline,
                    priority: req.body.priority,
                    notes: req.body.notes
                })
                .then(todoCreated => {
                    userFound.userTodos.push(todoCreated._id);
                    userFound.save();
                    res.status(200).json({
                        message: "todo successfully created",
                        data: todoCreated
                    });
                })
                .catch((err) => {
                    res.status(400).json(err);
                });
            } else {
                res.status(404).json({
                    message: "No User Found"
                });
            }
        })
        .catch((err) => {
            res.status(400).json(err);
        });
    },
    
    getAllTaskByUserId(req, res) {
		User.findById(ObjectId(req.headers.userId)).populate("userTodos")
        .then(userFound => {
            if (userFound && userFound.userTodos.length) {
                res.status(200).json({
                    message: "Todo Found",
                    data: userFound.userTodos
                });
            } else {
                res.status(404).json({
                    message: "Todo empty"
                });
            }
        })
        .catch((err) => {
            res.status(400).json(err);
        });
    },
    
    getOneById(req, res) {
		Todo.findById(ObjectId(req.params.todoId))
        .exec()
        .then(todo => {
            if (todo) {
                res.status(200).json({
                    message: "Todo found",
                    data: todo
                });
            } else {
                res.status(404).json({
                    message: "id not found"
                });
            }
        })
        .catch((err) => {
            res.status(400).json(err);
        });
    },
    
    deleteById(req, res) {
		User.findByIdAndUpdate(req.headers.userId, {
			$pull: { userTodos: { $in: ObjectId(req.params.todoId) } }
		})
        .exec()
        .then(response => {
            res.status(200).json({
                message: "Todo Deleted"
            });
        })
        .catch((err) => {
            res.status(400).json(err);
        });
    },
    
    updatebyId(req, res) {
		let changes = {
			title: req.body.title,
			deadline: req.body.deadline|| undefined,
			priority: req.body.priority,
			notes: req.body.notes
		};

		for(let key in changes){
			if(!changes[key] || !changes[key].length) {
				delete changes[key];
			}
		}

		Todo.findByIdAndUpdate({ _id: ObjectId(req.params.todoId) },changes,{ runValidators: true })
        .then(response => {
            res.status(200).json({
                message: "To do Successfully Updated"
            });
        })
        .catch((err) => {
            res.status(400).json(err);
        });
	}


}