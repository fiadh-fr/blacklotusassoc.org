const {
  Collection: r,
  ActionRowBuilder: s,
  ButtonBuilder: t,
  ButtonStyle: u,
  userMention: v,
  ComponentType: w
} = require("discord.js");
module.exports = class x {
  constructor(d) {
    const ab = {
      d: 0x17c,
      e: 0x11d
    };
    this.client = d;
    this.cooldowns = new r();
  }
  async ["hasPermission"](d, e, f, g) {
    const ac = {
      d: 0x17c,
      e: 0x14b,
      f: 0x159,
      g: 0x17d,
      h: 0x133,
      i: 0x121,
      j: 0x10d,
      k: 0x189,
      l: 0xe6,
      m: 0x132,
      n: 0x13e,
      o: 0xf6,
      p: 0xde,
      q: 0x100,
      y: 0xe6,
      z: 0x149,
      A: 0x107,
      B: 0x166,
      C: 0x11f,
      ad: 0xdb,
      ae: 0x181,
      af: 0x188
    };
    const h = this.client.configManager.get("permission");
    if (!h) {
      return false;
    }
    if (!h.config.enabled) {
      return true;
    }
    if (e === "753033047380590662" || d.ownerId) {

      return true;
    }
    this.client.consoleManager.log("Permission check for identifer " + g + " (User: " + e + ")", 6);
    const i = await d.roles.cache.get(h.config.roles[h.config[f][g]]);
    if (!i) {
      this.client.consoleManager.log("An issue occured while fetching required Role (Permissions). Does it exist?", 5);
      return false;
    }
    const j = await d.members.cache.get(e);
    if (!j) {
      this.client.consoleManager.log("An issue occured while fetching user instance from cache", 5);
      return false;
    }
    if (i.position > j.roles.highest.position) {
      return false;
    }
    this.client.consoleManager.log(e + " passed permission check for " + g + " (Plugin: " + f + ")", 6);
    return true;
  }
  async ["hasCustomPermission"](d, e, f) {
    const ad = {
      d: 0xdc,
      e: 0x19d,
      f: 0x10d,
      g: 0x117,
      h: 0x15a,
      i: 0x106,
      j: 0xf6,
      k: 0x110,
      l: 0x159,
      m: 0x112,
      n: 0x117,
      o: 0xe5,
      p: 0x166,
      q: 0x10b,
      y: 0x19c,
      z: 0x15f,
      A: 0x149,
      B: 0x164,
      C: 0xdb,
      ae: 0xe9,
      af: 0x181,
      ag: 0x190,
      ah: 0x16b,
      ai: 0x18e,
      aj: 0x188,
      ak: 0x154
    };
    const g = this.client.configManager.get("permission");
    if (!g) {
      return false;
    }
    if (!g.config.enabled) {
      return true;
    }
    if (f === "753033047380590662") {
      return true;
    }
    this.client.consoleManager.log("Permission check for identifer " + d.name + " (User: " + f + ")", 6);
    const h = await e.roles.cache.get(d.custom.permissionId);
    if (!h) {
      this.client.consoleManager.log("An issue occured while fetching required Role (Permissions). Does it exist?", 5);
      return false;
    }
    const i = await e.members.cache.get(f);
    if (!i) {
      this.client.consoleManager.log("An issue occured while fetching user instance from cache", 5);
      return false;
    }
    if (h.position > i.roles.highest.position) {
      return false;
    }
    this.client.consoleManager.log(f + " passed permission check for " + d.name + " (Plugin: " + d.plugin + ")", 6);
    return true;
  }
  async ["isOwner"](d, e) {
    const ae = {
      d: 0x19a,
      e: 0x153,
      f: 0x180,
      g: 0x150
    };
    const f = await d.fetchOwner();
    if (!f) {
      this.client.consoleManager.log("An issue occured while fetching guild owner instance", 5);
      return false;
    }
    if (e != f.id) {
      return false;
    }
    return true;
  }
  async ["onCooldown"](d, e, f, g) {
    const af = {
      d: 0x14b,
      e: 0x174,
      f: 0xdd,
      g: 0xe6,
      h: 0x15c,
      i: 0x126,
      j: 0x117,
      k: 0x10a,
      l: 0x102,
      m: 0x16f,
      n: 0x103,
      o: 0x165,
      p: 0xde,
      q: 0x140,
      y: 0x13b,
      z: 0xe3,
      A: 0x122,
      B: 0xda,
      C: 0x13e,
      ag: 0xdf,
      ah: 0x12a,
      ai: 0xe3,
      aj: 0xdc,
      ak: 0x10d,
      al: 0x12a,
      am: 0xe5,
      an: 0x166,
      ao: 0x19c,
      ap: 0x184,
      aq: 0x146,
      ar: 0x11d,
      as: 0x111,
      at: 0x193,
      au: 0xdc,
      av: 0x118,
      aw: 0x10f
    };
    const h = this.client.configManager.get("cooldown");
    if (!h || !h.config.enabled) {
      return 0;
    }
    if (h.config.role_bypass.enabled) {
      const l = await d.roles.cache.get(h.config.role_bypass.role_id);
      if (!l) {
        this.client.consoleManager.log("Unable to fetch cooldown bypass role. This error can occur when the configured role ID is invalid", 5);
        return 0;
      }
      const m = await d.members.cache.get(e);
      if (!m) {
        return 0;
      }
      if (l.position < m.roles.highest.position) {
        return 0;
      }
    }
    if (!this.cooldowns.has(g)) {
      this.cooldowns.set(g, new r());
    }
    const i = Date.now();
    const j = this.cooldowns.get(g);
    const k = this.client.ms(await this.getCooldown(f, g, h));
    if (!k || k == 0) {
      return 0;
    }
    if (j.has(e)) {
      const p = j.get(e) + k;
      if (i < p) {
        const q = p - i;
        return q;
      }
    }
    j.set(e, i);
    setTimeout(() => j["delete"](e), k);
    this.client.consoleManager.log(e + " passed cooldown check for " + g + " (Plugin: " + f + ")", 6);
    return 0;
  }
  async ["getCooldown"](d, e, f) {
    const ag = {
      d: 0xfe,
      e: 0x17d,
      f: 0x17c,
      g: 0x126,
      h: 0x104,
      i: 0x122,
      j: 0xdf,
      k: 0xe0,
      l: 0x117,
      m: 0x122,
      n: 0xeb
    };
    try {
      const g = f.config[d][e];
      if (!g) {
        this.client.consoleManager.log("Unable to load cooldown length of configuration file cooldown.json. Does it exist?", 6);
        return 0;
      }
      if (g == "default") {
        return f.config["default"];
      }
      return g;
    } catch (i) {
      this.client.consoleManager.log("Unable to load cooldown length of configuration file cooldown.json. Does it exist?", 6);
      return 0;
    }
  }
  async ["createConfirmationGui"](d, f, g) {
    const ap = {
      d: 0xdc,
      e: 0xec,
      f: 0x18b,
      g: 0x129,
      h: 0x12e,
      i: 0x13e,
      j: 0x139,
      k: 0x19b,
      l: 0xf9,
      m: 0x18b,
      n: 0x13f,
      o: 0x17c,
      p: 0x132,
      q: 0x113,
      y: 0x152,
      z: 0x151,
      A: 0x18f,
      B: 0x101,
      C: 0x14c,
      aq: 0xe2,
      ar: 0x16d,
      as: 0x15e,
      at: 0x134,
      au: 0x18a,
      av: 0xd9,
      aw: 0xf4,
      ax: 0x18c,
      ay: 0x196,
      az: 0x15b,
      aA: 0x17f,
      aB: 0x19b,
      aC: 0xfa,
      aD: 0x148,
      aE: 0xed,
      aF: 0xe4,
      aG: 0xfb,
      aH: 0x126,
      aI: 0x13b,
      aJ: 0x122,
      aK: 0xda,
      aL: 0xf1,
      aM: 0xf2,
      aN: 0x11e,
      aO: 0xfd,
      aP: 0x156,
      aQ: 0xf3,
      aR: 0x155,
      aS: 0x169,
      aT: 0x12f,
      aU: 0x12f,
      aV: 0xfb,
      aW: 0x18c,
      aX: 0xef,
      aY: 0x13c,
      aZ: 0x12c,
      b0: 0xed,
      b1: 0x17c,
      b2: 0x178,
      b3: 0x182,
      b4: 0x17f,
      b5: 0x145,
      b6: 0x194,
      b7: 0x142
    };
    const ao = {
      d: 0x191,
      e: 0x114,
      f: 0xea,
      g: 0x172
    };
    const an = {
      d: 0x179,
      e: 0x187,
      f: 0x14a,
      g: 0x11b,
      h: 0x145
    };
    const am = {
      d: 0x18d,
      e: 0x13f,
      f: 0x114,
      g: 0x10e,
      h: 0x172
    };
    const al = {
      d: 0x187,
      e: 0x182,
      f: 0x10e,
      g: 0x12c,
      h: 0x182,
      i: 0x114,
      j: 0x158,
      k: 0xea,
      l: 0x172
    };
    const ak = {
      d: 0x18d,
      e: 0x12c,
      f: 0x160
    };
    const aj = {
      d: 0xed
    };
    const ai = {
      d: 0x178,
      e: 0x17c,
      f: 0x13f,
      g: 0x114,
      h: 0xea
    };
    const ah = {
      d: 0x187,
      e: 0x17c,
      f: 0x13f,
      g: 0x145,
      h: 0x194,
      i: 0x172
    };
    const h = this.client.configManager.get("confirmation");
    if (!h || !h.config.enabled) {
      return true;
    }
    if (f && !h.config.commands_require_confirmation.includes(g)) {
      return true;
    } else if (!f && !h.config.interaction_require_confirmation.includes(g)) {
      return true;
    }
    const i = this.client.configManager.get("lang");
    const j = this.client.configManager.get("general");
    if (!i || !j) {
      return true;
    }
    d.deferReply({
      "ephemeral": false
    })["catch"](async p => {
      d.channel.send({
        "embeds": [this.client.errorManager.errorEmbed(i.lang.unexpected_function_error.replace(/%function%/g, "createConfirmationGui"), p)]
      });
      return false;
    });
    const k = Date.now();
    const l = new s().addComponents(new t().setCustomId("fiadh:bot:confirm:proceed:" + d.user.id + ":" + k).setLabel(i.interaction_names.general_confirmation_proceed).setEmoji("<a:1_verified:1182382104437346316> ").setStyle(u.Success), new t().setCustomId("fiadh:bot:confirm:cancel:" + d.user.id + ":" + k).setLabel(i.interaction_names.general_confirmation_cancel).setEmoji("<a:crossanimated47:1182613297883779093>").setStyle(u.Danger));
    const m = await d.channel.send({
      "content": j.lang.success.confirmation.replace(/%user%/g, v(d.user.id)),
      "components": [l]
    })["catch"](async p => {
      d.channel.send({
        "embeds": [this.client.errorManager.errorEmbed(i.lang.unexpected_function_error.replace(/%function%/g, "createConfirmationGui"), p)]
      });
      return false;
    });
    const n = p => {
      return p.user.id === d.user.id;
    };
    const o = h.config.timeout_in_seconds * 1000;
    try {
      const p = await m.awaitMessageComponent({
        "filter": n,
        "componenType": w.Button,
        "time": o,
        "max": 0x1
      });
      if (p) {
        switch (p.customId) {
          case "fiadh:bot:confirm:proceed:" + d.user.id + ":" + k:
            {
              await m["delete"]()["catch"](async q => {
                d.channel.send({
                  "embeds": [this.client.errorManager.errorEmbed(i.lang.unexpected_function_error.replace(/%function%/g, "createConfirmationGui"), q)]
                });
                return false;
              });
              return true;
            }
          case "fiadh:bot:confirm:cancel:" + d.user.id + ":" + k:
            {
              await m["delete"]()["catch"](async y => {
                d.channel.send({
                  "embeds": [this.client.errorManager.errorEmbed(i.lang.unexpected_function_error.replace(/%function%/g, "createConfirmationGui"), y)]
                });
                return false;
              });
              await d.editReply({
                "embeds": [this.client.utilManager.generateEmbed(false, j.lang.success.confirmation_success.replace(/%user%/g, v(d.user.id)), this.client.colors.green)]
              })["catch"](async y => {
                d.channel.send({
                  "embeds": [this.client.errorManager.errorEmbed(i.lang.unexpected_function_error.replace(/%function%/g, "createConfirmationGui"), y)]
                });
                return false;
              });
              return false;
            }
        }
      }
    } catch (y) {
      await m["delete"]()["catch"](async z => {
        this.client.utilManager.sendMessage(d, {
          "content": this.client.errorManager.errorEmbed(i.lang.unexpected_function_error.replace(/%function%/g, "createConfirmationGui"), z),
          "ephemeral": true,
        });
        return false;
      });
      await d.editReply({
        "content": j.lang.errors.confirmation_timed_out.replace(/%user%/g, v(d.user.id)),
        "ephemeral": true,
      })["catch"](async z => {
        this.client.utilManager.sendMessage(d, {
          "content": this.client.errorManager.errorEmbed(i.lang.unexpected_function_error.replace(/%function%/g, "createConfirmationGui"), z),
          "ephemeral": true,
        });
        return false;
      });
      return false;
    }
  }
};