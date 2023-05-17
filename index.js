const real = require("./tags/nsfw/real"),
  hentai = require("./tags/nsfw/hentai"),
  furry = require("./tags/nsfw/furry"),
  other = require("./tags/other");
class DapiClientNSFW {
  constructor() {
    this.real = real;
    this.hentai = hentai;
    this.furry = furry;
    this.other = other;
  }
}
class DapiClient {
  constructor() {
    this.nsfw = new DapiClientNSFW();
  }
}
module.exports = { Client: DapiClient };
