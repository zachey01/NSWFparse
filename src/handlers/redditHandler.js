async function fetchRedditPost(subreddits) {
  const subredditArray = Array.isArray(subreddits) ? subreddits : [subreddits];

  const subreddit =
    subredditArray[Math.floor(Math.random() * subredditArray.length)];

  if (!subreddit) {
    throw new Error("No subreddit provided");
  }

  const startTime = Date.now();

  async function extractRedditUrl(posts, attempts) {
    if (attempts >= 10) {
      throw new Error(
        `Retry limit exceeded: Failed to find a suitable post in subreddit ${subreddit}`
      );
    }

    const post = posts[Math.floor(Math.random() * posts.length)].data;

    if (/\.(jpg|png|gif|jpeg)$/i.test(post.url)) {
      return {
        url: post.url,
        source: `https://reddit.com${post.permalink}`,
        nsfw: post.over_18,
        attempts,
        time: ((Date.now() - startTime) / 1000).toFixed(2),
      };
    }

    if (post.is_video || post.media === null) {
      return extractRedditUrl(posts, attempts + 1);
    }

    if (
      post.media?.oembed?.thumbnail_url &&
      !post.media.oembed.thumbnail_url.includes("gfycat")
    ) {
      return {
        url: post.media.oembed.thumbnail_url,
        source: `https://reddit.com${post.permalink}`,
        nsfw: post.over_18,
        attempts,
        time: ((Date.now() - startTime) / 1000).toFixed(2),
      };
    }

    return extractRedditUrl(posts, attempts + 1);
  }

  const sortOptions = ["best", "new", "top", "hot"];
  const sortBy = sortOptions[Math.floor(Math.random() * sortOptions.length)];

  const apiUrl = `https://old.reddit.com/r/${subreddit}/${sortBy}.json?limit=10`;

  try {
    const response = await fetch(apiUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 YaBrowser/24.4.0.0 Safari/537.36",
      },
    });

    const data = await response.json();
    if (!response.ok)
      throw new Error(`Network response was not ok: ${response.statusText}`);

    return await extractRedditUrl(data.data.children, 0);
  } catch (error) {
    throw new Error(`Fetch error: ${error.message}`);
  }
}

module.exports = { fetchRedditPost };
