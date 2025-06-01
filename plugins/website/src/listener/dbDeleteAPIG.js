require('dotenv').config();
const u = require("../../../../main/modules/listener/manager.js");
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const apiUrl1 = process.env.API_URL_1;
const apiUrl2 = process.env.API_URL_2;
const tokenBearer = process.env.API_TOKEN_1;
module.exports = class x extends u {
  constructor(d) {
    const L = {
      d: 0xee,
      e: 0xd8,
      f: 0xc8,
      g: 0x10a,
      h: 0xf4
    };
    super(d, {
      "listener": "dbDeleteAPIG",
      "duration": 300000,
      "nextRun": Date.now() + 60000,
      "disabled": false
    });
  }
  async ["execute"]() {
    const M = {
      d: 0xe3,
      e: 0xc8,
      f: 0xfe,
      g: 0x11c,
    };
    try {
      this.client.consoleManager.log('[API G] | [Delete Module] Running the verification process', 7);

      const GuildData = await this.client.getModels("guildsDataDB");

      const [response1, response2] = await Promise.all([
        axios.get(apiUrl1, {
          headers: { 'Authorization': `Bearer ${tokenBearer}` }
        }),
        axios.get(apiUrl2, {
          headers: { 'Authorization': `Bearer ${tokenBearer}` }
        })
      ]);

      const dbIds = (await GuildData.find({}, { id: 1 })).map(data => data.id);

      const apiIds1 = Object.values(response1.data).flatMap(guild => guild.map(data => data.id));

      const apiIds2 = response2.data.map(guild => guild.id)

      const apiIds = new Set([...apiIds1, ...apiIds2]);

      const idsOnlyInDB = dbIds.filter(id => !apiIds.has(id));

      for (const id of idsOnlyInDB) {
        await GuildData.deleteOne({ id }).catch(err => {
          this.client.consoleManager.log(`[API G] | [Delete Module] An error has occurred while trying to delete of the database the guild ${id}: ${err}`, 5);
        });;
        const filePath = path.join('/main/modules/website/public/discovery-pages', `${id}.html`);
        console.log(filePath)
        fs.unlink(filePath, (err) => {
          if (err) {
            this.client.consoleManager.log(`[API G] | [Delete Module] An error has occurred while trying to delete of the database the guild ${id}: ${err}`, 5);
          }
        });
        this.client.consoleManager.log(`[API G] | [Delete Module] The guild ${id} has been successfully deleted from the database`, 4);
      }
      this.client.consoleManager.log('[API G] | [Delete Module] Stopping the verification process', 7);
    } catch (error) {
      this.client.errorManager.errorReport(this.client.configManager.get("lang").lang.unexpected_function_error.replace(/%function%/g, this.name), error);
    }
  }
};