const { toUTC, diffMinutes } = require("../utils/time");

function isValidLayover(prev, next, airportsMap) {
  if (prev.destination !== next.origin) return false;

  const arrival = toUTC(prev.arrivalTime, airportsMap[prev.destination].timezone);
  const departure = toUTC(next.departureTime, airportsMap[next.origin].timezone);

  const layover = diffMinutes(arrival, departure);

  if (layover < 0 || layover > 360) return false;

  const isDomestic =
    airportsMap[prev.origin].country ===
    airportsMap[next.destination].country;

  const min = isDomestic ? 45 : 90;
  return layover >= min;
}
