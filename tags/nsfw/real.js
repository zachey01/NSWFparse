const requestHandler = require("../handler");
class RealShit {
  femboy() {
    let subreddits = [
      "FemboyHookup",
      "FemBoys",
      "traps",
      "men_in_panties",
      "trapgifs",
    ];
    return requestHandler.makeRequest(
      "reddit",
      subreddits[Math.floor(Math.random() * subreddits.length)]
    );
  }
  manToys() {
    let subreddits = ["MenWithToys"];
    return requestHandler.makeRequest(
      "reddit",
      subreddits[Math.floor(Math.random() * subreddits.length)]
    );
  }
  dickPic() {
    let subreddits = ["GaybrosGoneWild"];
    return requestHandler.makeRequest(
      "reddit",
      subreddits[Math.floor(Math.random() * subreddits.length)]
    );
  }
  gayTwinks() {
    let subreddits = ["twinks", "TwinkLove", "CuteGuyButts"];
    return requestHandler.makeRequest(
      "reddit",
      subreddits[Math.floor(Math.random() * subreddits.length)]
    );
  }
  cumShot() {
    let subreddits = ["gaycumsluts"];
    return requestHandler.makeRequest(
      "reddit",
      subreddits[Math.floor(Math.random() * subreddits.length)]
    );
  }

  gayAss() {
    let subreddits = ["manass"];
    return requestHandler.makeRequest(
      "reddit",
      subreddits[Math.floor(Math.random() * subreddits.length)]
    );
  }

  gayPorn() {
    let subreddits = ["ManSex"];
    return requestHandler.makeRequest(
      "reddit",
      subreddits[Math.floor(Math.random() * subreddits.length)]
    );
  }

  shemale() {
    let subreddits = [
      "Tgirls",
      "Shemales",
      "Tgifs",
      "shemale_gifs",
      "ShemalesParadise",
      "tflop",
      "POVTranny",
    ];
    return requestHandler.makeRequest(
      "reddit",
      subreddits[Math.floor(Math.random() * subreddits.length)]
    );
  }

  pov() {
    let subreddits = ["POV", "POVjiggle", "POVTranny"];
    return requestHandler.makeRequest(
      "reddit",
      subreddits[Math.floor(Math.random() * subreddits.length)]
    );
  }

  girlThighs() {
    let subreddits = [
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
    ];
    return requestHandler.makeRequest(
      "reddit",
      subreddits[Math.floor(Math.random() * subreddits.length)]
    );
  }

  panties() {
    let subreddits = [
      "panties",
      "FullBackPanties",
      "AssholeBehindThong",
      "assinthong",
      "PantiesToTheSide",
      "thongs",
      "UnderwearGW",
    ];
    return requestHandler.makeRequest(
      "reddit",
      subreddits[Math.floor(Math.random() * subreddits.length)]
    );
  }

  girlAss() {
    let subreddits = [
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
    ];
    return requestHandler.makeRequest(
      "reddit",
      subreddits[Math.floor(Math.random() * subreddits.length)]
    );
  }

  sissy() {
    let subreddits = ["Sissyperfection", "sissycaptions", "sissyhypno"];
    return requestHandler.makeRequest(
      "reddit",
      subreddits[Math.floor(Math.random() * subreddits.length)]
    );
  }

  bisexy() {
    let subreddits = ["Bisexy", "heteroflexible"];
    return requestHandler.makeRequest(
      "reddit",
      subreddits[Math.floor(Math.random() * subreddits.length)]
    );
  }

  lesbian() {
    let subreddits = ["lesbians", "StraightGirlsPlaying", "mmgirls", "dyke"];
    return requestHandler.makeRequest(
      "reddit",
      subreddits[Math.floor(Math.random() * subreddits.length)]
    );
  }

  bdsm() {
    let subreddits = ["bdsm", "SheLikesItRough", "Spanking", "BDSMerotica"];
    return requestHandler.makeRequest(
      "reddit",
      subreddits[Math.floor(Math.random() * subreddits.length)]
    );
  }
}

module.exports = new RealShit();
