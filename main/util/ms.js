var X = 1000;
var Y = 60000;
var Z = 3600000;
var a0 = 86400000;
var a1 = 604800000;
var a2 = 31557600000;
module.exports = function (e, f) {
  f = f || {};
  var g = typeof e;
  if (g === "string" && e.length > 0) {
    return a3(e);
  } else if (g === "number" && isFinite(e)) {
    return f.long ? a5(e) : a4(e);
  }
  throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(e));
};
function a3(e) {
  e = String(e);
  if (e.length > 100) {
    return;
  }
  var f = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);
  if (!f) {
    return;
  }
  var g = parseFloat(f[1]);
  var i = (f[2] || "ms").toLowerCase();
  switch (i) {
    case "years":
    case "year":
    case "yrs":
    case "yr":
    case "y":
      return g * 31557600000;
    case "weeks":
    case "week":
    case "w":
      return g * 604800000;
    case "days":
    case "day":
    case "d":
      return g * 86400000;
    case "hours":
    case "hour":
    case "hrs":
    case "hr":
    case "h":
      return g * 3600000;
    case "minutes":
    case "minute":
    case "mins":
    case "min":
    case "m":
      return g * 60000;
    case "seconds":
    case "second":
    case "secs":
    case "sec":
    case "s":
      return g * 1000;
    case "milliseconds":
    case "millisecond":
    case "msecs":
    case "msec":
    case "ms":
      return g;
    default:
      return undefined;
  }
}
function a4(e) {
  var f = Math.abs(e);
  if (f >= 86400000) {
    return Math.round(e / 86400000) + "d";
  }
  if (f >= 3600000) {
    return Math.round(e / 3600000) + "h";
  }
  if (f >= 60000) {
    return Math.round(e / 60000) + "m";
  }
  if (f >= 1000) {
    return Math.round(e / 1000) + "s";
  }
  return e + "ms";
}
function a5(e) {
  var f = Math.abs(e);
  if (f >= 86400000) {
    return a6(e, f, 86400000, "day");
  }
  if (f >= 3600000) {
    return a6(e, f, 3600000, "hour");
  }
  if (f >= 60000) {
    return a6(e, f, 60000, "minute");
  }
  if (f >= 1000) {
    return a6(e, f, 1000, "second");
  }
  return e + " ms";
}
function a6(e, f, g, i) {
  var j = f >= g * 1.5;
  return Math.round(e / g) + " " + i + (j ? "s" : '');
}