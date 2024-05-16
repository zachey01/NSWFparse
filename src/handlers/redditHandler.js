const https = require("https");

function request(subreddit) {
  return new Promise(function (resolve, reject) {
    subreddit = subreddit[Math.floor(Math.random() * subreddit.length)];

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
          subreddit: subreddit,
        });
      }

      tries++;

      let post = body[Math.floor(Math.random() * body.length)].data;

      if (/(.jpg|.png|.gif|.jpeg)$/gi.test(post.url)) {
        let payload = {
          url: post.url,
          source: `https://reddit.com${post.permalink}`,
          nsfw: post.over_18,
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
                if (
                  post.media.oembed &&
                  !post.media.oembed.thumbnail_url.includes("gfycat")
                ) {
                  let payload = {
                    url: post.media.oembed.thumbnail_url,
                    source: `https://reddit.com${post.permalink}`,
                    nsfw: post.over_18,
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

    let sortBy = ["best", "new", "top", "hot"];
    let filter = sortBy[Math.floor(Math.random() * sortBy.length)];

    let url = `https://old.reddit.com/r/${subreddit}/${filter}.json?limit=10`;

    https
      .get(
        url,
        {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 YaBrowser/24.4.0.0 Safari/537.36",
          },
        },
        (response) => {
          let data = "";

          response.on("data", (chunk) => {
            data += chunk;
          });

          response.on("end", () => {
            try {
              let body = JSON.parse(data);
              if (response.statusCode !== 200) {
                return reject(body);
              }
              ExtractRedditUrl(body.data.children, 0);
            } catch (error) {
              reject(error);
            }
          });
        }
      )
      .on("error", (error) => {
        reject(error);
      });
  });
}

module.exports.makeRequest = request;
