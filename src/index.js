const http = require("request-promise");
const jsdom = require("jsdom");
const jQuery = require("jquery");

const getDocument = async url => {
  let content = await http({
    uri: url,
    headers: {
      accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3",
      "accept-language": "en-US,en;q=0.9"
    },
    method: "GET"
  });
  const { JSDOM } = jsdom;
  const { window } = new JSDOM(content);
  let $ = jQuery(window);
  return $;
};

module.exports = { getDocument, replaceAll, getText };
