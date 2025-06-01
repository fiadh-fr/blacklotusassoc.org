const d = require("../../../../main/modules/listener/manager.js");
module.exports = class e extends d {
  constructor(f) {
    const t = {
      f: 0x18f,
      g: 0x17a,
      h: 0x197,
      i: 0x18d,
      j: 0x19c,
      u: 0x174
    };
    const g = f.ms(f.commonConfig.get().auto_restart_every);
    if (g && g >= 60000) {
      super(f, {
        "listener": "autoRestart",
        "duration": g,
        "nextRun": Date.now() + g,
        "disabled": false
      });
    } else {
      f.consoleManager.log("Auto restart has been disabled.", 4);
      super(f, {
        "listener": "autoRestart",
        "duration": 0x0,
        "nextRun": 0x0,
        "disabled": true
      });
    }
  }
  async ["execute"]() {
    const u = {
      f: 0x188,
      g: 0x19d,
      h: 0x175,
      i: 0x187,
      j: 0x18a,
      v: 0x176
    };
    this.client.consoleManager.log("Auto restart has started.", 1);
    this.client.utilManager.restartSystem();
  }
};