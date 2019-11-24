module.exports.delete_elements =
  "svg, script, link, style, noscript, webengagedata";

module.exports.sanitizeString = str => {
  str = str.replace(/\r?\n|\r/g, "");
  return str.trim();
};

module.exports.strip_html = str => {
  return module.exports.sanitizeString(str.replace(/<\/?[^>]+(>|$)/g, ""));
};

module.exports.replaceAll = function(search, replacement) {
  var target = this;
  return target.replace(new RegExp(search, "g"), replacement);
};

module.exports.getText = $ => {
  return $.text().trim();
};
