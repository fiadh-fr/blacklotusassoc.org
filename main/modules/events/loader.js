const {
  Collection: H,
  Events: I
} = require("discord.js");
module.exports = class J {
  constructor(d) {
    const T = {
      d: 0x186,
      e: 0x18a
    };
    this.client = d;
    this.interactionEvents = new H();
    this.eventsLoaded = 0;
  }
  ["load"](d) {
    const U = {
      d: 0x184,
      e: 0x198,
      f: 0x1a0,
      g: 0x1a0,
      h: 0x193,
      i: 0x19c,
      j: 0x196
    };
    const e = d.once ? "once" : "on";
    if (d.music) {
      this.client.poru[e](d.event, (...f) => d.execute(...f));
    } else if (d.event == I.InteractionCreate && !d["default"]) {
      this.interactionEvents.set(d.name, d);
    } else {
      this.client[e](d.event, (...f) => d.execute(...f));
    }
    this.eventsLoaded++;
  }
};