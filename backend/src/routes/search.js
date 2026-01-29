const express = require("express");
const { flights, airports } = require("../data/flights");
const { searchItineraries } = require("../services/itineraryService");
const router = express.Router();

router.get("/", (req, res) => {
  const { origin, destination, date } = req.query;

  if (!origin || !destination || origin === destination) {
    return res.status(400).json({ error: "Invalid input" });
  }

  // Airport code validation
  const airOrigin = airports.find(a => a.code === origin);
  const airDestination = airports.find(a => a.code === destination);

  if (!airOrigin || !airDestination) {
    return res.status(400).json({ error: "Invalid airport code" });
  }

  const dayFlights = flights.filter(f =>
    f.departureTime.startsWith(date)
  );

  const itineraries = searchItineraries(
    origin, destination, dayFlights, airports
  );

  res.json(itineraries);
});

module.exports = router;