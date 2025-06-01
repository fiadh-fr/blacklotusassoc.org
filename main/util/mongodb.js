require('dotenv').config();
const n = require("mongoose");
module.exports = function (d) {
  d.consoleManager.log("Contacting MongoDB services", 0, 0);
  n.set("strictQuery", false);
  n.connect(process.env.MONGODB_URI, { dbName: "BlackLotus-App" }).then(d.consoleManager.log("Successfully established MongoDB connection", 0, 1))["catch"](e => {
    d.consoleManager.log("An issue occured while connecting to the mongodb database", 5);
    if (d.commonConfig.get().debug) {
      d.consoleManager.log(e, 5);
    }
    process.exit(1);
  });
  n.connection.on("error", e => {
    d.consoleManager.log("An issue occured while contacting Mongo Database", 5);
    if (d.commonConfig.get().debug) {
      d.consoleManager.log(e, 5);
    }
  });
  n.connection.on("disconnected", () => {
    d.consoleManager.log("The application lost connection to Mongo Database", 5);
  });
  n.connection.on("reconnect", () => {
    d.consoleManager.log("The application reconnected to Mongo Database", 5);
  });
  n.connection.on("connect", () => {
    d.consoleManager.log("The application successfully connected to Mongo Database", 5);
  });
};