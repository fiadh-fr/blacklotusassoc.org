require('dotenv').config();
const j = require("../../../../main/modules/events/manager.js");
const {
  userMention: k,
  Events: l
} = require("discord.js");
module.exports = class m extends j {
  constructor(d) {
    const y = {
      d: 0x174,
      e: 0x182
    };
    super(d, {
      "event": l.InteractionCreate,
      "name": "interactionHandler",
      "default": true,
      "plugin": "general"
    });
    this.client = d;
  }
  async ["execute"](d) {
    const z = {
      d: 0x1ce,
      e: 0x1a8,
      f: 0x1af,
      g: 0x1be,
      h: 0x1ac,
      i: 0x18d,
      n: 0x1bb,
      o: 0x18a,
      p: 0x193,
      A: 0x17a,
      B: 0x1ce,
      C: 0x1a0,
      D: 0x1c1,
      E: 0x1ab,
      F: 0x18e,
      G: 0x171,
      H: 0x17f,
      I: 0x1cd,
      J: 0x1ca,
      K: 0x191,
      L: 0x1a9,
      M: 0x1a2,
      N: 0x1c7,
      O: 0x1bf,
      P: 0x197,
      Q: 0x187,
      R: 0x16b,
      S: 0x1cc,
      T: 0x1c2,
      U: 0x19d,
      V: 0x1cb,
      W: 0x1ae,
      X: 0x171,
      Y: 0x183,
      Z: 0x1b4,
      a0: 0x18c,
      a1: 0x1b6,
      a2: 0x1c0,
      a3: 0x184,
      a4: 0x19b,
      a5: 0x16a,
      a6: 0x171,
      a7: 0x1a4,
      a8: 0x1a1,
      a9: 0x1b9,
      aa: 0x1a7,
      ab: 0x170,
      ac: 0x1b4
    };
    const e = this.client.configManager.get("lang");
    const f = this.client.configManager.get("general");
    try {
      if (d.guild.id !== process.env.DISCORD_GUILD_ID || d.isChatInputCommand()) {
        return;
      }
      const g = d.customId.split(":");
      if (!g) {
        this.client.consoleManager.log("An unexpected error occurred during the custom interactionCreate event.", 4);
        this.client.consoleManager.log("The ID could not be successfully split.", 4);
        return;
      }
      const h = this.client.eventLoader.interactionEvents.get(g[2]);
      if (!h) {
        return this.client.consoleManager.log("Interaction handler fired however the event was not registered. ID: " + g[2], 4);
      }
      if (this.client.restartRunning) {
        return d.reply({
          "content": (f.lang.errors.restart_running.replace(/%user%/g, k(d.user.id))),
          "ephemeral": true
        });
      }
      this.client.consoleManager.log("Event " + h.name + " listening on " + h.event + " fired (" + d.user.id + ")", 1);
      const i = await this.client.generalManager.hasPermission(d.guild, d.user.id, h.plugin, h.name);
      if (!i) {
        return d.reply({
          "content": (/%user%/g, k(d.user.id)).replace(/%function%/g, h.name),
          "ephemeral": true
        });
      }
      const n = await this.client.generalManager.onCooldown(d.guild, d.user.id, h.plugin, h.name);
      if (n != 0) {
        return d.reply({
          "content": (f.lang.errors.on_cooldown_function.replace(/%user%/g, k(d.user.id)).replace(/%time%/g, this.client.ms(parseInt(n), {
            "long": true
          }))),
          "ephemeral": true
        });
      }
      const o = await this.client.generalManager.createConfirmationGui(d, false, h.name);
      if (!o) {
        return this.client.consoleManager.log("Event handler fired however the confirmation process failed", 6);
      }
      h.execute(d, g, e);
    } catch (p) {
      this.client.utilManager.sendMessage(d, {
        "content": e.lang.unexpected_function_error_icon.replace(/%function%/g, this.name),
        "ephemeral": true
      });
      this.client.errorManager.errorReport(e.lang.unexpected_command_error.replace(/%command%/g, this.name), p);
    }
  }
};