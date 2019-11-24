const { getDocument, replaceAll, getText } = require("./src");
const serializer = require("./src/serializer");

String.prototype.replaceAll = replaceAll;

(async () => {
  let link =
    "https://www.walmart.com/ip/1080-Black-350-Full-80-000-000-1-Monitor-T-AOC-DisplayPort-W-G2460PF-Million-22-70-24-USB-ms-LED-Speakers-LCD-1-1920-VGA-16-9-Colors-DVI-x-Nit-16-7-H/181672489?irgwc=1&sourceid=imp_T1g2oC0ITxyOWKYwUx0Mo3ERUkn1-XzNUS452c0&veh=aff&wmlspartner=imp_120157&clickid=T1g2oC0ITxyOWKYwUx0Mo3ERUkn1-XzNUS452c0";
  let $ = await getDocument(link);
  let response = {};
  response["name"] = $("h1").text();
  response["features"] = {};
  $("tr").each(function() {
    if ($(this).children("td").length % 2 !== 0) return;
    for (let i = 1; i < $(this).children("td").length; i += 2) {
      let key = $(this).children(`td:nth-child(${i})`);
      let value = $(this).children(`td:nth-child(${i + 1})`);
      response["features"][getText(key)] = getText(value);
    }
  });

  let serializedContent = await serializer($);

  console.log(serializedContent);
})();
