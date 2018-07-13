// =========== API ROUTING ===========

// ---------- GLOBAL VARIABLES ----------

	// Import array holding users/friends information
	var friends = require("./../data/friends.js");
	
// ---------- MAIN PROCESSES ----------

	// Export the following function holding api routing
	module.exports = function(app) {
		
		// Sends json of all friends
		app.get("/api/all", function(allReq, allResp) {
			allResp.json(friends);
		});
		
		// When a new user is added, determine their match 
		// and add them to the list of friends
		app.post("/api/new", function(newReq, newResp) {
			
			var newFriend = newReq.body;
			var match = findMatch(newFriend);
			
			newResp.json(match);
			friends.push(newFriend);
		});
	}

// ---------- FUNCTIONS ----------

	// Returns the new user's best match
	function findMatch(user) {

		// Sets the initial best compatibility score and match's index to the
		// first user in the friends array
		var bestComp = findScore(user.scores, friends[0].scores);
		var matchIndex = 0;

		// Loop through the friends array and determines which current user
		// has the best/lowest compatibility score with the new user 
		friends.forEach(function(currFriend, index) {
			var relScore = findScore(user.scores, currFriend.scores);
		
			if (relScore < bestComp) {
				bestComp = relScore;
				matchIndex = index;
			}
		});

		return friends[matchIndex];
	}

	// Returns the compatibility score of two users
	function findScore(userScores, friendScores) {
		var compatibility = 0;

		for (var i = 0; i < userScores.length; i++) {
			compatibility += Math.abs(userScores[i] - friendScores[i]);
		}

		return compatibility;
	}