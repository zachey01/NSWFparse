const handlers = require("../src/index");
const options = {
  tags: ["toys", "forest"],
  numPage: 1,
  limit: 1, // limit per request, maximum 100
  remove_empty: true,
  parse_tags: true, // whether to use tags
  random: false, // get random post
};
handlers
  .rule34(options)
  .then((payload) => {
    console.log(payload);
  })
  .catch((error) => {
    console.error(error);
  });
