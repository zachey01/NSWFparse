const { makeRequest } = require("../handlers/redditHandler");

function femboy() {
  return makeRequest([
    "FemboyHookup",
    "FemBoys",
    "traps",
    "SissyBoy4Femboy",
    "sissyboysissygasm",
    "FemboyGalleries",
    "FemboySissyParadise",
    "Sissies",
    "sissypersonals",
    "Femboy_Creampie",
    "teenfemboy",
    "boypussy",
    "FemboyFucksGirl",
    "Femboys4real",
    "femboysbussy",
    "femboysissyroommate",
    "SissysPOV",
    "FemboyNSFWhere",
  ])
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
}

function manToys() {
  return makeRequest(["MenWithToys"])
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
}

function dickPic() {
  return makeRequest(["GaybrosGoneWild"])
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
}

function gayTwinks() {
  return makeRequest(["twinks", "TwinkLove", "CuteGuyButts"])
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
}

function gayCumshot() {
  return makeRequest(["gaycumsluts"])
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
}

function gayAss() {
  return makeRequest(["manass"])
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
}

function gayPorn() {
  return makeRequest([
    "ManSex",
    "GayGifs",
    "BarebackGayPorn",
    "GayCocksuckers",
    "GayFreeUse",
    "GayGroupSex",
  ])
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
}

function shemale() {
  return makeRequest([
    "Tgirls",
    "Shemales",
    "Tgifs",
    "shemale_gifs",
    "ShemalesParadise",
    "tflop",
    "POVTranny",
  ])
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
}

function pov() {
  return makeRequest(["POVTranny"])
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
}

function girlThighs() {
  return makeRequest([
    "girlsinyogapants",
    "Thighs",
    "thighhighs",
    "ThickThighs",
    "UnderwearGW",
    "datgap",
    "leggingsgonewild",
    "pawg",
    "hipcleavage",
    "legs",
    "pantyhose",
  ])
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
}

function panties() {
  return makeRequest([
    "panties",
    "FullBackPanties",
    "AssholeBehindThong",
    "assinthong",
    "PantiesToTheSide",
    "thongs",
    "UnderwearGW",
  ])
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
}

function girlAss() {
  return makeRequest([
    "ass",
    "paag",
    "asstastic",
    "buttplug",
    "whooties",
    "AssholeBehindThong",
    "Frogbutt",
    "rearpussy",
    "CuteLittleButts",
    "HungryButts",
    "reversecowgirl",
    "facedownassup",
    "butt",
    "butts",
    "pawg",
    "bigasses",
    "cosplaybutts",
    "girlsinyogapants",
    "BubbleButts",
    "assinthong",
    "smalltitsbigass",
    "CelebrityButts",
    "booty",
  ])
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
}

function sissy() {
  return makeRequest(["Sissyperfection", "sissycaptions", "sissyhypno"])
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
}

function bisexy() {
  return makeRequest(["Bisexy", "heteroflexible"])
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
}

function lesbian() {
  return makeRequest(["lesbians", "StraightGirlsPlaying", "mmgirls", "dyke"])
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
}

function bdsm() {
  return makeRequest(["bdsm", "SheLikesItRough", "Spanking", "BDSMerotica"])
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
}

function cumShot() {
  return makeRequest(["cumsluts", "cumshots", "CumshotSelfies"])
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
}

module.exports = {
  cumShot,
  girlThighs,
  bdsm,
  lesbian,
  bisexy,
  sissy,
  girlAss,
  panties,
  pov,
  shemale,
  gayPorn,
  gayAss,
  gayCumshot,
  gayTwinks,
  dickPic,
  manToys,
  femboy,
};
