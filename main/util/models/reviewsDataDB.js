const {
  Schema: d,
  model: e
} = require("mongoose");
const f = d({
  ownerID: String,
  ownerNick: String,
  serverID: String,
  ServerName: String,
  invite: String,
  review: String,
  approved: Boolean,
});
module.exports = e("reviewsDataDB", f);

