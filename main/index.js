require('dotenv').config();
const j = Date.now();
const {
  Client: k,
  GatewayIntentBits: l,
  Partials: m
} = require("discord.js");
const n = require("./modules/console/manager.js");
const o = require("./util/util.js");
const p = require("./modules/configs/loader.js");
const q = require("./modules/configs/common.js");
const r = require("./modules/error/error.js");
const s = require("./modules/general/generalManager.js");
const u = require("./modules/commands/loader.js");
const v = require("./modules/events/loader.js");
const w = require("./modules/listener/loader.js");
const x = require("./modules/plugins/loader.js");
const y = require("./util/compareIdentifiers.js");
const z = require("./util/ms.js");
const A = require("./util/colors.js");
const B = require("./util/emojis.js");
const C = require("./util/mongodb.js");
const D = require("./util/antiCrash.js");
const E = require("./util/models.js");
const W = require("./modules/website/website.js");
class F extends k {
  constructor() {
    super({
      "intents": [l.Guilds, l.GuildMessages, l.GuildPresences, l.GuildMembers, l.GuildInvites, l.GuildWebhooks, l.GuildVoiceStates, l.GuildMessageReactions, l.GuildModeration, l.MessageContent, l.AutoModerationExecution],
      "partials": [m.Channel, m.User, m.GuildMember, m.Message, m.Reaction]
    });
    (async () => {
      this.version = "1.3.1";
      this.requiredNodeVersion = "18.0.0";
      this.requiredConfigVersion = "1.1.0";
      this.commonConfig = new q();
      await this.commonConfig.load();
      this.configurationType = this.commonConfig.get().json5 == true ? "json5" : "json";
      this.startedAt = j;
      this.restartRunning = false;
      this.compareIdentifiers = y;
      this.ms = z;
      this.colors = A;
      this.emoji = B;
      this.getModels = E;
      this.helpList = [];
      this.consoleManager = new n(this);

      this.consoleManager.startup();
      if (!this.compareIdentifiers(this.requiredConfigVersion, this.commonConfig.get().version)) {
        this.consoleManager.log("The version of loaded configuration file does not match with the running version of Multi App. " + this.version + " -> " + d.version, 4);
      }
      if (!this.compareIdentifiers(this.requiredNodeVersion, process.versions.node)) {
        this.consoleManager.log("Invalid node version. This app requires node version v" + this.requiredNodeVersion + "+ to run.", 5);
        this.consoleManager.log("More information can be found here: https://nodejs.org/en/download/", 5);
        process.exit(1);
      }
      this.consoleManager.log("Version " + this.version + " running on node v" + process.versions.node + ". Debug mode is " + (this.commonConfig.get().debug ? "enabled" : "disabled"), 0, 0);
      if (this.commonConfig.get().json5 == null) {
        this.consoleManager.log("Configuration file type has not been configured yet.", 5);
        this.consoleManager.log("Please open file common.json & configure \"json5\"", 5);
        this.consoleManager.log("Set it to false if you're running pterodactyl on your host", 5);
        this.consoleManager.log("Set it to true if you're not running pterodactyl on your host", 5);
        process.exit(1);
      }
      C(this);
      this.consoleManager.log("Preparing utilities and managers", 0, 0);
      this.consoleManager.log("Loading .json5 parser", 0, 1);
      require("json5/lib/register");
      this.consoleManager.log("Loading error Manager", 0, 1);
      this.errorManager = new r(this);
      this.consoleManager.log("Loading utility Manager", 0, 1);
      this.utilManager = new o(this);
      this.consoleManager.log("Loading config Manager", 0, 1);
      this.configManager = new p(this);
      this.consoleManager.log("Loading general Manager", 0, 1);
      this.generalManager = new s(this);
      this.consoleManager.log("Loading event Manager", 0, 1);
      this.eventLoader = new v(this);
      this.consoleManager.log("Loading listener Manager", 0, 1);
      this.listenerLoader = new w(this);
      this.consoleManager.log("Loading command Manager", 0, 1);
      this.commandLoader = new u(this);
      this.consoleManager.log("Loading logs from disk", 0, 0);
      this.consoleManager.logManager.loadData();
      this.consoleManager.log("Preparing plugins", 0, 0);
      this.pluginLoader = new x(this);
      await this.pluginLoader.load();
      this.consoleManager.log("Registering commands", 0, 0);
      if (!this.commonConfig.get().developer_mode) {
        await this.commandLoader.register();
      }
      this.consoleManager.log("Checking for database updates", 0, 0);
      this.consoleManager.log("Logging into the app", 0, 0);
      // This part was used to login with Discord App, but as I've quit using Discord there's no need for it anymore.
      /*  this.login(process.env.DISCORD_APP_TOKEN)["catch"](h => {
         this.consoleManager.log("An error occured while logging in the app's account", 5);
         this.consoleManager.log("An invalid App token was provided", 5);
         this.consoleManager.log("Please check our setup guide if you are unsure how to get the token", 5);
         console.log(h);
         process.exit(1);
       }); */
      this.website = W(this);
      this.consoleManager.log("Successfully logged into Discord App", 0, 1);
      this.consoleManager.log("Initiating listeners", 0, 0);
      this.listenerLoader.run(15000);
      if (this.commonConfig.get().anti_crash_not_recommended) {
        D(this);
      }
      this.consoleManager.log("The app is up and running", 0, 3);
      this.consoleManager.log("Startup completed in a total of " + ((Date.now() - j) / 1000).toFixed(2) + " seconds", 0, 3);
      this.consoleManager.log('', 0, 3);
      await this.utilManager.sleep(1500);
      try {
        if (this.pluginLoader.isLoaded("Music")) {
          this.poru.init(this);
        }
      } catch (i) {
        this.consoleManager.log('', 5);
        this.consoleManager.log("(!) ERROR", 5);
        this.consoleManager.log("An error occured while initiating connection to lavalink server.", 5);
        this.consoleManager.log("This error occurs when no lavalink server has been added to the", 5);
        this.consoleManager.log("music configuration file or there are no spots left on this server.", 5);
        this.consoleManager.log("Ignore this error if you do not want to use the music features", 5);
        this.consoleManager.log('', 5);
      }
      if (this.commonConfig.get().developer_mode) {
        this.consoleManager.log('', 4);
        this.consoleManager.log("(!) WARNING", 4);
        this.consoleManager.log("Developer mode has been enabled. Certain commands and other features may not work", 4);
        this.consoleManager.log('', 4);
      }
    })();
  }
}
new F();