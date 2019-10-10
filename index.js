const path = require("path");
const fs = require("fs");
const md = require("md-directory");

let dirName = process.argv[2];
let outputName = dirName + '.html';

/**
 * 目录是否存在
 * @param {String} path 文件夹路径
 */
function fsExistsSync(path) {
  try {
    fs.accessSync(path, fs.F_OK);
    console.log('can read/write');
  } catch (e) {
    return false;
  }
  return true;
}

let contents = md.parseDirSync(path.join(__dirname, dirName));
let html = fs.readFileSync(path.join(__dirname, "./index.html"), "utf-8");

if (fsExistsSync(path.join(__dirname, `${dirName}`))) {
  fs.mkdirSync(path.join(__dirname, `${outputName}`));
} else {
  console.log('文件夹不存在');
}

Object.keys(contents).forEach(key => {
  let filename = key.replace(/\.md$/, ".html");
  let content = html.replace("${{ title }}", filename);
  content = content.replace("${{ article }}",contents[key].content);
  fs.writeFileSync(path.join(__dirname, `${outputName}/${filename}`), content);
});