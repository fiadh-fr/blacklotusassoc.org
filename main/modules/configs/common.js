module.exports = class f {
  constructor(d) {
    this.client = d;
    this.config = null;
  }
  async ["load"]() {
    this.config = require("../../../common.json");
  }
  ["get"]() {
    var s = {
      d: 0x1f8
    };
    return this.config;
  }
};