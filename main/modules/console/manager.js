const x = require("./colors.js");
const y = require("./logs.js");
module.exports = class z {
  constructor(d) {
    this.client = d;
    this.colors = x;
    this.debug = this.client.commonConfig.get().debug || false;
    this.includeDate = this.client.commonConfig.get().includeDate || true;
    this.logManager = new y(this.client);
    this.keywords = [{
      "keyword": "[STA]",
      "color": [this.colors.FOREGROUND.cyan, this.colors.FOREGROUND.green, this.colors.FOREGROUND.red, this.colors.BACKGROUND.magenta]
    }, {
      "keyword": "[EVT]",
      "color": [this.colors.FOREGROUND.cyan]
    }, {
      "keyword": "[CMD]",
      "color": [this.colors.FOREGROUND.green]
    }, {
      "keyword": "[LOG]",
      "color": [this.colors.FOREGROUND.blue]
    }, {
      "keyword": "[WAR]",
      "color": [this.colors.FOREGROUND.yellow]
    }, {
      "keyword": "[ERR]",
      "color": [this.colors.FOREGROUND.red]
    }, {
      "keyword": "[DEB]",
      "color": [this.colors.FOREGROUND.crimson]
    }, {
      "keyword": "[API]",
      "color": [this.colors.FOREGROUND.magenta]
    }, {
      "keyword": "[WEB]",
      "color": [this.colors.FOREGROUND.magenta, this.colors.BACKGROUND.magenta, this.colors.FOREGROUND.red]
    }];
    this.format = "{COLOR_1}{BRIGHT}{DATE}{RESET}{BRIGHT}{COLOR_2}{KEYWORD}{RESET} |{BRIGHT} {COLOR}{MESSAGE}{RESET}";
    this.resolveColors();
    this.resolveDate();
  }
  ["getTimestamp"]() {
    const d = new Date();
    const e = f => {
      if (f < 10) {
        f = "0" + f;
      }
      return f;
    };
    return e(d.getHours()) + ":" + e(d.getMinutes()) + ":" + e(d.getSeconds());
  }
  ["resolveColors"]() {
    this.format = this.format.replace(/{COLOR_1}/g, this.colors.FOREGROUND.black).replace(/{BRIGHT}/g, this.colors.bright).replace(/{RESET}/g, this.colors.reset).replace(/{COLOR_2}/g, this.colors.FOREGROUND.white);
  }
  ["resolveDate"]() {
    if (this.client.commonConfig.get().console_logs_include_date) {
      return;
    }
    this.format.replace(/{DATE}/g, '');
  }
  ["log"](d, e, f) {
    if (e == 6 && !this.debug) {
      return;
    }
    const g = this.keywords[e];
    const h = this.format.replace(/{DATE}/g, this.includeDate ? this.getTimestamp() + " | " : '').replace(/{KEYWORD}/g, g.keyword).replace(/{COLOR}/g, g.color[f || 0]).replace(/{MESSAGE}/g, d);
    console.log(h);
    if (e == 5 && this.debug && d.error) {
      console.log(d);
    }
    this.logManager.addLine(h);
  }
  ["startup"]() {
    this.log("Starting process initiated, The Black LotusApp & Website building.", 0, 2);
  }
};