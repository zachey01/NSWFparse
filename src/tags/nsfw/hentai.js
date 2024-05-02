const requestHandler = require("../redditHandler");
class RealShit {
  femboy() {
    let subreddits = [
      "FemboyHentai",
      "FemboysAndHentai",
      "FemboyFutaCoalition",
      "traphentai",
    ];
    return requestHandler.makeRequest(
      "reddit",
      subreddits[Math.floor(Math.random() * subreddits.length)]
    );
  }

  yaoi() {
    let subreddits = ["yaoi", "YaoiNSFW", "yaoigif"];
    return requestHandler.makeRequest(
      "reddit",
      subreddits[Math.floor(Math.random() * subreddits.length)]
    );
  }

  hentai() {
    let subreddits = [""];
    return requestHandler.makeRequest(
      "reddit",
      subreddits[Math.floor(Math.random() * subreddits.length)]
    );
  }
}
module.exports = new RealShit();
