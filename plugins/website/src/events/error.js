const f = require("../../../../main/modules/events/manager.js");
const {
  Events: g
} = require("discord.js");
module.exports = class h extends f {
  constructor(d) {
    const u = {
      d: 0x100,
      e: 0xf6,
      i: 0x106
    };
    super(d, {
      "event": g.Error,
      "name": "nodeErrors",
      "default": true,
      "plugin": "general"
    });
    this.client = d;
  }
  async ["execute"](d) {
    const v = {
      d: 0xee,
      e: 0x101,
      i: 0xff,
      j: 0xfd,
      k: 0xf1
    };
    this.client.consoleManager.log("An unexpected error occurred.", 5);
    this.client.consoleManager.log('' + d, 5);
  }
};