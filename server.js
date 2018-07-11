// Import modules
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Create an express server
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: "application/vnd.api+json"}));

// GLOBAL VARIABLES
var PORT = process.env.PORT || 3000;

var characters = [{
	routeName: "yoda",
	name: "Yoda",
	role: "Jedi Master",
	age: 900,
	forcePoints: 2000
}, {
	routeName: "darthmaul",
	name: "Darth Maul",
	role: "Sith Lord",
	age: 200,
	forcePoints: 1200
}, {
	routeName: "obiwan",
	name: "Obi Wan Kenobi",
	role: "Jedi",
	age: 100,
	forcePoints: 1000
}];

// Start the server
app.listen(PORT, function() {
	console.log("You are listening on PORT: " + PORT);
});

app.get("/", function(request, response) {
	response.sendFile(path.join(__dirname, "view.html"));
});

app.get("/add", function(request, response) {
	response.sendFile(path.join(__dirname, "add.html"));
});

app.get("/api/:characters?", function(request, response) {
	var chosen = request.params.characters;

	if (chosen) {
		
		for (var i = 0; i < characters.length; i++) {
			if (characters[i].routeName === chosen) {
				response.json(characters[i]);
				return;
			}
		}

		response.send("No character found");
		return;
	}

	response.json(characters);

});

app.post("/api/new", function(request, response) {

	var newCharacter = request.body;

	characters.push(newCharacter);

	response.json(characters);
});


