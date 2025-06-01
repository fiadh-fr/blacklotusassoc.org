require('dotenv').config();
const {
  readdirSync: m,
  readFile: n,
  existsSync: o,
  writeFile: p
} = require("fs");
const q = require("moment");
module.exports = class r {
  constructor(d) {
    const L = {
      d: 0xaa,
      e: 0xbd
    };
    this.client = d;
    this.oldConsoleText = '';
    this.consoleText = '';
    this.consoleFile = '';
    this.getFileName();
  }
  ["getFileName"]() {
    const M = {
      d: 0x9d,
      e: 0x9b,
      f: 0x91,
      g: 0x73,
      h: 0xcd,
      i: 0xca,
      j: 0x66,
      k: 0xab,
      l: 0xa8,
      s: 0xba,
      N: 0x92
    };
    if (this.client.commonConfig.get().console_logs_create_new_file_after_restart) {
      const d = m("./logs/").filter(f => f.endsWith(".txt"));
      const e = new Date();
      this.consoleFile = "console-" + e.getFullYear() + "-" + e.getMonth() + "-" + e.getDate() + "--" + d.length + ".txt";
    } else {
      this.consoleFile = "console.txt";
    }
  }
  ["loadData"]() {
    const O = {
      d: 0x74,
      e: 0x91,
      f: 0x76,
      g: 0x78,
      h: 0x78,
      i: 0xa7,
      j: 0x70,
      k: 0xb1,
      l: 0xc4,
      s: 0x8e,
      P: 0x9d,
      Q: 0xce,
      R: 0xa2,
      S: 0x72,
      T: 0x79,
      U: 0xba,
      V: 0xbe,
      W: 0x78,
      X: 0xb4,
      Y: 0x6a,
      Z: 0x8f,
      a0: 0xd0,
      a1: 0xa9,
      a2: 0xc8,
      a3: 0xa0,
      a4: 0x75,
      a5: 0xb7,
      a6: 0xb3,
      a7: 0xc0,
      a8: 0x7c,
      a9: 0x9a
    };
    const N = {
      d: 0x91,
      e: 0xa5,
      f: 0x98,
      g: 0x9f,
      h: 0xad,
      i: 0xab,
      j: 0xc0,
      k: 0xa6,
      l: 0xc9,
      s: 0x9d,
      O: 0x91,
      P: 0xc0,
      Q: 0x9d,
      R: 0x6b,
      S: 0xc6,
      T: 0x82
    };
    if (this.client.commonConfig.get().console_logs_create_new_file_after_restart) {
      this.consoleText = "--------------------------------------------------------\n\n             Date: " + q(Date.now()).format("dddd, MMMM Do YYYY, h:mm:ss a") + "\n             Version: " + this.client.version + "\n             App/Guild: " + process.env.DISCORD_APP_ID + " / " + process.env.DISCORD_GUILD_ID + "\n\n--------------------------------------------------------\n\n";
    } else if (o("./logs/" + this.consoleFile)) {
      n("./logs/" + this.consoleFile, "utf8", async (e, f) => {
        if (e) {
          this.consoleText = '';
          this.client.consoleManager.log("An internal error occured while loading logs from disk", 5);
          if (this.client.commonConfig.get().debug) {
            this.client.consoleManager.log(e, 5);
          }
          return;
        } else {
          this.consoleText = f;
        }
      });
    } else {
      this.consoleText = "--------------------------------------------------------\n\n             Date: " + q(Date.now()).format("dddd, MMMM Do YYYY, h:mm:ss a") + "\n             Version: " + this.client.version + "\n             App/Guild: " + process.env.DISCORD_APP_ID + " / " + process.env.DISCORD_GUILD_ID + "\n\n--------------------------------------------------------\n\n";
    }
    this.client.consoleManager.log("Successfully loaded log files from disk", 0, 1);
  }
  ["addLine"](d) {
    this.consoleText += d + "\n";
  }
  ["saveLogs"]() {
    const S = {
      d: 0xbd,
      e: 0x9e,
      f: 0xaa,
      g: 0x77,
      h: 0x9f,
      i: 0x92,
      j: 0x7f,
      k: 0x94,
      l: 0x97,
      s: 0x7a,
      T: 0x9d,
      U: 0xb0,
      V: 0xb2,
      W: 0xae,
      X: 0x71
    };
    const R = {
      d: 0xc2,
      e: 0x74,
      f: 0x9b
    };
    if (this.oldConsoleText != this.consoleText) {
      p("./logs/" + this.consoleFile, this.consoleText, e => {
        if (e) {
          this.client.consoleManager.log("An internal error occured while saving logs on disk", 5);
          if (this.client.commonConfig.get().debug) {
            this.client.consoleManager.log(e, 5);
          }
          return;
        }
      });
      this.oldConsoleText = this.consoleText;
    }
    this.client.consoleManager.log("Successfully saved log files on disk", 1);
  }
};