// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({
  type: "application/vnd.api+json"
}));

// Restaurant reservation data
// =============================================================
var reservation = [];
var wait = [];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});



// Search for Specific Reservation (or all reservations) - provides JSON
app.get("/api/:reservation?", function(req, res) {
  var chosen = req.params.reservation;

  if (chosen) {
    console.log(chosen);

    for (var i = 0; i < reservation.length; i++) {
      if (chosen === reservation[i].routeName) {
        return res.json(reservation[i]);
      }
    }
    return res.json(false);
  }
  return res.json(reservation);
});

// Search for Specific Wait (or all wait) - provides JSON

app.get("/api1/:wait?", function(req, res) {
  var chosen = req.params.wait;

  if (chosen) {
    console.log(chosen);

    for (var i = 0; i < wait.length; i++) {
      if (chosen === wait[i].routeName) {
        return res.json(wait[i]);
      }
    }
    return res.json(false);
  }
  return res.json(wait);
});


// Create New Reservation - takes in JSON input
app.post("/api/new", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  var newReservation = req.body;
  newReservation.routeName = newReservation.name.replace(/\s+/g, "").toLowerCase();
 

  console.log(newReservation);

  if (reservation.length<5) {
  // We then add the json the user sent to the reservation array
    reservation.push(newReservation);
    newReservation.conirmation = 'confirm reservation';
  }

  else {
    wait.push(newReservation);
    newReservation.conirmation = 'confirm waitlist';
  }
  // We then display the JSON to the users
  res.json(newReservation);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
