const { makeRequest } = require("../handlers/redditHandler");

function femboy() {
  return makeRequest([
    "FemboyHentai",
    "FemboysAndHentai",
    "FemboyFutaCoalition",
    "traphentai",
  ])
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
}

function yaoi() {
  return makeRequest(["yaoi", "YaoiNSFW", "yaoigif"])
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
}

function hentai() {
  return makeRequest([
    "MasturbationHentai",
    "HentaiPetgirls",
    "HentaiCumsluts",
    "MonsterGirl",
    "netorare",
    "PublicHentai",
    "CumHentai",
    "saohentai",
    "HentaiHumiliation",
    "thick_hentai",
    "rule34",
    "HentaiBreeding",
    "Hentai__videos",
    "JerkOffToAnime",
    "FreeuseHentai",
    "HelplessHentai",
    "rape_hentai",
    "HentaiBeast",
    "hentai",
  ])
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
}

function futanari() {
  return makeRequest([
    "futanari",
    "futanari_Comics",
    "FutanariHentai",
    "FutaCum",
    "FutaTrap",
    "MonsterFuta",
  ])
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
}

module.exports = { femboy, hentai, yaoi, futanari };
