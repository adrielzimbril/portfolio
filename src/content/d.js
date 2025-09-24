// rename-locale-files.js
import fs from "fs";
import path from "path";

const ROOT_DIR = process.cwd();

function walkDir(dir) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walkDir(fullPath);
    } else if (
      /\.(md|mdx)$/i.test(entry.name) &&
      entry.name.includes("zh_CN")
    ) {
      const newName = entry.name.replace(/zh_CN/g, "zh-CN");
      const newPath = path.join(dir, newName);

      fs.renameSync(fullPath, newPath);
      console.log(`✅ Renamed: ${entry.name} → ${newName}`);
    }
  });
}

console.log("🔄 Renaming zh_CN → zh-CN in all .md/.mdx files...");
walkDir(ROOT_DIR);
console.log("✨ Done!");
