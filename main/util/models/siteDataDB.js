const {
  Schema: d,
  model: e
} = require("mongoose");
const f = d({
  count: Number,
  realCount: Number,
});
module.exports = e("siteDataDB", f);

