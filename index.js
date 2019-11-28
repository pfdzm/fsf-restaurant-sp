const path = require("path");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const tables = [];
const waitList = [];

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "/index.html")));

app.get("/tables", (req, res) =>
  res.sendFile(path.join(__dirname, "/tables.html"))
);

app.get("/reserve", (req, res) =>
  res.sendFile(path.join(__dirname, "/reserve.html"))
);

app.get("/api/tables", (req, res) => res.json(tables));

app.get("/api/waitlist", (req, res) => res.json(waitList));

// Create New Reservation - takes in JSON input
app.post("/api/tables", function(req, res) {
  try {
    console.log(req.body);
    const newReservation = req.body || {};

    // Using a RegEx Pattern to remove spaces from newCharacter
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    newReservation.customerName = newReservation.customerName
      .replace(/\s+/g, "")
      .toLowerCase();

    if (tables.length < 5) {
      tables.push(newReservation);
    } else {
      waitList.push(newReservation);
    }
    res.json(tables);
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
