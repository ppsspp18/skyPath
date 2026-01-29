const express = require("express");
const { flights, airports } = require("../data/flights");
const { searchItineraries } = require("../services/itineraryService");
const router = express.Router();

router.get("/", (req, res) => {
  const { origin, destination, date } = req.query;

  if (!origin || !destination || origin === destination) {
    return res.status(400).json({ error: "Invalid input" });
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