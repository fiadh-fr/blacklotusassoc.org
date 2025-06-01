const a1 = require("./models/guildsDataDB.js");
const a2 = require("./models/reviewsDataDB.js");
const a3 = require("./models/siteDataDB.js");
module.exports = function (d) {
  switch (d) {
    case "guildsDataDB":
      return a1;
    case "reviewsDataDB":
      return a2;
    case "siteDataDB":
      return a3;
  }
};