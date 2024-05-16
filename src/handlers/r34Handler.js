const https = require("https");

async function fetchString(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        let data = "";
        res.on("data", (chunk) => {
          data += chunk;
        });
        res.on("end", () => {
          resolve(data);
        });
      })
      .on("error", (err) => {
        reject(err);
      });
  });
}

/**
+ * @param {Object} options - An object containing options for this rule.
+ * @param {string} options.tags - Tags to search for. Defaults to "all"
+ * @param {bool} options.parse_tags - If true, parses tags. Defaults to true.
+ * @param {bool} options.remove_empty - If true, removes empty tags. Defaults to true.
+ * @param {number} options.limit - The limit of posts to fetch. Defaults to 100.
+ * @param {bool} options.random - If true, fetch random page. Defaults to false.
+ * @param {number} options.numPage - The number of page to fetch. Defaults to 0.
+ *
+ * @returns {Promise} A promise containing an object with post data.
+ */
async function rule34(options) {
  if (!options || Object.keys(options).length === 0) {
    throw "nope";
  }

  options.tags = options.tags || ["all"];
  options.parse_tags = options.parse_tags || true;
  options.remove_empty = options.remove_empty || true;
  options.limit = options.limit || 100;

  let numPage, limit;
  if (options.random) {
    numPage = Math.floor(Math.random() * 11);
    limit = 1;
  } else {
    numPage = options.numPage || 0;
    limit = options.limit;
  }

  if (limit > 100) {
    console.warn("100 is limit, using everything larger makes no sense");
    limit = 100;
  }

  const url = `https://api.rule34.xxx/index.php?page=dapi&s=post&q=index&tags=${options.tags.join(
    "+"
  )}&pid=${numPage}&limit=${limit}&json=1`;

  const objString = await fetchString(url);
  const json = JSON.parse(objString);

  return {
    posts: json ? json : [],
  };
}

module.exports = { rule34 };
