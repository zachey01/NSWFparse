const index = require("./index");
const nswfApi = new index.Client();
// getting real images
DabiClient.nsfw.real
  .cumShot()
  .then((json) => {
    console.log(json);
    // outputs data with image url, possible source and other stuff
  })
  .catch((error) => {
    console.log(error);
    // outputs error
  });
