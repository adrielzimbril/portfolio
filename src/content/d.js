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


const LANGS = ["", "zh-CN"]; // "" = default file
const allowedFileExtensions = [".md", ".mdx"];
let updatedFilesCount = 0;

function walkMdFiles(dir) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walkMdFiles(fullPath);
      return;
    }

    const ext = path.extname(entry.name);
    if (!allowedFileExtensions.includes(ext)) return;

    const base = path.basename(entry.name, ext);

    // on ne touche qu'aux fichiers anglais source
    if (!base.endsWith(".en")) return;

    const nameBase = base.replace(/\.en$/, ""); // "name"

    // lire le fichier anglais
    const enRaw = fs.readFileSync(fullPath, "utf8");

    // extraire slug et ref
    const enMatches = {};
    ["slug", "ref"].forEach((field) => {
      const match = enRaw.match(new RegExp(`^${field}:\\s*(.*)$`, "m"));
      if (match) enMatches[field] = match[1];
    });

    // copier vers toutes les langues configurées
    LANGS.forEach((lang) => {
      const targetFileName = lang
        ? `${nameBase}.${lang}${ext}`
        : `${nameBase}${ext}`;
      const targetFile = path.join(dir, targetFileName);

      let targetRaw;
      if (fs.existsSync(targetFile)) {
        targetRaw = fs.readFileSync(targetFile, "utf8");
      } else {
        // fallback : si le fichier n'existe pas, copier le contenu anglais
        targetRaw = enRaw;
      }

      // remplacer ou ajouter slug/ref
      Object.entries(enMatches).forEach(([field, value]) => {
        if (targetRaw.match(new RegExp(`^${field}:\\s*(.*)$`, "m"))) {
          targetRaw = targetRaw.replace(
            new RegExp(`^${field}:\\s*(.*)$`, "m"),
            `${field}: ${value}`
          );
        } else {
          targetRaw = targetRaw.replace(/^---\n/, `---\n${field}: ${value}\n`);
        }
      });

      fs.writeFileSync(targetFile, targetRaw, "utf8");
      updatedFilesCount++;
      console.log(`✅ Updated: ${targetFile}`);
    });
  });
}


walkMdFiles(ROOT_DIR);
console.log(
  `✨ Done!\n🎉 Total files updated/created: ${updatedFilesCount} files.`
);