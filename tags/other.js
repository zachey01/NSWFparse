const requestHandler = require("./handler");
class RealShit {
  wallpaper() {
    let subreddits = ["NSFW_Wallpapers"];
    return requestHandler.makeRequest(
      "reddit",
      subreddits[Math.floor(Math.random() * subreddits.length)]
    );
  }

  humor() {
    let subreddits = ["NSFWFunny", "KnottyMemes"];
    return requestHandler.makeRequest(
      "reddit",
      subreddits[Math.floor(Math.random() * subreddits.length)]
    );
  }
}
module.exports = new RealShit();
