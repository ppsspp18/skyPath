const fs = require("fs");
const path = require("path");

const raw = fs.readFileSync(
  path.join(__dirname, "./flights.json"),
);

const data = JSON.parse(raw);

module.exports = {
  airports: data.airports,
  flights: data.flights,
};