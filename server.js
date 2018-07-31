// Import modules
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var User = require("./models/User.js");
var Note = require("./models/Note.js");

var PORT = process.env.PORT || 3000;
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/week18Populater");

var app = express();
var db = mongoose.connection;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(express.static("public"));

// Main processes
db.on("error", function(err) {
	console.log("database error:", err);
});

db.once("open", function() {
	console.log("mongoose connected succesfully");
});

app.listen(PORT, function() {
	console.log("listening on PORT:", PORT);
});

app.post("/newuser", function(newReq, newResp) {
	addUser(newReq, newResp);
});

app.post("/newnote", function(newNoteReq, newNoteResp) {
	addNote(newNoteReq, newNoteResp);
});

app.get("/notes", function(notesReq, notesResp) {
	grabNotes(notesResp);
});

app.get("/users", function(usersReq, usersResp) {
	grabUsers(usersResp);
});

app.get("/populatedUser", function(popReq, popResp) {
	populatedList(popResp);
});

function addUser(request, response) {
	var newUser = new User({
		name: "Ernest Hemingway"
	});

	newUser.save(function(err, doc) {
		if (err) {
			return response.send(err);
		}

		response.json(doc);
	});
}

function addNote(request, response) {
	var newNote = new Note(request.body);

	newNote.save(function(err, doc) {
		if (err) {
			throw response.send(err);
		}

		var condition = {};
		var query = {
			$push: {notes: doc._id}
		};

		User.findOneAndUpdate(condition, query, {new: true}, function(err, userDoc) {
			if (err) {
				throw response.send(err);
			}

			response.json(userDoc);
		});
	});
}

function grabNotes(response) {
	Note.find({}, function(err, notes) {
		if (err) {
			return response.send(err);
		}

		response.json(notes);
	});
}

function grabUsers(response) {
	User.find({}, function(err, users) {
		if (err) {
			return response.send(err);
		}

		response.json(users);
	});
}

function populatedList(response) {
	User.find({})
		.populate("notes")
		.exec(function(err, users) {
			if (err) {
				return response.send(err);
			}

			response.json(users);
		});
}




