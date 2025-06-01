module.exports = function (d) {
  d.consoleManager.log("Loading anti crash module", 0, 0);
  process.on("unhandledRejection", (e, f) => {
    d.consoleManager.log("The anti crash module has recently prevented a crash. Enable DEBUG mode for more information", 5);
    d.consoleManager.log("Error: unhandledRejection, Reason: " + e, 5);
    f["catch"](g => {
      if (d.commonConfig.get().debug) {
        console.log(g);
      }
      d.errorManager.sendDevReport(g);
    });
  });
  process.on("uncaughtException", (e, f) => {
    d.consoleManager.log("The anti crash module has recently prevented a crash. Enable DEBUG mode for more information", 5);
    d.consoleManager.log("Error: uncaughtException, Reason: " + f, 5);
    if (d.commonConfig.get().debug) {
      console.log(e);
    }
    d.errorManager.sendDevReport(e);
  });
  process.on("uncaughtExceptionMonitor", (e, f) => {
    d.consoleManager.log("The anti crash module has recently prevented a crash. Enable DEBUG mode for more information", 5);
    d.consoleManager.log("Error: uncaughtExceptionMonitor, Reason: " + f, 5);
    if (d.commonConfig.get().debug) {
      console.log(e);
    }
    d.errorManager.sendDevReport(e);
  });
  d.consoleManager.log("Successfully enabled anti crash module", 0, 1);
};