const path = require("path");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const tables = [];
const waitList = [];

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "/index.html")));

app.get("/tables", (req, res) =>
  res.sendFile(path.join(__dirname, "/tables.html"))
);

app.get("/reserve", (req, res) =>
  res.sendFile(path.join(__dirname, "/reserve.html"))
);

// Create New Reservation - takes in JSON input
app.post("/api/tables", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newReservation = req.body;

  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newReservation.customerName = newReservation.name
    .replace(/\s+/g, "")
    .toLowerCase();

  if (table.lenth() < 5) {
    tables.push(newReservation);
  } else waitList.push(newReservation);
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
