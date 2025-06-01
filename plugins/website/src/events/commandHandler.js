require('dotenv').config();
const J = require("../../../../main/modules/events/manager.js");
const {
  userMention: K,
  Events: L
} = require("discord.js");
module.exports = class M extends J {
  constructor(d) {
    const W = {
      d: 0x11a,
      e: 0xbd
    };
    super(d, {
      "event": L.InteractionCreate,
      "name": "commandHandler",
      "default": true,
      "plugin": "general"
    });
    this.client = d;
  }
  async ["execute"](d) {
    const X = {
      d: 0x10e,
      e: 0xbd,
      f: 0xe0,
      g: 0x10f,
      h: 0xb6,
      i: 0xa9,
      j: 0xe5,
      k: 0xec,
      l: 0xa7,
      m: 0xa3,
      n: 0x103,
      o: 0xd1,
      p: 0xa0,
      q: 0xfa,
      r: 0xbf,
      s: 0x113,
      t: 0xfb,
      u: 0xef,
      v: 0x11c,
      w: 0xd0,
      x: 0x104,
      y: 0x118,
      z: 0xf9,
      A: 0x117,
      B: 0xbc,
      C: 0xa0,
      D: 0xfd,
      E: 0xa2,
      F: 0x100,
      G: 0x10d,
      H: 0xbc,
      I: 0xdc,
      Y: 0x112,
      Z: 0xa5,
      a0: 0xa1,
      a1: 0xd8,
      a2: 0xaa,
      a3: 0xa4,
      a4: 0xa9,
      a5: 0xfd,
      a6: 0xe8,
      a7: 0xcc,
      a8: 0xda,
      a9: 0x101,
      aa: 0x9e,
      ab: 0xce,
      ac: 0xb3,
      ad: 0xd4,
      ae: 0xfd,
      af: 0x119,
      ag: 0xe4,
      ah: 0xd8,
      ai: 0xe3,
      aj: 0xd4,
      ak: 0xc2,
      al: 0x116,
      am: 0xfd,
      an: 0xd8,
      ao: 0x117,
      ap: 0xff,
      aq: 0x11b,
      ar: 0xd3,
      as: 0xc8,
      at: 0xfc,
      au: 0xda,
      av: 0xa2,
      aw: 0xad,
      ax: 0xd4,
      ay: 0xf4,
      az: 0xbd,
      aA: 0xd4,
      aB: 0xca,
      aC: 0xc9,
      aD: 0xb0,
      aE: 0xc3,
      aF: 0xbd,
      aG: 0x110,
      aH: 0xbb,
      aI: 0xf2,
      aJ: 0xdb,
      aK: 0xf6,
      aL: 0xcf,
      aM: 0xdd,
      aN: 0x114,
      aO: 0xa6,
      aP: 0xfd,
      aQ: 0x9f,
      aR: 0xcd,
      aS: 0x114
    };
    if (!d.isChatInputCommand()) {
      return;
    }
    const e = this.client.configManager.get("lang");
    const f = this.client.configManager.get("general");
    try {
      const g = this.client.commandLoader.commands.get(d.commandName);
      if (!g) {
        return this.client.consoleManager.log("Command handler fired however the command was not registered", 4);
      }
      if (this.client.restartRunning) {
        return d.reply({
          "content": (f.lang.errors.restart_running.replace(/%user%/g, K(d.user.id))),
          "ephemeral": true
        });
      }
      this.client.consoleManager.log(d.user.username + " tried to execute command " + d.commandName, 2);
      if (g.bypass) {
        g.execute(d, e);
        return;
      }
      if (d.guild.id !== process.env.DISCORD_GUILD_ID) {
        return d.reply({
          "content": (f.lang.errors.invalid_guild.replace(/%user%/g, K(d.user.id)).replace(/%command%/g, d.commandName)),
          "ephemeral": true
        });
      }
      if (g.ownerOnly) {
        const j = await this.client.generalManager.isOwner(d.guild, d.user.id);
        if (!j) {
          return d.reply({
            "content": (f.lang.errors.owneronly_command.replace(/%user%/g, K(d.user.id))),
            "ephemeral": true
          });
        }
      }
      if (!g.custom) {
        const k = await this.client.generalManager.hasPermission(d.guild, d.user.id, g.plugin, d.commandName);
        if (!k) {
          return d.reply({
            "content": (f.lang.errors.no_permission_command.replace(/%user%/g, K(d.user.id)).replace(/%command%/g, d.commandName)),
            "ephemeral": true
          });
        }
        const l = await this.client.generalManager.onCooldown(d.guild, d.user.id, g.plugin, d.commandName);
        if (l != 0) {
          return d.reply({
            "content": (f.lang.errors.on_cooldown_command.replace(/%user%/g, K(d.user.id)).replace(/%time%/g, this.client.ms(parseInt(l), {
              "long": true
            }))),
            "ephemeral": true
          });
        }
      } else {
        const n = await this.client.generalManager.hasCustomPermission(g, d.guild, d.user.id);
        if (!n) {
          return d.reply({
            "content": (f.lang.errors.no_permission_command.replace(/%user%/g, K(d.user.id)).replace(/%command%/g, d.commandName)),
            "ephemeral": true
          });
        }
        const o = await this.client.getModels("embed").findOne({
          "guildId": d.guild.id,
          "id": g.custom.messageId
        });
        if (!o) {
          return this.client.utilManager.sendMessage(d, {
            "content": (this.client.configManager.get("management")?.["lang"]["errors"]["invalid_customid"]["replace"](/%user%/g, K(d.user.id))),
            "ephemeral": true
          });
        }
        if (o.embed) {
          d.reply({
            "embeds": [o.data.data]
          });
        } else {
          d.reply({
            "content": '' + o.data
          });
        }
        return;
      }
      let h = null;
      if (g.plugin == "music" && g.name != "play") {
        const p = this.client.configManager.get("music");
        h = this.client.poru.players.get(d.guild.id);
        if (!h || !h.currentTrack) {
          return d.reply({
            "content": (p.lang.errors.not_playing.replace(/%user%/g, K(d.user.id))),
            "ephemeral": true
          });
        }
        const q = d.member?.["voice"]?.["channelId"];
        if (!q) {
          return d.reply({
            "content": (p.lang.errors.no_channel.replace(/%user%/g, K(d.user.id))),
            "ephemeral": true
          });
        }
        if (q != d.guild.members.me.voice?.["channelId"]) {
          return d.reply({
            "content": (p.lang.errors.invalid_channel.replace(/%user%/g, K(d.user.id))),
            "ephemeral": true
          });
        }
      }
      const i = await this.client.generalManager.createConfirmationGui(d, true, d.commandName);
      if (!i) {
        return this.client.consoleManager.log("Command handler fired however the confirmation process failed", 6);
      }
      try {
        g.execute(d, e, h);
      } catch (s) {
        this.client.utilManager.sendMessage(d, {
          "content": (e.lang.unexpected_command_error_icon.replace(/%command%/g, d.commandName), s),
          "ephemeral": true,
        });
        this.client.errorManager.errorReport(e.lang.unexpected_command_error.replace(/%command%/g, this.name), s);
      }
    } catch (u) {
      this.client.utilManager.sendMessage(d, {
        "content": e.lang.unexpected_command_error_icon.replace(/%command%/g, d.commandName),
        "ephemeral": true
      });
      this.client.errorManager.errorReport(e.lang.unexpected_command_error.replace(/%command%/g, this.name), u);
    }
  }
};