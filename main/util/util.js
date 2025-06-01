const {
  join: W
} = require("path");
module.exports = class Y {
  constructor(d) {
    this.client = d;
  }
  ["sleep"](d) {
    return new Promise(e => setTimeout(e, d));
  }
  ["generate"](d, e, f) {
    const aQ = {
      d: 0x16a,
      e: 0x111
    };
    const aP = {
      d: 0x173,
      e: 0x17c,
      f: 0x139
    };
    const h = Math.floor(Math.random() * (e - d + 1)) + d;
    const i = Array(h).fill(f).map(function (j) {
      return j[Math.floor(Math.random() * j.length)];
    }).join('');
    return i;
  }
  ["path"](d) {
    const aR = {
      d: 0x206
    };
    return W(__dirname, "../../", d);
  }
  ["upperCase"](d) {
    return d[0].toUpperCase() + d.slice(1);
  }
  async ["restartSystem"]() {
    const aW = {
      d: 0x1e2,
      e: 0x112,
      f: 0x19c,
      g: 0x14f,
      h: 0x131,
      i: 0x1f0,
      j: 0x147,
      k: 0x218,
      l: 0x20f,
      m: 0x112,
      n: 0x1db,
      o: 0x205,
      p: 0x218,
      q: 0x1bf,
      r: 0x1f6,
      s: 0x20f,
      t: 0x1bf,
      u: 0x147,
      v: 0x20f,
      w: 0x131,
      x: 0x20a,
      y: 0x13a,
      z: 0x1bf,
      A: 0x12e,
      B: 0x1bf,
      C: 0x112,
      D: 0x1f0,
      E: 0x1f7
    };
    this.client.restartRunning = true;
    this.client.consoleManager.log('', 4);
    this.client.consoleManager.log("Restart triggered. Restarting in 30 seconds.", 4);
    this.client.consoleManager.log("Ticking process has been canceled. All app activities are on hold.", 4);
    this.client.consoleManager.log('', 4);
    await this.sleep(20000);
    this.client.consoleManager.log("Restarting in 10 seconds.", 1);
    await this.sleep(5000);
    this.client.consoleManager.log("Restarting in 5 seconds.", 1);
    await this.sleep(2000);
    this.client.consoleManager.log("Restarting in 3 seconds.", 1);
    await this.sleep(1000);
    this.client.consoleManager.log("Restarting in 2 seconds.", 1);
    await this.sleep(1000);
    this.client.consoleManager.log("Restarting in 1 seconds.", 1);
    await this.sleep(1000);
    this.client.consoleManager.log("Restarting...", 1);
    await this.sleep(1500);
    process.exit(1);
  }
  async ["compareOb"](d, e, f) {
    const b1 = {
      d: 0x213
    };
    const aZ = {
      d: 0x1ee,
      e: 0x183,
      f: 0x139,
      g: 0x154,
      h: 0x1fa,
      i: 0x1e4,
      j: 0x185,
      k: 0x1d7,
      l: 0x1d0,
      m: 0x235,
      n: 0x1bb,
      o: 0x1de
    };
    let g = false;
    const h = function (i, j, k) {
      const aY = {
        d: 0x1a2,
        e: 0x13c
      };
      if (j === undefined) {
        try {
          switch (k.length) {
            case 1:
              {
                if (d[k[0]]) {
                  f[k[0]] = d[k[0]];
                  g = true;
                }
                break;
              }
            case 2:
              {
                if (d[k[0]][k[1]]) {
                  f[k[0]][k[1]] = d[k[0]][k[1]];
                  g = true;
                }
                break;
              }
            case 3:
              {
                if (d[k[0]][k[1]][k[2]]) {
                  f[k[0]][k[1]][k[2]] = d[k[0]][k[1]][k[2]];
                  g = true;
                }
                break;
              }
            case 4:
              {
                if (d[k[0]][k[1]][k[2]][k[3]]) {
                  f[k[0]][k[2]][k[3]] = d[k[0]][k[1]][k[2]][k[3]];
                  g = true;
                }
                break;
              }
            case 5:
              {
                if (d[k[0]][k[1]][k[2]][k[3]][k[4]]) {
                  f[k[0]][k[1]][k[2]][k[3]][k[4]] = d[k[0]][k[1]][k[2]][k[3]][k[4]];
                  g = true;
                }
                break;
              }
          }
        } catch (p) { }
      }
      if (typeof i === "object" && !i.length) {
        Object.keys(i).forEach(function (q) {
          h(i[q], j && j[q], k.concat(q));
        });
      }
    };
    Object.keys(d).forEach(function (i) {
      h(d[i], e[i], [i]);
    });
    if (g) {
      return {
        "updated": true,
        "writer": await this.addUndefinedValues(f, e)
      };
    }
    return {
      "updated": false,
      "writer": f
    };
  }
  async ["addUndefinedValues"](d, e) {
    const b5 = {
      d: 0x1f2,
      e: 0x22a
    };
    const b3 = {
      d: 0x169,
      e: 0x1bf,
      f: 0x1f0,
      g: 0x112,
      h: 0x16f,
      i: 0x116,
      j: 0x205,
      k: 0x201,
      l: 0x1b6,
      m: 0x20f,
      n: 0x158,
      o: 0x17f,
      p: 0x19a,
      q: 0x157,
      r: 0x10f,
      s: 0x1cb,
      t: 0x205,
      u: 0x12a,
      v: 0x159,
      w: 0x22b,
      x: 0x13f,
      y: 0x144,
      z: 0x191,
      A: 0x22a
    };
    const f = function (g, h, i) {
      if (g === undefined) {
        try {
          switch (i.length) {
            case 1:
              {
                if (e[i[0]]) {
                  d[i[0]] = h;
                }
                break;
              }
            case 2:
              {
                if (e[i[0]][i[1]] || typeof e[i[0]][i[1]] === "boolean") {
                  d[i[0]][i[1]] = h;
                }
                break;
              }
            case 3:
              {
                if (e[i[0]][i[1]][i[2]]) {
                  d[i[0]][i[1]][i[2]] = h;
                }
                break;
              }
            case 4:
              {
                if (e[i[0]][i[1]][i[2]][i[3]]) {
                  d[i[0]][i[2]][i[3]] = h;
                }
                break;
              }
            case 5:
              {
                if (e[i[0]][i[1]][i[2]][i[3]][i[4]]) {
                  d[i[0]][i[1]][i[2]][i[3]][i[4]] = h;
                }
                break;
              }
          }
        } catch (p) { }
      }
      if (typeof g === "object" && h != undefined) {
        Object.keys(g).forEach(function (r) {
          f(g[r], h[r], i.concat(r));
        });
      }
    };
    Object.keys(d).forEach(function (g) {
      f(d[g], e[g], [g]);
    });
    return d;
  }
  async ["deleteDelayed"](d) {
    const b7 = {
      d: 0x218,
      e: 0x16b
    };
    const b6 = {
      d: 0x1f0,
      e: 0x1f6,
      f: 0x238,
      g: 0x159,
      h: 0x216
    };
    await this.sleep(5000);
  }
  async ["sendMessage"](d, e) {
    const b9 = {
      d: 0x204,
      e: 0x1a9,
      f: 0x1d2,
      g: 0x131,
      h: 0x157,
      i: 0x1f0,
      j: 0x1e1,
      k: 0x171
    };
    const b8 = {
      d: 0x1b2,
      e: 0x22c,
      f: 0x233,
      g: 0x165,
      h: 0x10e,
      i: 0x1fc,
      j: 0x1c1,
      k: 0x118,
      l: 0x1ce,
      m: 0x17d,
      n: 0x184,
      o: 0x1c9,
      p: 0x131,
      q: 0x20f
    };
    if (d.deferred) {
      await d.editReply(e);
    } else {
      await d.reply(e)["catch"](async f => {
        await d.channel.send(e);
        this.client.consoleManager.log(f, 6);
      });
    }
  }

  async ["editCustomDefer"](d, e) {
    const b9 = {
      d: 0x204,
      e: 0x1a9,
      f: 0x1d2,
      g: 0x131,
      h: 0x157,
      i: 0x1f0,
      j: 0x1e1,
      k: 0x171
    };
    const b8 = {
      d: 0x1b2,
      e: 0x22c,
      f: 0x233,
      g: 0x165,
      h: 0x10e,
      i: 0x1fc,
      j: 0x1c1,
      k: 0x118,
      l: 0x1ce,
      m: 0x17d,
      n: 0x184,
      o: 0x1c9,
      p: 0x131,
      q: 0x20f
    };
    if (d.reply) {
      await d.editReply(e);
    } else {
      await d.reply(e)["catch"](async f => {
        await d.channel.send(e);
        this.client.consoleManager.log(f, 6);
      });
    }
  }

  async ["sendMessageFollowUp"](d, e) {
    const b9 = {
      d: 0x204,
      e: 0x1a9,
      f: 0x1d2,
      g: 0x131,
      h: 0x157,
      i: 0x1f0,
      j: 0x1e1,
      k: 0x171
    };
    const b8 = {
      d: 0x1b2,
      e: 0x22c,
      f: 0x233,
      g: 0x165,
      h: 0x10e,
      i: 0x1fc,
      j: 0x1c1,
      k: 0x118,
      l: 0x1ce,
      m: 0x17d,
      n: 0x184,
      o: 0x1c9,
      p: 0x131,
      q: 0x20f
    };
    await d.followUp(e)["catch"](async f => {
      await d.channel.send(e);
      this.client.consoleManager.log(f, 6);
    });
  }
  async ["replyMessage"](d, e) {
    const b9 = {
      d: 0x204,
      e: 0x1a9,
      f: 0x1d2,
      g: 0x131,
      h: 0x157,
      i: 0x1f0,
      j: 0x1e1,
      k: 0x171
    };
    const b8 = {
      d: 0x1b2,
      e: 0x22c,
      f: 0x233,
      g: 0x165,
      h: 0x10e,
      i: 0x1fc,
      j: 0x1c1,
      k: 0x118,
      l: 0x1ce,
      m: 0x17d,
      n: 0x184,
      o: 0x1c9,
      p: 0x131,
      q: 0x20f
    };
    await d.reply(e)["catch"](async f => {
      await d.channel.send(e);
      this.client.consoleManager.log(f, 6);
    });
  }
  ["getRandomElement"](d) {
    return d[Math.floor(Math.random() * d.length)];
  }
  async ["loadingDefer"](d) {
    const h = this.client.configManager.get("general");

    await d.reply({
      "content": (h.lang.success.loading),
      "ephemeral": false,
    });
  };

  async ["loadingDeferEphemeral"](d) {
    const h = this.client.configManager.get("general");

    await d.reply({
      "content": (h.lang.success.loading),
      "ephemeral": true,
    });
  };
};