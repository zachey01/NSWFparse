async function fetchString(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    return await response.text();
  } catch (error) {
    throw new Error(`Fetch error: ${error.message}`);
  }
}

async function rule34(options) {
  if (!options || Object.keys(options).length === 0) {
    throw new Error("No options provided");
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
    console.warn(
      "100 is the limit, using values larger than this makes no sense"
    );
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
