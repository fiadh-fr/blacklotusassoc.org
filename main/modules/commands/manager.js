module.exports = class x {
  constructor(d, e) {
    var D = {
      d: 0x79,
      e: 0x82,
      f: 0x7a,
      g: 0x6e,
      h: 0x81,
      i: 0x70,
      j: 0x75
    };
    this.client = d;
    this.name = e.data.name;
    this.description = e.data.description;
    this.category = e.category;
    this.discordAPI = e.data;
    this.plugin = e.plugin;
    this.global = e.global;
    this.ownerOnly = e.ownerOnly;
    this.custom = e.custom;
    this.bypass = e.bypass || false;
  }
};