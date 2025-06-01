module.exports = function I(d, e) {
  const f = /^[0-9]+$/.test(d);
  const g = /^[0-9]+$/.test(e);
  if (f && g) {
    d = +d;
    e = +e;
  }
  return d === e ? true : f && !g ? true : g && !f ? false : !!(d < e);
};