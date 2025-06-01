require('dotenv').config();

const express = require('express');
const axios = require('axios');
const fs = require("fs");
const PORT = process.env.PORT || 3000;

module.exports = function start(client = null) {
  // Create a minimal client if none is provided
  const defaultClient = {
    consoleManager: {
      log: (message, ...args) => console.log(message)
    },
    getModels: (dbName) => {
      // You'll need to implement your database model logic here
      // This is just a placeholder example
      const mongoose = require('mongoose');
      const schema = new mongoose.Schema({
        count: Number,
        realCount: Number
      });
      return mongoose.model(dbName, schema);
    }
  };

  const activeClient = client || defaultClient;
  const VisitCount = activeClient.getModels("siteDataDB");

  function validateEnvVariables() {
    if (!process.env.API_URL_1 || !process.env.API_URL_2 || !process.env.API_URL_3 || !process.env.API_TOKEN_1) {
      activeClient.consoleManager.log("Please define the environment variables API_TOKEN_1, API_URL_1, and API_URL_2", 8, 2);
      process.exit(1);
    }
  }

  async function getVisitCount() {
    let visitCount = await VisitCount.findOne();

    if (!visitCount) {
      visitCount = new VisitCount({ count: 0, realCount: 0 });
      await visitCount.save();
    }

    return visitCount;
  }

  async function incrementVisitCount() {
    const visitCount = await getVisitCount();
    visitCount.count += 123;
    visitCount.realCount += 1;
    await visitCount.save();
    return visitCount.count;
  }

  async function fetchAllGuildsAndMembers() {
    try {
      const response = await axios.get(process.env.API_URL_3, {
        headers: {
          Authorization: `Bearer ${process.env.API_TOKEN_1}`
        }
      });

      if (response.data) {
        return {
          allGuildsTotal: response.data.totalGuilds,
          allMembersTotal: response.data.totalUsers
        };
      } else {
        activeClient.consoleManager.log("Error: Invalid API response", 8, 2);
        return {
          allGuildsTotal: 0,
          allMembersTotal: 0
        };
      }
    } catch (error) {
      activeClient.consoleManager.log("Error while fetching data from the API", 8, 2);
      activeClient.consoleManager.log(error, 8, 2)
      return {
        allGuildsTotal: 0,
        allMembersTotal: 0
      };
    }
  }

  function handleRouteErrors(app) {
    app.use((err, req, res, next) => {
      activeClient.consoleManager.log("An error occurred on the server", 8, 2)
      activeClient.consoleManager.log(err.stack, 8, 2);
      res.status(500).sendFile(`${__dirname}/public/404.html`);
    });
  }

  async function isValidConstellation(constellation) {
    const guild = require('../../util/models/guildsDataDB.js');
    const count = await guild.countDocuments({ constellation });
    return count > 0;
  }

  function handlePageRoutes(app) {
    const router = express.Router();

    router.get("/", async (req, res) => {
      try {
        await incrementVisitCount();
        const filePath = `${__dirname}/public/index.html`;
        try {
          await fs.promises.access(filePath, fs.constants.F_OK);
          res.sendFile(filePath);
        } catch {
          res.status(404).sendFile(`${__dirname}/public/404.html`);
        }
      } catch (error) {
        activeClient.consoleManager.log("An error occurred on the server", 8, 2);
        activeClient.consoleManager.log(error, 8, 2)
        res.status(500).sendFile(`${__dirname}/public/404.html`);
      }
    });

    router.get("/home", (req, res) => {
      res.redirect("/");
    });

    router.get("/:page", async (req, res) => {
      try {
        await incrementVisitCount();
        const page = req.params.page;
        const filePath = `${__dirname}/public/${page}.html`;
        try {
          await fs.promises.access(filePath, fs.constants.F_OK);
          res.sendFile(filePath);
        } catch {
          res.status(404).sendFile(`${__dirname}/public/404.html`);
        }
      } catch (error) {
        activeClient.consoleManager.log("An error occurred on the server", 8, 2);
        activeClient.consoleManager.log(error, 8, 2)
        res.status(500).sendFile(`${__dirname}/public/404.html`);
      }
    });

    router.get("/servers/:page", async (req, res) => {
      try {
        await incrementVisitCount();
        const page = req.params.page;
        const filePath = `${__dirname}/public/discovery-pages/${page}.html`;
        try {
          await fs.promises.access(filePath, fs.constants.F_OK);
          res.sendFile(filePath);
        } catch {
          res.status(404).sendFile(`${__dirname}/public/404.html`);
        }
      } catch (error) {
        activeClient.consoleManager.log("An error occurred on the server", 8, 2);
        activeClient.consoleManager.log(error, 8, 2)
        res.status(500).sendFile(`${__dirname}/public/404.html`);
      }
    });

    router.get("/discovery/:constellation", async (req, res) => {
      try {
        await incrementVisitCount();
        let constellation = req.params.constellation;
        if (constellation) {
          if (constellation.toLowerCase() == 'blacksyndicate') {
            constellation = 'Black Syndicate';
          } else {
            constellation = constellation.charAt(0).toUpperCase() + constellation.slice(1).toLowerCase();
          }
        }
        const isValid = await isValidConstellation(constellation);

        if (isValid) {
          res.sendFile(`${__dirname}/public/discovery.html`);
        } else {
          res.status(404).sendFile(`${__dirname}/public/404.html`);
        }
      } catch (error) {
        activeClient.consoleManager.log("An error occurred on the server", 8, 2);
        activeClient.consoleManager.log(error, 8, 2)
        res.status(500).sendFile(`${__dirname}/public/404.html`);
      }
    });

    app.use("/", router);
  }

  async function getUniqueConstellations() {
    const guild = require('../../util/models/guildsDataDB.js');

    const order = [
      'Phoenix',
      'Hydrus',
      'Byakko',
      'Seiryu',
      'Suzaku',
      'Black Syndicate'
    ];

    const constellations = await guild.aggregate([
      { $group: { _id: "$constellation", count: { $sum: 1 } } },
      { $project: { _id: 0, constellation: "$_id", count: 1 } }
    ]);

    const sortedConstellations = constellations.sort((a, b) => {
      return order.indexOf(a.constellation) - order.indexOf(b.constellation);
    });

    return sortedConstellations;
  }

  async function handleApiFilterRequest(req, res, constellation) {
    try {
      const searchTerm = req.query.query;
      const limit = parseInt(req.query.limit) || 12;
      const offset = parseInt(req.query.offset) || 0;

      let query = { constellation };

      if (searchTerm) {
        const regex = new RegExp('.*' + searchTerm + '.*', 'i');
        query.$or = [
          { currentName: { $regex: regex } },
          { description: { $regex: regex } },
          { text: { $regex: regex } }
        ];
      }

      const guild = require('../../util/models/guildsDataDB.js');

      async function getTotalMembers() {
        try {
          const result = await guild.aggregate([
            {
              $group: {
                _id: null,
                totalMembers: { $sum: "$members" }
              }
            }
          ]);

          const totalMembers = result.length > 0 ? result[0].totalMembers : 0;

          return totalMembers;
        } catch (error) {
          activeClient.consoleManager.log("Error while calculating the total number of members", 8, 2);
          activeClient.consoleManager.log(error, 8, 2)
          return 0;
        }
      }

      async function getViewCountsTotal() {
        try {
          const result = await VisitCount.findOne();
          const viewCountsTotal = result ? result.count : 0;
          return viewCountsTotal;
        } catch (error) {
          activeClient.consoleManager.log("Error while retrieving the total number of views", 8, 2);
          activeClient.consoleManager.log(error, 8, 2)
          return 0;
        }
      }

      const viewCountsTotal = await getViewCountsTotal()
      const allGuildsCount = await guild.countDocuments();
      const totalGuildsCount = await guild.countDocuments(query);
      const guilds = await guild.aggregate([
        { $match: query },
        {
          $addFields: {
            highlighted1Value: { $cond: { if: { $eq: ["$highlighted1.value", true] }, then: 1, else: 0 } }
          }
        },
        {
          $sort: {
            highlighted1Value: -1,
            highlighted2: -1,
            newServer: -1,
            members: -1
          }
        },
        { $skip: offset },
        { $limit: limit }
      ]);

      const totalPages = Math.ceil(totalGuildsCount / limit);
      const totalMembers = await getTotalMembers();
      const uniqueConstellations = await getUniqueConstellations();

      res.json({
        infoAPI: "This is a semi-private API designed to provide transparent access to select data for https://blacklotusassoc.org/ by The Black Lotus Association ©. While the API is primarily intended for internal use, we have opened it to the public to promote transparency.",
        copyright: "2024 © - The Black Lotus Assoc. - All rights reserved.",
        currentPage: (offset / limit) + 1,
        totalPages: totalPages,
        totalGuilds: totalGuildsCount,
        totalMembers: totalMembers,
        allGuildsTotal: allGuildsTotal,
        allMembersTotal: allMembersTotal,
        siteViewsTotal: viewCountsTotal,
        apiReport: {
          uniqueConstellations: uniqueConstellations,
          guildsCount: allGuildsCount,
        },
        guilds: guilds
      });

    } catch (err) {
      activeClient.consoleManager.log("Error while fetching data from the API", 8, 2)
      activeClient.consoleManager.log(err, 8, 2);
      res.status(500).json({ message: 'Error while fetching data from the API' });
    }
  }

  function serveStaticAssets(app) {
    app.use('/css', express.static(__dirname + '/public/assets/css'));
    app.use('/js', express.static(__dirname + '/public/assets/js'));
    app.use('/footage', express.static(__dirname + '/public/assets/footage'));
    app.use('/webfonts', express.static(__dirname + '/public/assets/webfonts'));
  }

  async function startServer() {
    const app = express();

    const { allGuildsTotal, allMembersTotal } = await fetchAllGuildsAndMembers();

    validateEnvVariables();
    serveStaticAssets(app);
    handleRouteErrors(app);
    handlePageRoutes(app);

    const Joi = require('joi');

    app.get('/api/endpoint', async (req, res) => {
      try {
        const { error } = validateQueryParams(req.query);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const searchTerm = req.query.query;
        const limit = parseInt(req.query.limit) || 12;
        const offset = parseInt(req.query.offset) || 0;

        let query = {};

        if (searchTerm) {
          const regex = new RegExp('.*' + searchTerm + '.*', 'i');
          query = {
            $or: [
              { currentName: { $regex: regex } },
              { description: { $regex: regex } },
              { constellation: { $regex: regex } },
              { text: { $regex: regex } }
            ]
          };
        }

        const guild = require('../../util/models/guildsDataDB.js');

        async function getTotalMembers() {
          try {
            const result = await guild.aggregate([
              {
                $group: {
                  _id: null,
                  totalMembers: { $sum: "$members" }
                }
              }
            ]);

            const totalMembers = result.length > 0 ? result[0].totalMembers : 0;
            return totalMembers;
          } catch (error) {
            activeClient.consoleManager.log("Error while calculating the total number of members", 8, 2);
            activeClient.consoleManager.log(error, 8, 2)
            return 0;
          }
        }

        async function getViewCountsTotal() {
          try {
            const result = await VisitCount.findOne();
            const viewCountsTotal = result ? result.count : 0;
            return viewCountsTotal;
          } catch (error) {
            activeClient.consoleManager.log("Error while retrieving the total number of views", 8, 2);
            activeClient.consoleManager.log(error, 8, 2)
            return 0;
          }
        }
        const viewCountsTotal = await getViewCountsTotal()

        const allGuildsCount = await guild.countDocuments();
        const totalGuildsCount = await guild.countDocuments(query);
        const guilds = await guild.aggregate([
          { $match: query },
          {
            $addFields: {
              highlighted1Value: { $cond: { if: { $eq: ["$highlighted1.value", true] }, then: 1, else: 0 } }
            }
          },
          {
            $sort: {
              highlighted1Value: -1,
              highlighted2: -1,
              newServer: -1,
              members: -1
            }
          },
          { $skip: offset },
          { $limit: limit }
        ]);
        const totalPages = Math.ceil(totalGuildsCount / limit);
        const totalMembers = await getTotalMembers();

        const uniqueConstellations = await getUniqueConstellations();

        res.json({
          infoAPI: "This is a semi-private API designed to provide transparent access to select data for https://blacklotusassoc.org/ by The Black Lotus Association ©. While the API is primarily intended for internal use, we have opened it to the public to promote transparency.",
          copyright: "2024 © - The Black Lotus Assoc. - All rights reserved.",
          currentPage: (offset / limit) + 1,
          totalPages: totalPages,
          totalGuilds: totalGuildsCount,
          totalMembers: totalMembers,
          allGuildsTotal: allGuildsTotal,
          allMembersTotal: allMembersTotal,
          siteViewsTotal: viewCountsTotal,
          apiReport: {
            uniqueConstellations: uniqueConstellations,
            guildsCount: allGuildsCount,
          },
          guilds: guilds
        });

      } catch (err) {
        activeClient.consoleManager.log("Error while fetching data from the API", 8, 2)
        activeClient.consoleManager.log(err, 8, 2);
        res.status(500).json({ message: 'Error while fetching data from the API' });
      }
    });

    app.get('/api/endpoint/:constellation?', async (req, res) => {
      try {
        let { constellation } = req.params;
        if (constellation) {
          if (constellation.toLocaleLowerCase() == 'blacksyndicate') {
            constellation = 'Black Syndicate';
          } else {
            constellation = constellation.charAt(0).toUpperCase() + constellation.slice(1).toLowerCase();
          }
        }

        const { error } = validateQueryParams(req.query);
        if (error) {
          return res.status(400).json({ message: error.details[0].message });
        }

        const { query: searchTerm, limit, offset } = req.query;

        let query = {};

        if (constellation) {
          query.constellation = constellation;
        }

        if (searchTerm) {
          const regex = new RegExp('.*' + searchTerm + '.*', 'i');
          query.$or = [
            { currentName: { $regex: regex } },
            { description: { $regex: regex } },
            { text: { $regex: regex } }
          ];
        }

        const guild = require('../../util/models/guildsDataDB.js');
        const offsetValue = offset !== undefined ? parseInt(offset) : 0;
        const limitValue = limit !== undefined ? parseInt(limit) : 12;

        async function getTotalMembers() {
          try {
            const result = await guild.aggregate([
              {
                $group: {
                  _id: null,
                  totalMembers: { $sum: "$members" }
                }
              }
            ]);

            const totalMembers = result.length > 0 ? result[0].totalMembers : 0;
            return totalMembers;
          } catch (error) {
            activeClient.consoleManager.log("Error while calculating the total number of members", 8, 2);
            activeClient.consoleManager.log(error, 8, 2)
            return 0;
          }
        }

        async function getViewCountsTotal() {
          try {
            const result = await VisitCount.findOne();
            const viewCountsTotal = result ? result.count : 0;
            return viewCountsTotal;
          } catch (error) {
            activeClient.consoleManager.log("Error while retrieving the total number of views", 8, 2);
            activeClient.consoleManager.log(error, 8, 2)
            return 0;
          }
        }
        const viewCountsTotal = await getViewCountsTotal()

        const allGuildsCount = await guild.countDocuments();
        const totalGuildsCount = await guild.countDocuments(query);
        const guilds = await guild.aggregate([
          { $match: query },
          {
            $addFields: {
              highlighted1Value: { $cond: { if: { $eq: ["$highlighted1.value", true] }, then: 1, else: 0 } }
            }
          },
          {
            $sort: {
              highlighted1Value: -1,
              highlighted2: -1,
              newServer: -1,
              members: -1
            }
          },
          { $skip: offsetValue },
          { $limit: limitValue }
        ]);

        const totalPages = Math.ceil(totalGuildsCount / limitValue);
        const currentPage = Math.ceil((offsetValue + 1) / limitValue);
        const totalMembers = await getTotalMembers();

        const uniqueConstellations = await getUniqueConstellations();

        res.json({
          infoAPI: "This is a semi-private API designed to provide transparent access to select data for https://blacklotusassoc.org/ by The Black Lotus Association ©. While the API is primarily intended for internal use, we have opened it to the public to promote transparency.",
          copyright: "2024 © - The Black Lotus Assoc. - All rights reserved.",
          currentPage: currentPage,
          totalPages: totalPages,
          totalGuilds: totalGuildsCount,
          totalMembers: totalMembers,
          allGuildsTotal: allGuildsTotal,
          allMembersTotal: allMembersTotal,
          siteViewsTotal: viewCountsTotal,
          apiReport: {
            uniqueConstellations: uniqueConstellations,
            guildsCount: allGuildsCount,
          },
          guilds: guilds
        });

      } catch (err) {
        activeClient.consoleManager.log("Error while fetching data from the API", 8, 2)
        activeClient.consoleManager.log(err, 8, 2);
        res.status(500).json({ message: 'Error while fetching data from the API' });
      }
    });

    function validateQueryParams(query) {
      const schema = Joi.object({
        query: Joi.string().allow(''),
        limit: Joi.number().integer().min(1).default(12),
        offset: Joi.number().integer().min(0).default(0)
      });

      return schema.validate(query);
    }

    app.listen(PORT, () => {
      activeClient.consoleManager.log(`Website server is up and running`, 8, 1);
      activeClient.consoleManager.log(`Website server running on port: ${PORT}`, 8, 1);
    });
  }

  startServer();
}