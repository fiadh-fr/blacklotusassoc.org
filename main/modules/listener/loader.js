module.exports = class v {
  constructor(d) {
    const G = {
      d: 0x1b5,
      e: 0x1a6
    };
    this.client = d;
    this.listeners = [];
  }
  ["load"](d) {
    const H = {
      d: 0x1a6
    };
    this.listeners.push(d);
  }
  ["run"](d) {
    const I = {
      d: 0x1b3,
      e: 0x1b7,
      f: 0x1b0
    };
    setInterval(() => {
      if (this.client.restartRunning) {
        return;
      }
      const e = Date.now();
      for (const f of this.listeners) {
        if (f.nextRun < e && !f.disabled) {
          f.execute();
          f.nextRun = e + f.duration;
        }
      }
    }, d || 30000);
  }
};