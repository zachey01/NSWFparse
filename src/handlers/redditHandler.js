const fetch = require("node-fetch");

/**
 * @arg {String} source - Each subreddit requires different methods to pull images, this tells me which one to run
 * @arg {String} subreddit - Where to send a request to
 */
function request(subreddit) {
  subreddit = subreddit[Math.floor(Math.random() * subreddit.length)];
  return new Promise(function (resolve, reject) {
    if (!subreddit) {
      return reject({
        reason: "No subreddit supplied",
        message: "Couldn't do request because there wasn't a subreddit",
      });
    }

    let date = Date.now();
    function ExtractRedditUrl(body, tries) {
      if (tries >= 10) {
        return reject({
          reason: "retry limit exceeded",
          message: "Failed to find a suitable post",
          subbredit: subreddit,
        });
      }

      tries++;

      let post = body[Math.floor(Math.random() * body.length)].data;

      if (/(.jpg|.png|.gif|.jpeg)$/gi.test(post.url)) {
        let payload = {
          url: post.url,
          source: post.permalink,
          nsfw: true,
          tries: tries,
          time: ((Date.now() - date) / 1000).toFixed(2),
        };
        resolve(payload);
      } else {
        switch (post.is_video) {
          case true:
            ExtractRedditUrl(body, tries);
            break;
          default:
            switch (post.media) {
              case null:
                ExtractRedditUrl(body, tries);
                break;
              default:
                if (!post.media.oembed.thumbnail_url.includes("gfycat")) {
                  let payload = {
                    url: post.media.oembed.thumbnail_url,
                    source: post.permalink,
                    nsfw: true,
                    tries: tries,
                    time: ((Date.now() - date) / 1000).toFixed(2),
                  };
                  resolve(payload);
                } else {
                  ExtractRedditUrl(body, tries);
                }
            }
        }
      }
    }

    let sortBy = ["best", "new", "top", "hot"],
      filter = sortBy[Math.floor(Math.random() * sortBy.length)];

    let url = `https://reddit.com/r/${subreddit}/${filter}.json?limit=10`;

    fetch(url)
      .then(async (response) => {
        try {
          let body = await response.json();
          if (response.status !== 200) {
            return reject(body);
          }
          ExtractRedditUrl(body.data.children, 0);
        } catch (error) {
          reject(error);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}

module.exports.makeRequest = request;
