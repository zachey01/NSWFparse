const { fetchRule34Posts } = require("./handlers/r34handler");
const { fetchRedditPost } = require("./handlers/reddithandler");

const furryTag = require("./tags/furry");
const hentaiTag = require("./tags/hentai");
const realTag = require("./tags/real");

const handlers = {
  rule34: fetchRule34Posts,
  reddit: {
    furry: furryTag,
    hentai: hentaiTag,
    real: realTag,
  },
  redditCustom: fetchRedditPost,
};

module.exports = handlers;
