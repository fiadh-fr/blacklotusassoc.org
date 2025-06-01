require('dotenv').config();
const dayjs = require('dayjs');
const u = require("../../../../main/modules/listener/manager.js");
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const showdown = require('showdown');
const apiUrl = process.env.API_URL_2;
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
      "listener": "dbUpdateAPI2",
      "duration": 300000,
      "nextRun": Date.now() + 300000,
      "disabled": false
    });
  }
  async ["execute"]() {
    const M = {
      d: 0xe3,
      e: 0xc8,
      f: 0xfe,
      g: 0x11c,
      h: 0xc9,
      i: 0xd1,
      j: 0xeb,
      k: 0xd5,
      l: 0xf0,
      m: 0xe4,
      n: 0xdd,
      o: 0xc9,
      p: 0xf5,
      q: 0xfb,
      r: 0xf4,
      s: 0xcc,
      t: 0xf4,
      N: 0xf4,
      O: 0xec,
      P: 0x115,
      Q: 0xc3,
      R: 0xe8,
      S: 0xea,
      T: 0xe9,
      U: 0xf9,
      V: 0xfa,
      W: 0xea,
      X: 0x116,
      Y: 0xda,
      Z: 0xc5,
      a0: 0xed,
      a1: 0xfe,
      a2: 0x11c,
      a3: 0xff,
      a4: 0x100
    };
    try {
      const d = this.client.configManager.get("lang")
      this.client.consoleManager.log('[API 2] | [Update Module] Running the verification process', 7);
      const GuildData = await this.client.getModels("guildsDataDB")
      const response = await axios.get(apiUrl, {
        headers: {
          'Authorization': `Bearer ${tokenBearer}`
        }
      });
      const guildsData = response.data;
      for (const guildDataAPI of guildsData) {
        const existingGuildData = await GuildData.findOne({ id: guildDataAPI.id });
        function isEqual(db, api) {
          return db.cached === api.cached &&
            db.currentName === api.currentName &&
            db.constellation === "Black Syndicate" &&
            db.joinedAt === api.joinedAt &&
            db.members === api.members &&
            db.text === api.partnerships.message &&
            db.description === api.description &&
            db.invite === api.invite &&
            db.icon === api.icon &&
            db.banner === api.banner &&
            db.verified === api.features.includes("VERIFIED") &&
            db.partner === api.features.includes("PARTNERED");

        }

        const joinedAtDate = dayjs(guildDataAPI.joinedAt);
        const newServer = joinedAtDate.isAfter(dayjs().subtract(21, 'days'));

        if (!existingGuildData) {
          return;
        } else if (!isEqual(existingGuildData, guildDataAPI)) {
          const updateData = {
            cached: guildDataAPI.cached,
            currentName: guildDataAPI.currentName,
            constellation: "Black Syndicate",
            joinedAt: guildDataAPI.joinedAt,
            members: guildDataAPI.members,
            text: guildDataAPI.partnerships.message,
            description: guildDataAPI.description,
            invite: guildDataAPI.invite,
            icon: guildDataAPI.icon,
            banner: guildDataAPI.banner,
            verified: guildDataAPI.features.includes("VERIFIED"),
            partner: guildDataAPI.features.includes("PARTNERED"),
            newServer: newServer,
          };

          await GuildData.findOneAndUpdate(
            { id: guildDataAPI.id },
            updateData,
            { upsert: true, new: true }
          ).catch(err => {
            this.client.consoleManager.log(`[API 2] | [Update Module] An error has occurred while trying to update the guild ${guildDataAPI.id}: ${err}`, 5);
          });

          const iconPath = `public/assets/footage/discovery/icons/${guildDataAPI.id}_icon`;
          const bannerPath = `public/assets/footage/discovery/banners/${guildDataAPI.id}_banner`;

          await this.downloadImage(guildDataAPI.icon, iconPath, "icon", guildDataAPI.id);
          await this.downloadImage(guildDataAPI.banner, bannerPath, "banner", guildDataAPI.id);

          const serverHtmlContent = generateServerHtml(guildDataAPI);
          const filePath = path.join(__dirname, 'main/modules/website/public/discovery-pages', `${guildDataAPI.id}.html`);
          fs.writeFile(filePath, serverHtmlContent, (err) => { });

          function formatNumber(number) {
            return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "’");
          }

          function convertTimestamp(timestamp) {
            const date = new Date(Number(timestamp));
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return date.toLocaleDateString('pt-BR', options);
          }

          function generateServerHtml(guildDataAPI) {
            const templatePath = d;
            let templateContent = templatePath.servers.default;

            const badgename = ("Black Syndicate").toLowerCase().replace(' ', '');
            const badgePath = `/footage/icons/${badgename}_badge.svg`

            const newBadge = newServer ? `<div class="guildJoinReason-1FY-_0_q6-t2 guildJoinReasonContainer-2BwDTG_JPqAx"><div class="iconContainer-37Q3pA_1Fpmq"><img class="guildJoinReasonEmojiIcon-16ASX2_Sn23b" src="/footage/icons/z_newServer_badge.svg" alt=""></div><div class="guildJoinReasonTextContainer-26hRN3_rmpgB"><div class="colorStandard-1nZ0G7_mNU5H size16-X_VnLa_idtPZ textMedium-3Ic-hz_UT0gD">Novidade!</div></div></div>` : '';
            const verifiedBadge = guildDataAPI.features.includes("VERIFIED") ? `<div class="guildJoinReason-1FY-_0_q6-t2 guildJoinReasonContainer-2BwDTG_JPqAx"><div class="iconContainer-37Q3pA_1Fpmq"><img class="guildJoinReasonEmojiIcon-16ASX2_Sn23b" src="/footage/icons/z_verified_badge.svg" alt=""></div><div class="guildJoinReasonTextContainer-26hRN3_rmpgB"><div class="colorStandard-1nZ0G7_mNU5H size16-X_VnLa_idtPZ textMedium-3Ic-hz_UT0gD">Verified</div></div></div>` : '';
            const partnerBadge = guildDataAPI.features.includes("PARTNERED") ? `<div class="guildJoinReason-1FY-_0_q6-t2 guildJoinReasonContainer-2BwDTG_JPqAx"><div class="iconContainer-37Q3pA_1Fpmq"><img class="guildJoinReasonEmojiIcon-16ASX2_Sn23b" src="/footage/icons/z_partner_badge.svg" alt=""></div><div class="guildJoinReasonTextContainer-26hRN3_rmpgB"><div class="colorStandard-1nZ0G7_mNU5H size16-X_VnLa_idtPZ textMedium-3Ic-hz_UT0gD">Partner</div></div></div>` : '';
            const highlightedBadge = existingGuildData.highlighted1 ? `<div class="guildJoinReason-1FY-_0_q6-t2 guildJoinReasonContainer-2BwDTG_JPqAx"><div class="iconContainer-37Q3pA_1Fpmq"><img class="guildJoinReasonEmojiIcon-16ASX2_Sn23b" src="/footage/icons/z_highlighted_badge.svg" alt=""></div><div class="guildJoinReasonTextContainer-26hRN3_rmpgB"><div class="colorStandard-1nZ0G7_mNU5H size16-X_VnLa_idtPZ textMedium-3Ic-hz_UT0gD">Em Destaque!</div></div></div>` : '';

            const nameFormat = guildDataAPI.currentName.replace(/[\[\]\(\)]/g, '');

            const bannerMarkdown = guildDataAPI.banner ? guildDataAPI.banner : `https://media.discordapp.net/attachments/1150106588758167694/1150174200812797962/bl.png?ex=66caf2f2&is=66c9a172&hm=81704c46645ff2eff104cc337782a3deea4a3addb043c330ed3bf03096d63cef&=&format=webp&quality=lossless&width=2180&height=776`

            const defaultText = `## **${guildDataAPI.currentName}** é um verdadeiro espaço *acolhedor e vibrante* para todos!\n🎉 Explore e compartilhe experiências únicas da comunidade, onde cada membro tem a chance de se conectar, aprender e crescer juntos. Aqui, você pode:\n- 🌐 Participar de conversas envolventes sobre temas variados.\n- 🎮 Encontrar parceiros para jogos e atividades divertidas.\n- 🎤 Compartilhar suas paixões, seja música, arte, tecnologia ou qualquer outro interesse.\n- 💬 Trocar ideias e conhecimentos com pessoas que pensam como você.\n\n**É o lugar perfeito para fazer novas amizades, descobrir hobbies e criar memórias incríveis.** 🌟\n\nEntão, não perca tempo! Junte-se ao ${guildDataAPI.currentName} e faça parte desse ambiente positivo e envolvente. Bem-vindo ao seu novo ponto de encontro favorito! 🎈\n\n ${bannerMarkdown} \n\n(Texto padronizado)`

            const converter = new showdown.Converter();
            const markdownText = (guildDataAPI.partnerships.message ? guildDataAPI.partnerships.message : defaultText).replace(/%mencao%/g, '')
            const imageLinkRegex = /https?:\/\/[^\s]+\.(?:png|jpg|jpeg|gif|webp)(\?.*)?/gi;
            const formattedMarkdownText = markdownText.replace(imageLinkRegex, (match) => {
              return `\n![${nameFormat}](${match})\n`;
            });
            const htmlText = converter.makeHtml(formattedMarkdownText);

            templateContent = templateContent
              .replace(/%inviteServer%/g, guildDataAPI.invite)
              .replace(/%bannerServer%/g, guildDataAPI.banner ? guildDataAPI.banner : `/footage/artworks/blackLotusDefault.jpg`)
              .replace(/%iconServer%/g, guildDataAPI.icon)
              .replace(/%nameServer%/g, guildDataAPI.currentName)
              .replace(/%membersServer%/g, formatNumber(guildDataAPI.members))
              .replace(/%descriptionServer%/g, guildDataAPI.description ? guildDataAPI.description : `No Server Description`)
              .replace(/%dateJoinAt%/g, convertTimestamp(guildDataAPI.joinedAt))
              .replace(/%constellationServer%/g, "Black Syndicate")
              .replace(/%partnershipText%/g, htmlText)
              .replace(/%constellationBadge%/g, badgePath)
              .replace(/%isNewServerBadge%/g, newBadge)
              .replace(/%isVerifiedBadge%/g, verifiedBadge)
              .replace(/%isPartnerBadge%/g, partnerBadge)
              .replace(/%isHighlightedBadge%/g, highlightedBadge)

            return templateContent;
          }

          this.client.consoleManager.log(`[API 2] | [Update Module] The guild ${guildDataAPI.id} has been successfully updated on the database`, 0);
        }
      }
      this.client.consoleManager.log('[API 2] | [Update Module] Stopping the verification process', 7)
    } catch (e) {
      this.client.errorManager.errorReport(this.client.configManager.get("lang").lang.unexpected_function_error.replace(/%function%/g, "dbUpdate"), e);
    }
  }

  async downloadImage(url, filePath, type, guildId) {
    if (!url) return null;

    try {
      const urlObj = new URL(url);
      const extension = path.extname(urlObj.pathname).split('?')[0];

      const response = await axios.get(url, { responseType: 'arraybuffer' });
      const buffer = Buffer.from(response.data, 'binary');

      const fullFilePath = `${filePath}${extension}`;
      fs.writeFile(fullFilePath, buffer, () => { });

      return fullFilePath;
    } catch (f) {
      this.client.consoleManager.log(`[API 1] | [Create Module] An error has occurred while trying to download ${type} from the guild ${guildId}: ${f}`, 5);
      return null;
    }
  }
};

