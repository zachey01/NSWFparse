const handlers = require("../src/index");

handlers.reddit.hentai.yaoi().then((payload) => {console.log(payload);}).catch((error) => {console.error(error);});
