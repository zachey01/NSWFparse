const fetch = require("node-fetch");
/**
 * @arg {String} source Each site requires different methods to pull images, this tells me which one to run
 * @arg {String} site Where to send a request to
 */
function request(source, site, regex) {
  return new Promise(function (resolve, reject) {
    let date = Date.now();
    switch (source) {
      case "reddit":
        if (!site)
          reject({
            reason: "No subreddit supplied",
            message: "Couldn't do request because there wasn't a subreddit",
          });
        function ExtractRedditUrl(body, tries) {
          if (tries >= 10)
            return reject({
              reason: "retry limit exceeded",
              message: "Failed to find a suitable post",
              subbredit: site,
            });
          tries++;
          // grabs a random post
          let post = body[Math.floor(Math.random() * body.length)].data;
          // checks if the post url ends with an image extension
          switch (/(\.jpg|\.png|\.gif|\.jpeg)$/gi.test(post.url)) {
            case true:
              // resolves the payload with all the juicy data
              let payload = {
                url: post.url,
                source: post.permalink,
                nsfw: true,
                tries: tries,
                time: `${((Date.now() - date) / 1000).toFixed(2)}s`,
              };
              resolve(payload);
              break;
            default:
              // self explanatory (hopefully)
              switch (post.is_video) {
                case true:
                  // tries to get another post if it's a video (this was used for discord and we can't embed videos)
                  ExtractRedditUrl(body, tries);
                  break;
                default:
                  switch (post.media) {
                    case null:
                      // if media is null try again
                      ExtractRedditUrl(body, tries);
                      break;
                    default:
                      // if the media thumbnail is from gfycat try again (thumbnails from gfycat are really low res)
                      switch (
                        post.media.oembed.thumbnail_url.includes("gfycat")
                      ) {
                        case false:
                          // resolve payload
                          let payload = {
                            url: post.media.oembed.thumbnail_url,
                            source: post.permalink,
                            nsfw: true,
                            tries: tries,
                            time: `${((Date.now() - date) / 1000).toFixed(2)}s`,
                          };
                          resolve(payload);
                          break;
                        // tries again
                        default:
                          ExtractRedditUrl(body, tries);
                      }
                      break;
                  }
                  break;
              }
              break;
          }
        }
        // just some randomness
        let sortBy = ["best", "new", "top", "hot"],
          filter = sortBy[Math.floor(Math.random() * sortBy.length)];
        let url = `https://reddit.com/r/${site}/${filter}.json?limit=15`;
        fetch(url)
          .then(async (response) => {
            try {
              // gets the json response
              let body = await response.json();
              // checks if the request responded with a 200 status code
              if (response.status !== 200) reject(body);
              ExtractRedditUrl(body.data.children, 0);
            } catch (error) {
              reject(error);
            }
          })
          .catch((error) => {
            // if the request fails reject
            reject(error);
          });
        break;
      case "danbooru":
        if (!site)
          reject({
            reason: "No url supplied",
            message: "Couldn't do request because there wasn't a url",
          });
        function ExtractDanbooruUrl(body) {
          let posts = null;
          try {
            // attempts to match wif regex
            (posts = body.match(/data-file-url=".*?"/gm)), (cleaned = []);
          } catch (error) {
            // rejects like my crush
            reject({
              reason: "failed to match posts",
              message: "Wasn't able to correctly match posts",
            });
          }
          // if the post matching doesn't error but returns 0 posts it'll reject
          if (posts.length < 1)
            reject({
              reason: "no posts",
              message: "Failed to find a suitable post",
            });
          for (let index in posts) {
            // cleans the url of the extra stuff
            let url = posts[index].replace(/data-file-url=|"/g, "");
            // checks if the url ends with image extensions (if it do it pushes it to an array)
            if (/(\.jpg|\.png|\.gif|\.jpeg)$/gi.test(url)) cleaned.push(url);
          }
          // checks if there's any post after the cleanage (if not it reject)
          if (cleaned.length < 1)
            reject({
              reason: "no posts",
              message: "Failed to find a suitable post",
            });
          // gets a random url from the array
          let url = cleaned[Math.floor(Math.random() * cleaned.length)];
          let payload = {
            url: url,
            source: null, // I might try something in the future to extract where it comes from
            nsfw: true,
            tries: 1,
            time: `${((Date.now() - date) / 1000).toFixed(2)}s`,
          };
          // resolves the load ÒwÓ
          resolve(payload);
        }
        fetch(site)
          .then(async (response) => {
            try {
              // attempts to get the response text (html n stuff)
              let body = await response.text();
              // checks if the response status is ze 200 (OK)
              if (response.status !== 200) reject(response);
              // magic...
              ExtractDanbooruUrl(body);
            } catch (error) {
              // if it fails to get the text reject the error
              reject(error);
            }
          })
          .catch((error) => {
            // if the request fails reject
            reject(error);
          });
        break;
      case "gelbooru":
        if (!site)
          reject({
            reason: "No url supplied",
            message: "Couldn't do request because there wasn't a url",
          });
        function ExtractGelbooruUrl(body, tries) {
          if (tries >= 5)
            return reject({
              reason: "retry limit exceeded",
              message: "Failed to find a suitable post",
            });
          tries++;
          // gets post urls from the contents
          let rawUrls = body.match(/<a id=".*?" href=".*?" >/gm),
            urls = [];
          rawUrls.filter((rawUrl) => {
            // "cleans" it
            let postId = rawUrl.replace(/<a id="p|" href=".*?" >/g, "");
            urls.push(postId);
          });
          // gets a random cleaned url
          let postUrl = `https://gelbooru.com/index.php?page=post&s=view&id=${
            urls[Math.floor(Math.random() * urls.length)]
          }`;
          // I have to fetch the url again because the raw website contents only return a small thumbnail of the actual image file
          // (unlike danbooru which returns the file url)
          // this shouldn't really affect the speed *too* much
          fetch(postUrl)
            .then(async (response) => {
              // checks response status
              if (response.status !== 200) reject(response);
              // gets the contents of the post
              let contents = await response.text();
              // gets an image
              let post = contents.match(
                /<meta property="og:image" content=".*?" \/>/gm
              );
              // checks if it found one
              if (!post.length > 0) return ExtractGelbooruUrl(body, tries);
              // cleans the post
              let url = post[0].replace(
                /<meta property="og:image" content="|" \/>/g,
                ""
              );
              // tests the url
              switch (
                /^https:\/\/img2.*?(\.jpg|\.jpeg|\.png|\.gif)$/g.test(url)
              ) {
                case true:
                  let payload = {
                    url: url,
                    source: postUrl,
                    nsfw: true,
                    tries: tries,
                    time: `${((Date.now() - date) / 1000).toFixed(2)}s`,
                  };
                  // resolves the load ÒwÓ
                  resolve(payload);
                  break;
                default:
                  ExtractGelbooruUrl(body, tries);
                  break;
              }
            })
            .catch((error) => {
              reject(error);
            });
        }
        fetch(site)
          .then(async (response) => {
            try {
              // attempts to get the response text (html n stuff)
              let body = await response.text();
              // checks if the response status is ze 200 (OK)
              if (response.status !== 200) reject(response);
              // magic...
              ExtractGelbooruUrl(body, 0);
            } catch (error) {
              // if it fails to get the text reject the error
              reject(error);
            }
          })
          .catch((error) => {
            // if the request fails reject
            reject(error);
          });
        break;
      case "other":
        if (!site)
          reject({
            reason: "No url supplied",
            message: "Couldn't do request because there wasn't a url",
          });
        if (!regex)
          reject({
            reason: "No regex supplied",
            message:
              "Couldn't do request because there wasn't a regular expression supplied",
          });
        function DoStuffWithThings(html, regex) {
          let matches = null;
          try {
            // tries to match
            matches = html.match(regex);
          } catch (error) {
            reject(error);
          }
          if (matches === null)
            reject({
              reason: "Matches were null",
              message: "Couldn't find anything with the supplied regex :/",
            });
          // returns matches
          resolve(matches);
        }
        fetch(site)
          .then(async (response) => {
            try {
              // attempts to get the response text (html n stuff)
              let body = await response.text();
              // checks if the response status is ze 200 (OK)
              if (response.status !== 200) reject(response);
              // magic...
              DoStuffWithThings(body, regex);
            } catch (error) {
              // if it fails to get the text reject the error
              reject(error);
            }
          })
          .catch((error) => {
            // if the request fails reject
            reject(error);
          });
        break;
      default:
        // if the source isn't supported (like reddit) it'll reject with an error
        reject(new Error(`Unknown source '${source}'`));
        break;
    }
  });
}
module.exports.makeRequest = request;
