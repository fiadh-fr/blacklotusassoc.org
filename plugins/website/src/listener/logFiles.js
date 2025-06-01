const d = require("../../../../main/modules/listener/manager.js");
module.exports = class e extends d {
  constructor(f) {
    const t = {
      f: 0x1c6,
      g: 0x1c6,
      h: 0x1bf,
      i: 0x1b8,
      j: 0x1c5
    };
    const g = f.ms(f.commonConfig.get().console_logs_save_to_file_every);
    if (g && g >= 60000 && f.commonConfig.get().console_logs_to_file) {
      super(f, {
        "listener": "logFiles",
        "duration": g,
        "nextRun": Date.now() + g,
        "disabled": false
      });
    } else {
      f.consoleManager.log("Log files listener has been disabled.", 4);
      super(f, {
        "listener": "logFiles",
        "duration": 0x0,
        "nextRun": 0x0,
        "disabled": true
      });
    }
  }
  async ["execute"]() {
    const u = {
      f: 0x1c8,
      g: 0x1bd,
      h: 0x1cb,
      i: 0x1d5,
      j: 0x1c1
    };
    this.client.consoleManager.logManager.saveLogs();
  }
};