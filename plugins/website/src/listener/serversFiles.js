const fs = require('fs');
const path = require('path');
const u = require("../../../../main/modules/listener/manager.js");

module.exports = class x extends u {
  constructor(d) {
    const L = {
      d: 0xee,
      e: 0xd8,
      f: 0xc8,
      g: 0x10a,
      h: 0xf4
    };
    super(d, {
      "listener": "serversFiles",
      "duration": 1000,
      "nextRun": Date.now() + 1000,
      "disabled": false
    });
  }

  async execute() {
    const M = {
      d: 0xe3,
      e: 0xc8,
      f: 0xfe,
      g: 0x11c,
      h: 0xc9,
      i: 0xd1,
      j: 0xeb,
      k: 0xd5,
      l: 0xf0,
      m: 0xe4,
      n: 0xdd,
      o: 0xc9,
      p: 0xf5,
      q: 0xfb,
      r: 0xf4,
      s: 0xcc,
      t: 0xf4,
      N: 0xf4,
      O: 0xec,
      P: 0x115,
      Q: 0xc3,
      R: 0xe8,
      S: 0xea,
      T: 0xe9,
      U: 0xf9,
      V: 0xfa,
      W: 0xea,
      X: 0x116,
      Y: 0xda,
      Z: 0xc5,
      a0: 0xed,
      a1: 0xfe,
      a2: 0x11c,
      a3: 0xff,
      a4: 0x100
    };

    try {
      const GuildData = await this.client.getModels("guildsDataDB");
    } catch (e) {
      this.client.consoleManager.log("An internal error occurred while updating the database.", 5);
      this.client.consoleManager.log(e, 5);
      if (this.client.commonConfig.get().debug) {
        this.client.consoleManager.log(e, 5);
      }
    }
  }
};
