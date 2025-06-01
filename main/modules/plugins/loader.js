const {
  readdirSync: D,
  existsSync: E
} = require("fs");
module.exports = class F {
  constructor(d) {
    const a1 = {
      d: 0x185,
      e: 0x12b,
      f: 0x19a,
      g: 0x160,
      h: 0x15c,
      i: 0x186,
      j: 0x1a1,
      k: 0x189,
      l: 0x19b,
      m: 0x15d
    };
    this.client = d;
    this.verifiedPlugins = ["Website", "Tickets", "Staff Management", "Tebex", "Fun", "Gamemode", "Moderation", "Security", "Data", "Invites", "Management", "Giveaways", "Economy", "Import", "Embed", "Web API", "Music", "Minecraft", "Notifications"];
    this.loadedPlugins = {
      "raw": [],
      "plugins": []
    };
    this.failedPlugins = [];
    this.managers = {};
  }
  async ["load"]() {
    const a2 = {
      d: 0x13a,
      e: 0x1c8,
      f: 0x165,
      g: 0x1b8,
      h: 0x1be,
      i: 0x18a,
      j: 0x185,
      k: 0x185,
      l: 0x115,
      m: 0x1a0,
      n: 0x1d4,
      o: 0x1b2,
      p: 0x1d5,
      q: 0x156,
      r: 0x1af,
      s: 0x135,
      t: 0x147,
      u: 0x18e,
      v: 0x197,
      w: 0x13f,
      x: 0x112,
      y: 0x1bd,
      z: 0x1e2,
      A: 0x124,
      B: 0x1e1,
      C: 0x12c,
      G: 0x120,
      H: 0x120,
      I: 0x13a,
      J: 0x13d,
      K: 0x17a,
      L: 0x138,
      M: 0x1b2,
      N: 0x156,
      a3: 0x191,
      a4: 0x11f,
      a5: 0x1aa,
      a6: 0x170,
      a7: 0x1d3,
      a8: 0x143,
      a9: 0x143,
      aa: 0x11d,
      ab: 0x144,
      ac: 0x14e,
      ad: 0x188,
      ae: 0x1d5,
      af: 0x140,
      ag: 0x156,
      ah: 0x12e,
      ai: 0x123,
      aj: 0x1b7,
      ak: 0x18b,
      al: 0x178,
      am: 0x1dc,
      an: 0x181,
      ao: 0x19f,
      ap: 0x11d,
      aq: 0x162,
      ar: 0x1bc,
      as: 0x142,
      at: 0x16d,
      au: 0x190,
      av: 0x1b2,
      aw: 0x14e,
      ax: 0x1d5,
      ay: 0x1b7,
      az: 0x172,
      aA: 0x184,
      aB: 0x12c,
      aC: 0x156,
      aD: 0x191,
      aE: 0x113,
      aF: 0x1ae,
      aG: 0x18d,
      aH: 0x155,
      aI: 0x134,
      aJ: 0x15a,
      aK: 0x11e,
      aL: 0x1b2,
      aM: 0x1c1,
      aN: 0x185,
      aO: 0x1d5,
      aP: 0x156,
      aQ: 0x1b6,
      aR: 0x113,
      aS: 0x1cd,
      aT: 0x18a,
      aU: 0x19b,
      aV: 0x1be,
      aW: 0x12e,
      aX: 0x12d,
      aY: 0x1a7,
      aZ: 0x1bc,
      b0: 0x185,
      b1: 0x128,
      b2: 0x1c7,
      b3: 0x186,
      b4: 0x1a4,
      b5: 0x14b,
      b6: 0x1ae,
      b7: 0x1e3,
      b8: 0x130,
      b9: 0x1b0,
      ba: 0x12a,
      bb: 0x11d,
      bc: 0x1b2,
      bd: 0x13b,
      be: 0x1bb,
      bf: 0x16e,
      bg: 0x173,
      bh: 0x185,
      bi: 0x127,
      bj: 0x185,
      bk: 0x1d7,
      bl: 0x1cd,
      bm: 0x1b2,
      bn: 0x19f,
      bo: 0x1cf,
      bp: 0x11c,
      bq: 0x191,
      br: 0x19d,
      bs: 0x1d1,
      bt: 0x123,
      bu: 0x146,
      bv: 0x166,
      bw: 0x11d,
      bx: 0x156,
      by: 0x1b8,
      bz: 0x17e,
      bA: 0x18a,
      bB: 0x1b8,
      bC: 0x1be,
      bD: 0x12c,
      bE: 0x114,
      bF: 0x1c2,
      bG: 0x10d,
      bH: 0x17c,
      bI: 0x184,
      bJ: 0x1b2,
      bK: 0x17d,
      bL: 0x1e0,
      bM: 0x11d,
      bN: 0x18a,
      bO: 0x19d,
      bP: 0x11d,
      bQ: 0x1b8,
      bR: 0x133,
      bS: 0x18a,
      bT: 0x19d,
      bU: 0x113,
      bV: 0x18d,
      bW: 0x156,
      bX: 0x146,
      bY: 0x11d,
      bZ: 0x18a,
      c0: 0x1d5,
      c1: 0x14e,
      c2: 0x14d,
      c3: 0x1b1,
      c4: 0x185,
      c5: 0x19b,
      c6: 0x10d,
      c7: 0x164
    };
    const d = D("./plugins").filter(e => !e.endsWith(".js") && !e.startsWith("-"));
    this.client.consoleManager.log("Found a total of " + d.length + " plugin(s)", 0, 0);
    await this.client.configManager.checkDirectory();
    for (const e of d) {
      try {
        const f = Date.now();
        this.client.consoleManager.log('', 0, 0);
        this.client.consoleManager.log("Loading plugin " + e, 0, 3);
        const g = require("../../../plugins/" + e + "/main.js");
        const h = new g(this.client);
        this.client.consoleManager.log("Running version " + h.version + " by " + h.author, 0, 3);
        if (!this.verifiedPlugins.includes(h.name) && !h.author != "zeroknightss") {
          this.client.consoleManager.log("This plugin was not created by the original developers of this app.", 4);
          this.client.consoleManager.log("Use at your own risk. This may causes issues with the app.", 4);
        }
        if (!this.client.compareIdentifiers(h.requires_common_version, this.client.version)) {
          this.client.consoleManager.log("An error occured while loading plugin " + h.name, 5);
          this.client.consoleManager.log("This plugin requires version " + h.requires_common_version + " of Multi App (Current: " + this.client.version + ")", 5);
        } else {
          if (E("./plugins/" + e + "/data/configs")) {
            const j = D("./plugins/" + e + "/data/configs").filter(k => k.endsWith(".json5"));
            this.client.consoleManager.log("Loading " + j.length + " configuration file(s) of plugin " + e, 0, 0);
            for (const k of j) {
              try {
                await this.client.configManager.load(h.configuration_files[k], e, h.writer[h.configuration_files[k].name]);
                this.client.consoleManager.log("Successfully loaded configuration file " + k, 0, 1);
              } catch (n) {
                this.client.consoleManager.log("An error occured while loading configuration file " + k, 5);
                if (this.client.commonConfig.get().debug) {
                  this.client.consoleManager.log(n, 5);
                }
                process.exit(1);
              }
            }
          }
          if (h.name == "Music") {
            h.generateInstance(this.client);
          }
          if (E("./plugins/" + e + "/src/commands")) {
            const o = D("./plugins/" + e + "/src/commands").filter(p => p.endsWith(".js"));
            this.client.consoleManager.log("Loading " + o.length + " commands of plugin " + e, 0, 0);
            for (let p of o) {
              try {
                p = require("../../../plugins/" + e + "/src/commands/" + p);
                const q = new p(this.client);
                try {
                  const r = this.client.configManager.get("commands").config[h.name][q.name];
                  if (r == null || r == undefined || r) {
                    this.client.commandLoader.load(q);
                    this.client.consoleManager.log("Successfully loaded command " + q.name, 0, 1);
                  } else {
                    this.client.consoleManager.log("Successfully disabled command " + q.name, 4);
                  }
                } catch (s) {
                  this.client.commandLoader.load(q);
                  this.client.consoleManager.log("Successfully loaded command " + q.name, 0, 1);
                }
              } catch (u) {
                this.client.consoleManager.log("An error occured while loading command " + p, 5);
                if (this.client.commonConfig.get().debug) {
                  this.client.consoleManager.log(u, 5);
                }
                this.failedPlugins.push(g.name);
              }
            }
          }
          if (h.name == "Management") {
            await h.loadCustomCommands();
          }
          if (E("./plugins/" + e + "/src/events")) {
            const x = D("./plugins/" + e + "/src/events").filter(y => y.endsWith(".js"));
            this.client.consoleManager.log("Loading " + x.length + " event(s) of plugin " + e, 0, 0);
            for (let y of x) {
              try {
                y = require("../../../plugins/" + e + "/src/events/" + y);
                const z = new y(this.client);
                this.client.eventLoader.load(z);
                this.client.consoleManager.log("Successfully loaded event " + z.event + " (" + z.name + ")", 0, 1);
              } catch (A) {
                this.client.consoleManager.log("An error occured while loading event " + y, 5);
                if (this.client.commonConfig.get().debug) {
                  this.client.consoleManager.log(A, 5);
                }
                this.failedPlugins.push(g.name);
              }
            }
          }
          if (E("./plugins/" + e + "/src/listener")) {
            const B = D("./plugins/" + e + "/src/listener").filter(C => C.endsWith(".js"));
            this.client.consoleManager.log("Loading " + B.length + " listener(s) of plugin " + e, 0, 0);
            for (let C of B) {
              try {
                C = require("../../../plugins/" + e + "/src/listener/" + C);
                const H = new C(this.client);
                this.client.listenerLoader.load(H);
                this.client.consoleManager.log("Successfully loaded listener " + H.listener, 0, 1);
              } catch (I) {
                this.client.consoleManager.log("An error occured while loading listener " + C, 5);
                if (this.client.commonConfig.get().debug) {
                  this.client.consoleManager.log(I, 5);
                }
                this.failedPlugins.push(g.name);
              }
            }
          }
          if (h.exmanager) {
            this.managers[h.name] = new h.exmanager(this.client);
          }
          this.client.consoleManager.log("Successfully finished loading plugin \"" + h.name + " in " + ((Date.now() - f) / 1000).toFixed(2) + " seconds", 0, 3);
          this.loadedPlugins.raw.push({
            "name": h.name,
            "version": h.version,
            "author": h.author
          });
          this.loadedPlugins.plugins.push(h.name);
        }
      } catch (M) {
        this.client.consoleManager.log("An error occured while loading plugin " + e, 5);
        if (this.client.commonConfig.get().debug) {
          this.client.consoleManager.log(M, 5);
        }
        this.failedPlugins.push(e);
      }
    }
    this.client.consoleManager.log('', 0, 0);
    this.client.consoleManager.log("Successfully loaded a total of " + this.loadedPlugins.plugins.length + " plugin(s)", 0, 3);
    if (this.failedPlugins.length > 0) {
      this.client.consoleManager.log(this.failedPlugins.length + " plugin(s) errored while loading", 4);
    }
  }
  ["getManager"](d) {
    const e = this.managers[d];
    if (!e) {
      return undefined;
    }
    return e;
  }
  ["isLoaded"](d) {
    const a4 = {
      d: 0x151,
      e: 0x145
    };
    if (this.loadedPlugins.plugins.includes(d)) {
      return true;
    }
    return false;
  }
  ["getLoadedPlugins"](d) {
    const a5 = {
      d: 0x153,
      e: 0x1c7,
      f: 0x10d,
      g: 0x18f
    };
    if (d) {
      return this.loadedPlugins.raw;
    }
    return this.loadedPlugins.plugins;
  }
};