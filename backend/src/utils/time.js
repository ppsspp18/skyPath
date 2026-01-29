const { DateTime } = require("luxon");

function toUTC(time, timezone) {
  return DateTime.fromISO(time, { zone: timezone }).toUTC();
}

function diffMinutes(a, b) {
  return b.diff(a, "minutes").minutes;
}

module.exports = { toUTC, diffMinutes };
