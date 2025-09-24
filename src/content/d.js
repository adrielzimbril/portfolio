// rename-locale-files.js
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const ROOT_DIR = process.cwd();

function walkDir(dir) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walkDir(fullPath);
    } else if (
      /\.(md|mdx)$/i.test(entry.name) &&
      entry.name.includes("zh-CN")
    ) {
      const newName = entry.name.replace(/zh-cn/g, "zh_CN");
      const newPath = path.join(dir, newName);

      fs.renameSync(fullPath, newPath);
      console.log(`✅ Renamed: ${entry.name} → ${newName}`);
    }
  });
}

// console.log("🔄 Renaming zh_CN → zh-CN in all .md/.mdx files...");
// // walkDir(ROOT_DIR);
// console.log("✨ Done!");

function walkDir(dir) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walkDir(fullPath);
    } else if (/\.(md|mdx)$/i.test(entry.name)) {
      if (
        /\.zh-CN\.(md|mdx)$/i.test(entry.name) ||
        /\.en\.(md|mdx)$/i.test(entry.name)
      ) {
        fs.unlinkSync(fullPath);
        console.log(`🗑️ Deleted: ${fullPath}`);
      }
    }
  });
}

// console.log(
//   "🚮 Suppression de tous les fichiers .zh-CN.(md/mdx) et .en.(md/mdx)..."
// );
// // walkDir(ROOT_DIR);
// console.log("✨ Done!");


const LANGS = ["en", "zh-CN"];
const allowedFileExtensions = [".md", ".mdx"];
let updatedFilesCount = 0;

function walkMdFiles(dir) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      // recurse into subfolders
      walkMdFiles(fullPath);
      return;
    }

    const ext = path.extname(entry.name);
    if (!allowedFileExtensions.includes(ext)) return;

    const base = path.basename(entry.name, ext);

    // skip files that already have a lang suffix
    if (LANGS.some((l) => base.endsWith(`.${l}`))) return;

    // default file
    const defaultFile = fullPath;
    if (!fs.existsSync(defaultFile)) return;

    const defaultContent = matter.read(defaultFile);

    LANGS.forEach((lang) => {
      const langFile = path.join(dir, `${base}.${lang}${ext}`);
      let langContent;

      if (fs.existsSync(langFile)) {
        langContent = matter.read(langFile);
      } else {
        // create a new file with the default content
        langContent = { content: defaultContent.content, data: {} };
      }

      // copy slug and ref if exist
      ["slug", "ref"].forEach((field) => {
        if (defaultContent.data[field]) {
          langContent.data[field] = defaultContent.data[field];
        }
      });

      // write back the file
      const output = matter.stringify(langContent.content, langContent.data);
      fs.writeFileSync(langFile, output);
      updatedFilesCount++;
      console.log(`✅ Updated: ${langFile}`);
    });
  });
}


walkMdFiles(ROOT_DIR);
console.log(
  `✨ Done!\n🎉 Total files updated/created: ${updatedFilesCount} files.`
);