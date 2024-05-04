const { rule34 } = require("./handlers/r34Handler");
const { makeRequest } = require("./handlers/redditHandler");

const furryTag = require("./tags/furry"),
  hentaiTag = require("./tags/hentai"),
  realTag = require("./tags/real");

const handlers = {
  r34: rule34,
  reddit: { furry: furryTag, hentai: hentaiTag, real: realTag },
  redditCustom: makeRequest,
};

module.exports = handlers;
