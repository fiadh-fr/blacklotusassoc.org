module.exports = class t {
  constructor(d, e, f, g) {
    var A = {
      d: 0xf3,
      e: 0xf6,
      f: 0xe9,
      g: 0xe7,
      h: 0xf9
    };
    this.client = d;
    this.name = e.name;
    this.author = e.author;
    this.version = e.version;
    this.requires_common_version = e.requires_common_version;
    this.configuration_files = e.configuration_files;
    this.exmanager = f;
    this.writer = g;
  }
};