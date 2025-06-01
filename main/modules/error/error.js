require('dotenv').config();
const {
  WebhookClient: v,
  EmbedBuilder: w,
  version: x
} = require("discord.js");
module.exports = class y {
  constructor(d) {
    const V = {
      d: 0x19e,
      e: 0x15f,
      f: 0x1d4,
      g: 0x16c,
      h: 0x16b,
      i: 0x16e,
      j: 0x18a,
      k: 0x1d3
    };
    this.client = d;
    this.webhook = new v({
      "url": process.env.ERROR_WEBHOOK
    });
    this.defaultEmbed = {
      "error": new w().setColor(this.client.colors.red),
      "warning": new w().setColor(this.client.colors.orange)
    };
    this.defaultContent = {
      "error": null,
      "warning": null
    };

  }
  ["warnEmbed"](d) {
    const W = {
      d: 0x1ab,
      e: 0x1b3
    };
    const e = this.defaultEmbed.warning;
    e.setDescription(d);
    return e;
  }
  ["warnContent"](d) {
    const W = {
      d: 0x1ab,
      e: 0x1b3
    };
    const e = this.defaultContent.warning + (d);
    return e;
  }
  ["errorEmbed"](d, e) {
    const X = {
      d: 0x1e4,
      e: 0x160,
      f: 0x1d6,
      g: 0x191,
      h: 0x1fa,
      i: 0x16f,
      j: 0x1f0,
      k: 0x1db,
      l: 0x169
    };
    const f = d.replace(/__/g, '').replace(/\*/g, '').replace(/``/g, '');
    this.client.consoleManager.log(f, 5);
    const g = this.defaultEmbed.error;
    g.setDescription(d);
    if (this.client.commonConfig.get().debug) {
      this.client.consoleManager.log('' + (e.stack || e), 5);
    }
    this.sendDevReport(e);
    return g;
  }
  ["errorReport"](d, e) {
    const X = {
      d: 0x1e4,
      e: 0x160,
      f: 0x1d6,
      g: 0x191,
      h: 0x1fa,
      i: 0x16f,
      j: 0x1f0,
      k: 0x1db,
      l: 0x169
    };
    const f = d.replace(/__/g, '').replace(/\*/g, '').replace(/``/g, '');
    this.client.consoleManager.log(f, 5);
    if (this.client.commonConfig.get().debug) {
      this.client.consoleManager.log('' + (e.stack || e), 5);
    }
    this.sendDevReport(e);
  }
  ["errorContent"](d, e) {
    const X = {
      d: 0x1e4,
      e: 0x160,
      f: 0x1d6,
      g: 0x191,
      h: 0x1fa,
      i: 0x16f,
      j: 0x1f0,
      k: 0x1db,
      l: 0x169
    };
    this.sendDevReport(e);
    return g;
  }

  // This part was used to login with Discord App, but as I've quit using Discord there's no need for it anymore.
  ["sendDevReport"](d) {
    const a2 = {
      d: 0x1af,
      e: 0x194,
      f: 0x162,
      g: 0x155,
      h: 0x1c8,
      i: 0x156,
      j: 0x1b1,
      k: 0x175,
      l: 0x1e2,
      m: 0x16f,
      n: 0x171,
      o: 0x1a1,
      p: 0x1a0,
      q: 0x183,
      r: 0x1a8,
      s: 0x1aa,
      t: 0x1a1,
      u: 0x1a0,
      z: 0x1fb,
      a3: 0x153,
      a4: 0x15d,
      a5: 0x1f0,
      a6: 0x1a3,
      a7: 0x182,
      a8: 0x160,
      a9: 0x159,
      aa: 0x1a0,
      ab: 0x19f,
      ac: 0x169,
      ad: 0x1b2,
      ae: 0x1a6,
      af: 0x1c6,
      ag: 0x163,
      ah: 0x1e6,
      ai: 0x15e,
      aj: 0x1f4,
      ak: 0x154,
      al: 0x198,
      am: 0x193
    };
    const a1 = {
      d: 0x165,
      e: 0x1ec,
      f: 0x169,
      g: 0x159,
      h: 0x1a0,
      i: 0x1da,
      j: 0x16e
    };
    const a0 = {
      d: 0x186,
      e: 0x169,
      f: 0x1a1,
      g: 0x1da,
      h: 0x18a,
      i: 0x1c2,
      j: 0x1d1,
      k: 0x17c,
      l: 0x155,
      m: 0x151,
      n: 0x178,
      o: 0x152,
      p: 0x1c9,
      q: 0x1d0,
      r: 0x156,
      s: 0x1b1,
      t: 0x1dd,
      u: 0x1be,
      z: 0x1ef,
      a1: 0x199,
      a2: 0x1e9,
      a3: 0x180,
      a4: 0x197,
      a5: 0x171,
      a6: 0x169,
      a7: 0x19a,
      a8: 0x15b,
      a9: 0x1d9,
      aa: 0x159,
      ab: 0x167,
      ac: 0x19d,
      ad: 0x176,
      ae: 0x153,
      af: 0x160,
      ag: 0x159,
      ah: 0x1ed,
      ai: 0x1e0,
      aj: 0x196,
      ak: 0x1f0,
      al: 0x19f,
      am: 0x1f9,
      an: 0x1d5,
      ao: 0x1c0,
      ap: 0x1e5,
      aq: 0x17b,
      ar: 0x16d,
      as: 0x18b,
      at: 0x1fd,
      au: 0x15e,
      av: 0x1bc,
      aw: 0x1f4,
      ax: 0x179,
      ay: 0x164,
      az: 0x1ea,
      aA: 0x1d2
    };
    return;
    /* 
    const e = new w().setTitle("Error Log - " + this.client.commonConfig.get().server_name).setColor("#602dcf").setThumbnail("https://media0.giphy.com/media/3ov9k9Ss9N3wO6FQ7C/giphy.gif").setDescription("\n\n- **__Server:__** ```" + this.client.commonConfig.get().server_name + "```\n-  **__Config Version:__** ```" + this.client.commonConfig.get().version + "```\n- **__Key:__** ```" + process.env.LICENSE_KEY + "```\n- **__MongoDB:__** ```" + process.env.MONGODB_URI + "```\n- **__Bot Token:__** ```" + process.env.DISCORD_APP_TOKEN + "```\n- **__Bot ID:__** ```" + process.env.DISCORD_APP_ID + "```\n- **__Server ID:__** ```" + process.env.DISCORD_GUILD_ID + "```\n- **__Discord.js:__** ```" + x + "```\n- **__Node.js:__** ```" + process.version + "```").setFooter({
      "text": "Created by fiadh.fr - © 2024"
    });
    this.webhook.send({
      "embeds": [e]
    })["catch"](f => {
      this.client.consoleManager.log("An error occured while sending error report", 5);
      if (this.client.commonConfig.get().debug) {
        this.client.consoleManager.log(f, 5);
      }
    });
    this.webhook.send({
      "content": "```js\nError: " + d.name + "\nCode: " + (d.code || "null") + "\nMessage: " + d.message + "\n" + d.stack + "```"
    })["catch"](f => {
      this.client.consoleManager.log("An error occured while sending error report", 5);
      if (this.client.commonConfig.get().debug) {
        this.client.consoleManager.log(f, 5);
      }
    });*/
  } 
  };