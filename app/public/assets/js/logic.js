// =========== DETERMINING NEW USER'S MATCH ===========

$(document).ready(function() {
// ---------- MAIN PROCESSES ----------

	// When you click the submit button, display the modal window and...
	$('#modal-window').on('shown.bs.modal', function () {
		// find the new user's friend match
  	results();
	});

// ---------- FUNCTIONS ----------

	// Find the user's match based on the answers submitted
	function results() {
		var user = {
			name: $("#name-input").val().trim(),
			photo: $("#photo-input").val().trim(),
			scores: [
				parseInt($("#q1").val()),
				parseInt($("#q2").val()),
				parseInt($("#q3").val())
			]
		};

		// Resets the form
		$("form")[0].reset();


		$.ajax({
			url: "/api/new",
			method: "POST",
			data: JSON.stringify(user),
			contentType: "application/json"
			// we set contentType to json because we cant to keep the numbers
			// as numbers. Otherwise, they turn into strings
			// In other we are telling jquery we are sending a json
		}).then(function(match) {
			$("#match-name").html(match.name);
			$("#match-photo").attr("src", match.photo);
		});
	}

});
