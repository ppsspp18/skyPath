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

function searchItineraries(origin, destination, flights, airports) {
  const airportMap = Object.fromEntries(
    airports.map(a => [a.code, a])
  );

  const results = [];

  function dfs(path) {
    const last = path[path.length - 1];

    if (path.length > 3) return;

    if (last.destination === destination) {
      const meta = computeItineraryMeta(path, airportMap);
      results.push({
        segments: [...path],
        totalDurationMinutes: meta.totalDurationMinutes,
        totalPrice: meta.totalPrice,
      });
      return;
    }

    flights
      .filter(f => f.origin === last.destination)
      .forEach(next => {
        if (path.some(p => p.origin === next.destination)) return;
        if (!isValidLayover(last, next, airportMap)) return;

        dfs([...path, next]);
      });
  }

  flights
    .filter(f => f.origin === origin)
    .forEach(f => dfs([f]));

    results.sort(
    (a, b) => a.totalDurationMinutes - b.totalDurationMinutes
    );
  return results;
}

function computeItineraryMeta(segments, airportMap) {
  //  Convert first departure to UTC
  const startUTC = toUTC(
    segments[0].departureTime,
    airportMap[segments[0].origin].timezone
  );

  //  Convert last arrival to UTC
  const endUTC = toUTC(
    segments[segments.length - 1].arrivalTime,
    airportMap[segments[segments.length - 1].destination].timezone
  );

  //  Duration in minutes (timezone-safe)
  const totalDurationMinutes = Math.round(
    endUTC.diff(startUTC, "minutes").minutes
  );

  //  Total price
  const totalPrice = segments.reduce(
    (sum, seg) => sum + seg.price,
    0
  );

  return {
    totalDurationMinutes,
    totalPrice,
  };
}

module.exports = { searchItineraries, computeItineraryMeta };