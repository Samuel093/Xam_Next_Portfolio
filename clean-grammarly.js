// clean-grammarly.js

const fs = require("fs");
const path = require("path");

const walk = (dir, callback) => {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      // Skip node_modules and .next folders
      if (!["node_modules", ".next", ".git"].includes(file)) {
        walk(fullPath, callback);
      }
    } else if (/\.(js|jsx|ts|tsx|html)$/.test(file)) {
      callback(fullPath);
    }
  });
};

const cleanAttributes = (content) =>
  content
    .replace(/]*"\s*/g, "")
    .replace(/]*"\s*/g, "")
    .replace(/\s+data-gr-ext-installed(?=\s|>)/g, "");

walk("./", (filePath) => {
  const content = fs.readFileSync(filePath, "utf8");
  const cleaned = cleanAttributes(content);
  if (content !== cleaned) {
    fs.writeFileSync(filePath, cleaned);
    console.log(`✅ Cleaned: ${filePath}`);
  }
});
