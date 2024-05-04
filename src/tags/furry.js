const { makeRequest } = require("../handlers/redditHandler");

function yaoi() {
  return makeRequest(["gfur"])
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
}

function hentai() {
  return makeRequest([
    "furryfemdom",
    "FurryPornSubreddit",
    "furryporn",
    "cat_girls",
  ])
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
}

function real() {
  return makeRequest(["fursuitsex"])
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
}

module.exports = { yaoi, hentai, real };
