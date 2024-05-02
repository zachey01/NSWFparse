const real = require("./tags/nsfw/real"),
  hentai = require("./tags/nsfw/hentai"),
  furry = require("./tags/nsfw/furry"),
  other = require("./tags/other");

class NSWFparse {
  constructor() {
    this.real = real;
    this.hentai = hentai;
    this.furry = furry;
    this.other = other;
  }
}

class NSWFparseClient {
  constructor() {
    this.nsfw = new NSWFparse();
  }
}

module.exports = { Client: NSWFparseClient };
