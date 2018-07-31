// Import modules
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

// Define User schema
var UserSchema = new Schema({
	name: {
		type: String,
		unique: true
	},
	notes: [{
		type: Schema.Types.ObjectId,
		ref: "Note"
	}]
});

var User = mongoose.model("User", UserSchema);

module.exports = User;