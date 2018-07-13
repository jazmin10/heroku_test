// =========== HTML ROUTING ===========

// Import dependencies
	var path = require("path");

// ---------- MAIN PROCESSES ----------

	// Export the following function
	module.exports = function(app) {

		// When a route is "hit" with the following parameters...
		app.get("/:htmlRouting?", function(request, response) {
			// Determine what html page to send back
			determinePage(request, response);

		});
	}

// ---------- FUNCTIONS ----------

	// Determine what html page was requested
	function determinePage(htmlReq, htmlResp) {
	
		// Determine what route was "hit" and display the appropriate page
			switch (htmlReq.params.htmlRouting) {
				case undefined:
					displayPage(htmlResp, "/../public/home.html");
					break;
				case "survey":
					displayPage(htmlResp, "/../public/survey.html");
					break;
				// The browser also sends /favicon.io with each request
				// We don't want to take any action, therefore closing the route
				case "favicon.io":
					htmlResp.end();
				default:
					htmlResp.send("<h1>Cannot find page</h1>");
			}
	}

	// Responds with the appropriate html file
	function displayPage(res, page) {
		res.sendFile(path.join(__dirname, page));
	}

