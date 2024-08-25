async function fetchRule34Posts(options = {}) {
  if (!options.tags) options.tags = ["all"];
  if (typeof options.parseTags !== "boolean") options.parseTags = true;
  if (typeof options.removeEmpty !== "boolean") options.removeEmpty = true;
  options.limit = Math.min(options.limit || 100, 100);

  const pageNum = options.random
    ? Math.floor(Math.random() * 11)
    : options.pageNum || 0;
  const limit = options.limit;

  const apiUrl = `https://api.rule34.xxx/index.php?page=dapi&s=post&q=index&tags=${options.tags.join(
    "+"
  )}&pid=${pageNum}&limit=${limit}&json=1`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok)
      throw new Error(`Network response was not ok: ${response.statusText}`);

    const responseText = await response.text();
    const jsonResponse = JSON.parse(responseText);

    return { posts: jsonResponse || [] };
  } catch (error) {
    throw new Error(`Fetch error: ${error.message}`);
  }
}

module.exports = { fetchRule34Posts };
