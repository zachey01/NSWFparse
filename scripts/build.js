const { exec } = require("child_process");
const fs = require("fs");
const uglifyjs = require("uglify-js");

exec("npx browserify test/example -o ./dist/nswfparse.js", (error) => {
  if (error) {
    console.error(`Error: ${error}`);
    return;
  }

  fs.readFile("./dist/nswfparse.js", "utf8", (err, data) => {
    if (err) {
      console.error("Error:", err);
      return;
    }

    let updatedData = data.replace(
      /handlers\.reddit\.hentai\.yaoi\(\)\.then\(\(payload\) => {console\.log\(payload\);\}\)\.catch\(\(error\) => {console\.error\(error\);\}\);/,
      "window.nswfparse = handlers"
    );

    updatedData = data.replace(
      /https:\/\/reddit\.com\//g,
      "https://api.reddit.com/"
    );
    const result = uglifyjs.minify(updatedData);
    fs.writeFileSync("./dist/nswfparse.min.js", result.code);

    fs.writeFile("./dist/nswfparse.js", updatedData, "utf8", (err) => {
      if (err) {
        console.error("Error:", err);
        return;
      }
    });
  });
});
