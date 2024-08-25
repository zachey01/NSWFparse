async function request(subreddit) {
  subreddit = subreddit[Math.floor(Math.random() * subreddit.length)];

  if (!subreddit) {
    throw {
      reason: "No subreddit supplied",
      message: "Couldn't do request because there wasn't a subreddit",
    };
  }

  let date = Date.now();

  async function ExtractRedditUrl(body, tries) {
    if (tries >= 10) {
      throw {
        reason: "retry limit exceeded",
        message: "Failed to find a suitable post",
        subreddit: subreddit,
      };
    }

    tries++;

    let post = body[Math.floor(Math.random() * body.length)].data;

    if (/(.jpg|.png|.gif|.jpeg)$/gi.test(post.url)) {
      return {
        url: post.url,
        source: `https://reddit.com${post.permalink}`,
        nsfw: post.over_18,
        tries: tries,
        time: ((Date.now() - date) / 1000).toFixed(2),
      };
    } else {
      if (post.is_video || post.media === null) {
        return ExtractRedditUrl(body, tries);
      } else if (
        post.media.oembed &&
        !post.media.oembed.thumbnail_url.includes("gfycat")
      ) {
        return {
          url: post.media.oembed.thumbnail_url,
          source: `https://reddit.com${post.permalink}`,
          nsfw: post.over_18,
          tries: tries,
          time: ((Date.now() - date) / 1000).toFixed(2),
        };
      } else {
        return ExtractRedditUrl(body, tries);
      }
    }
  }

  let sortBy = ["best", "new", "top", "hot"];
  let filter = sortBy[Math.floor(Math.random() * sortBy.length)];

  let url = `https://old.reddit.com/r/${subreddit}/${filter}.json?limit=10`;

  try {
    let response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 YaBrowser/24.4.0.0 Safari/537.36",
      },
    });

    let data = await response.json();

    if (!response.ok) {
      throw data;
    }

    return await ExtractRedditUrl(data.data.children, 0);
  } catch (error) {
    throw error;
  }
}

module.exports.makeRequest = request;
