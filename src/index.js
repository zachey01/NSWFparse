const { fetchRule34Posts } = require("./handlers/r34handler");
const { fetchRedditPost } = require("./handlers/reddithandler");

const handlers = {
  rule34: fetchRule34Posts,
  redditCustom: fetchRedditPost,
};

module.exports = handlers;
