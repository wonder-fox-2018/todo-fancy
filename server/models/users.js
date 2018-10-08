const mongoose = require("mongoose");
let Schema = mongoose.Schema;
const validate = require('mongoose-validator');
const uniqueValidator = require('mongoose-unique-validator');

const nameValidator = [
    validate({
        validator: 'isLength',
        arguments: [3, 50],
        message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters',
      })
]


let userSchema = new Schema(
	{
		name: { type: String, required: true, validate:nameValidator },
		email: { type: String, required: true, unique:true },
		userTodos: [{ type: Schema.Types.ObjectId, ref: "Todo" }],
		password: { type: String, required: true },
		google_id: String
	},
	{
		timestamps: {
			createdAt: "created_at",
			updatedAt: "updated_at"
		}
	}
);

userSchema.plugin(uniqueValidator)
module.exports = mongoose.model("User", userSchema);
