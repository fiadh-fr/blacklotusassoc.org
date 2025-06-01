require('dotenv').config();
const {
  Collection: L,
  REST: M,
  Routes: N
} = require("discord.js");
module.exports = class O {
  constructor(d) {
    const a4 = {
      d: 0x215,
      e: 0x1d8
    };
    this.client = d;
    this.commands = new L();
    this.discordAPI = {
      "global": [],
      "local": []
    };
    this.categoryData = [];
    this.commandsLoaded = 0;
  }
  ["load"](d) {
    const a5 = {
      d: 0x216,
      e: 0x1cc,
      f: 0x200,
      g: 0x1f1,
      h: 0x1a7,
      i: 0x1d6,
      j: 0x1bd
    };
    this.commands.set(d.name, d);
    if (this.categoryData.includes(d.category)) {
      this.client.helpList[this.categoryData.indexOf(d.category)].data.push({
        "name": d.name,
        "description": d.description
      });
    } else {
      this.categoryData.push(d.category);
      this.client.helpList[this.categoryData.indexOf(d.category)] = {
        "name": d.category,
        "data": [{
          "name": d.name,
          "description": d.description
        }]
      };
    }
    this.discordAPI[d.global ? "global" : "local"].push(d.discordAPI.toJSON());
  }
  async ["register"]() {
    const a8 = {
      d: 0x1b3,
      e: 0x209,
      f: 0x205,
      g: 0x1ad,
      h: 0x1f0,
      i: 0x1ba,
      j: 0x1f4,
      k: 0x1f3,
      l: 0x1b9,
      m: 0x1e6,
      n: 0x20a,
      o: 0x1b2,
      p: 0x1e3,
      q: 0x1da,
      r: 0x1d0,
      s: 0x1d8,
      t: 0x1aa
    };
    const a7 = {
      d: 0x1f4,
      e: 0x1a6,
      f: 0x1d4,
      g: 0x1e5,
      h: 0x1ef,
      i: 0x1e0,
      j: 0x217,
      k: 0x1ce,
      l: 0x1cb,
      m: 0x1a6,
      n: 0x1ed,
      o: 0x1b2,
      p: 0x1f3,
      q: 0x1fa,
      r: 0x1a6,
      s: 0x1a6,
      t: 0x1d9,
      u: 0x210,
      v: 0x1f8,
      w: 0x1c0,
      x: 0x1f4,
      y: 0x1c3,
      z: 0x1f5,
      A: 0x1e1,
      B: 0x1e2,
      C: 0x1fa,
      D: 0x1ea,
      E: 0x1c9,
      F: 0x20d,
      G: 0x1c5,
      H: 0x21a,
      I: 0x1b2,
      J: 0x1a6
    };
    const a6 = {
      d: 0x1ca,
      e: 0x1c6,
      f: 0x1e4,
      g: 0x1e9,
      h: 0x1f4,
      i: 0x211,
      j: 0x1fa,
      k: 0x1a6,
      l: 0x1b8,
      m: 0x1dc,
      n: 0x1e2,
      o: 0x1b2,
      p: 0x20b,
      q: 0x1c9,
      r: 0x213,
      s: 0x204,
      t: 0x1ef,
      u: 0x1a6,
      v: 0x1f4,
      w: 0x1ef,
      x: 0x202,
      y: 0x208,
      z: 0x1e0,
      A: 0x217,
      B: 0x1ce,
      C: 0x1b2,
      D: 0x1c9,
      E: 0x218,
      F: 0x21a
    };
    // This part was used to login with Discord App, but as I've quit using Discord there's no need for it anymore.
    /* const d = new M({
      "version": "10"
    }).setToken(process.env.DISCORD_APP_TOKEN);
    const e = await d.put(N.applicationGuildCommands(process.env.DISCORD_APP_ID, process.env.DISCORD_GUILD_ID), {
      "body": this.discordAPI.local
    })["catch"](g => {
      this.client.consoleManager.log("An error occured while requesting local application command registration", 5);
      this.client.consoleManager.log("If this issue persists please make sure the app & guild id in common.json is configured right", 5);
      this.client.consoleManager.log("Another possible issue can be missing permissions of the app. Please follow the guide!", 5);
      if (this.client.commonConfig.get().debug) {
        this.client.consoleManager.log(g, 5);
      }
    }); */
    // This part was used to login with Discord App, but as I've quit using Discord there's no need for it anymore.
    /* this.client.consoleManager.log("Successfully registered " + (e ? e.length : 0) + " local slash commands", 0, 1);
    const f = await d.put(N.applicationCommands(process.env.DISCORD_APP_ID), {
      "body": this.discordAPI.global
    })["catch"](g => {
      this.client.consoleManager.log("An error occured while requesting global application command registration", 5);
      this.client.consoleManager.log("If this issue persists please make sure the app & guild id in common.json is configured right", 5);
      this.client.consoleManager.log("Another possible issue can be missing permissions of the app. Please follow the guide!", 5);
      if (this.client.commonConfig.get().debug) {
        this.client.consoleManager.log(g, 5);
      }
    }); 
    this.client.consoleManager.log("Successfully registered " + (f ? f.length : 0) + " global slash commands", 0, 1);
    this.commandsLoaded = (f ? f.length : 0) + (e ? e.length : 0);*/
  }
};