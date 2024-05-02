const requestHandler = require("./redditHandler");
class Other {
  wallpaper() {
    let subreddits = ["NSFW_Wallpapers"];
    return requestHandler.makeRequest(
      "reddit",
      subreddits[Math.floor(Math.random() * subreddits.length)]
    );
  }
}
module.exports = new Other();
