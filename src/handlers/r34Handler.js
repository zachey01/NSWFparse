const { parse } = require("fast-xml-parser");
const bent = require("bent");

const parseroptions = {
  attributeNamePrefix: "",
  textNodeName: "#text",
  ignoreAttributes: false,
  ignoreNameSpace: false,
  allowBooleanAttributes: false,
  parseNodeValue: true,
  parseAttributeValue: true,
  trimValues: false,
  cdataTagName: "__cdata",
  cdataPositionChar: "\\c",
  parseTrueNumberOnly: false,
  arrayMode: false,
  stopNodes: ["parse-me-as-string"],
};

const fetchString = bent("string");

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
  )}&pid=${numPage}&limit=${limit}`;

  const obj = await fetchString(url);
  const json = parse(obj, parseroptions, true);

  if (json.posts && json.posts.post && options.parse_tags) {
    if (options.remove_empty) {
      for (let postI = 0; postI < json.posts.post.length; postI++) {
        let cpost = json.posts.post[postI];
        cpost.tags_parsed = cpost.tags.split(" ").filter((val) => {
          return val != "";
        });
      }
    } else {
      for (let postI = 0; postI < json.posts.post.length; postI++) {
        let cpost = json.posts.post[postI];
        cpost.tags_parsed = cpost.tags.split(" ");
      }
    }
  }

  return {
    posts: json.posts ? json.posts.post : [],
  };
}

module.exports = { rule34 };
