module.exports = class r {
  constructor(d, e) {
    var x = {
      d: 0x202,
      e: 0x1fb,
      f: 0x1f7
    };
    this.client = d;
    this.event = e.event;
    this.once = e.once || false;
    this.name = e.name || null;
    this["default"] = e["default"] || false;
    this.plugin = e.plugin || "website";
    this.music = e.music || false;
  }
};