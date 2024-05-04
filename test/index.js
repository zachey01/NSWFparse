const handlers = require("../src/index");

handlers
  .redditCustom(["cats"])
  .then((payload) => {
    console.log(payload);
  })
  .catch((error) => {
    console.error(error);
  });
