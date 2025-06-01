const {
  Schema: d,
  model: e
} = require("mongoose");
const f = d({
  cached: Boolean,
  currentName: String,
  id: String,
  constellation: String,
  joinedAt: Number,
  members: Number,
  text: String,
  icon: String,
  banner: String,
  description: String,
  invite: String,
  URIPath: String,
  iconPath: String,
  bannerPath: String,
  highlighted1: {
    value: Boolean,
    until: Number
  },
  highlighted2: Boolean,
  newServer: Boolean,
  verified: Boolean,
  partner: Boolean,
});
module.exports = e("guildsDataDB", f);

