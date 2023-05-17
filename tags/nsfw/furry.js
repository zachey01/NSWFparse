const requestHandler = require("../handler");
class RealShit {
  yaoi() {
    let subreddits = ["gfur"];
    return requestHandler.makeRequest(
      "reddit",
      subreddits[Math.floor(Math.random() * subreddits.length)]
    );
  }

  hentai() {
    let subreddits = ["furryfemdom", "FurryPornSubreddit", "furryporn"];
    return requestHandler.makeRequest(
      "reddit",
      subreddits[Math.floor(Math.random() * subreddits.length)]
    );
  }

  real() {
    let subreddits = ["fursuitsex"];
    return requestHandler.makeRequest(
      "reddit",
      subreddits[Math.floor(Math.random() * subreddits.length)]
    );
  }

  catGirls() {
    let subreddits = ["cat_girls"];
    return requestHandler.makeRequest(
      "reddit",
      subreddits[Math.floor(Math.random() * subreddits.length)]
    );
  }
}
module.exports = new RealShit();
