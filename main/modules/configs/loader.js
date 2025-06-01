const {
  writeFile: s,
  existsSync: t,
  readFileSync: u,
  copyFileSync: v,
  mkdirSync: w
} = require("fs");
const x = require("json5-writer");
const y = require("json5");
module.exports = class z {
  constructor(d) {
    const T = {
      d: 0x216
    };
    this.client = d;
    this.configs = [];
  }
  async ["load"](d, e, f) {
    const V = {
      d: 0x1ed,
      e: 0x225,
      f: 0x1d1,
      g: 0x1fa,
      h: 0x20d,
      i: 0x1ee,
      j: 0x20c,
      k: 0x1e4,
      l: 0x21c,
      m: 0x1d0,
      n: 0x244,
      o: 0x1ed,
      p: 0x1d9,
      q: 0x22e,
      r: 0x209,
      W: 0x24a,
      X: 0x1d6,
      Y: 0x208,
      Z: 0x23d,
      a0: 0x1e7,
      a1: 0x1ef,
      a2: 0x1d2,
      a3: 0x1d4,
      a4: 0x219,
      a5: 0x20f,
      a6: 0x23e,
      a7: 0x1ef,
      a8: 0x240,
      a9: 0x1fc,
      aa: 0x20c,
      ab: 0x22c,
      ac: 0x213,
      ad: 0x1ed,
      ae: 0x201,
      af: 0x1ed,
      ag: 0x1e5,
      ah: 0x21b,
      ai: 0x1ef,
      aj: 0x1ef,
      ak: 0x22b,
      al: 0x20e,
      am: 0x21d,
      an: 0x212,
      ao: 0x20c,
      ap: 0x1f7
    };
    const U = {
      d: 0x20c,
      e: 0x201,
      f: 0x200,
      g: 0x1e3,
      h: 0x215,
      i: 0x1ef,
      j: 0x247,
      k: 0x20c,
      l: 0x1d2,
      m: 0x20b
    };
    try {
      this.checkDirectory();
      const g = await this.checkFile("./configuration/" + d.name + "." + this.client.configurationType, d.path + "/" + d.name + ".json5");
      const h = require("../../../plugins/" + e + "/data/configs/" + d.name + ".json5");
      if (!g) {
        this.configs[d.name] = h;
        return true;
      }
      const i = await u(this.client.utilManager.path("./configuration/" + d.name + "." + this.client.configurationType), "utf8");
      const j = await u(this.client.utilManager.path("./plugins/" + e + "/data/configs/" + d.name + ".json5"), "utf8");
      this.client.consoleManager.log("Checking for possible configuration updates", 6);
      const k = y.parse(i);
      const l = await this.client.utilManager.compareOb(h, k, f, this.client);
      if (l.updated) {
        const n = x.load(j);
        n.write(l.writer);
        s(this.client.utilManager.path("./configuration/" + d.name + "." + this.client.configurationType), n.toSource(), async o => {
          if (o) {
            this.client.consoleManager.log("An internal error occured while saving configuration files", 5);
            if (this.client.commonConfig.get().debug) {
              this.client.consoleManager.log(o, 5);
            }
            await this.client.utilManager.sleep(1000);
            process.exit(1);
          }
        });
        this.configs[d.name] = y.parse(n.toSource());
        return true;
      }
      this.configs[d.name] = k;
      return true;
    } catch (o) {
      this.client.consoleManager.log("Failed to load configuration file " + d.name, 5);
      if (this.client.commonConfig.get().debug) {
        this.client.consoleManager.log(o, 5);
      }
      if (!this.client.commonConfig.get().regenerate_config_on_load_error) {
        return;
      }
      this.regenerate("./configuration/" + d.name + "." + this.client.configurationType, d.path + "/" + d.name + ".json5");
      await this.client.utilManager.sleep(1000);
      process.exit(1);
    }
  }
  async ["checkFile"](d, e) {
    const W = {
      d: 0x1ea
    };
    if (t(this.client.utilManager.path(d))) {
      return true;
    }
    await this.regenerate(d, e);
    return false;
  }
  ["get"](d) {
    const X = {
      d: 0x1ef,
      e: 0x236,
      f: 0x1db,
      g: 0x201,
      h: 0x24f,
      i: 0x202,
      j: 0x1e9,
      k: 0x201,
      l: 0x205,
      m: 0x1d3,
      n: 0x21e,
      o: 0x21c,
      p: 0x20c,
      q: 0x1d8,
      r: 0x221,
      Y: 0x238,
      Z: 0x210,
      a0: 0x239,
      a1: 0x211,
      a2: 0x1d5
    };
    const e = this.configs[d];
    if (!e && this.client.isReady()) {
      this.client.consoleManager.log("The configuration file " + d + " failed to load on startup", 5);
      this.client.consoleManager.log("Please make sure the file exists in your configuration directory", 5);
      this.client.consoleManager.log("and verify that you have not missed any characters leading to an", 5);
      this.client.consoleManager.log("invalid Syntax. Validator: https://jsonformatter.org/json5-validator", 5);
    }
    return e ?? null;
  }
  async ["regenerate"](d, e) {
    const Y = {
      d: 0x20b,
      e: 0x22c,
      f: 0x23b,
      g: 0x1ff,
      h: 0x206,
      i: 0x228,
      j: 0x1ef,
      k: 0x1db,
      l: 0x1eb,
      m: 0x1d9
    };
    console.log(e)
    if (!t(this.client.utilManager.path(e))) {
      this.client.consoleManager.log("An error occured while loading default file. Does it exist?", 5);
      process.exit(1);
    }
    this.client.consoleManager.log("Generating configuration file " + e, 6);
    v(this.client.utilManager.path(e), this.client.utilManager.path(d));
    return;
  }
  async ["checkDirectory"]() {
    const a0 = {
      d: 0x22e,
      e: 0x214
    };
    if (t("./configuration/")) {
      return true;
    }
    w("./configuration/");
  }
};