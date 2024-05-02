(async () => {
  const r34Handler = require("../src/r34Handler");

  const client = new r34Handler.Client();

  const options = {
    tags: ["yaoi", "futa"],
    numPage: 1,
    limit: 1, // limit per request, maximum 100
    remove_empty: true,
    parse_tags: true, // whether to use tags
    random: false, // get random post
  };

  client
    .rule34(options)
    .then((result) => {
      console.log(result.posts);
    })
    .catch((error) => {
      console.error(error);
    });
})();
