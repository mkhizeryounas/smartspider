const { delete_elements } = require("./common");

module.exports = async function($) {
  $.fn.extend({
    getPath: function() {
      var path,
        node = this;
      while (node.length) {
        var realNode = node[0],
          name = realNode.localName;
        if (!name) break;
        name = name.toLowerCase();

        var parent = node.parent();

        var sameTagSiblings = parent.children(name);
        if (sameTagSiblings.length > 1) {
          var allSiblings = parent.children();
          var index = allSiblings.index(realNode) + 1;
          if (index > 1) {
            name += ":nth-child(" + index + ")";
          }
        }

        path = name + (path ? ">" + path : "");
        node = parent;
      }

      return path;
    }
  });

  function crawlFullPage($, _str) {
    let dic = {},
      exp = [];
    $(delete_elements).each(function() {
      $(this).remove();
    });

    function extract(str) {
      $(str)
        .children()
        .each(function() {
          let _type = $(this)
              .prev()
              .prop("nodeName"),
            _path = $(this)
              .first()
              .getPath();
          if (!exp.includes(_path)) {
            exp.push(_path);
            if ($(this).children().length) return extract(_path);
            let _text = $(this).html();
            if (_text) dic[_path] = _text.trim();
          }
        });
    }

    extract(_str);
    return dic;
  }
  return crawlFullPage($, "body");
};
