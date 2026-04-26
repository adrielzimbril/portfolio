const { existsSync, statSync, promises: fsPromises } = require("node:fs");
const { join } = require("node:path");
const { exec } = require("node:child_process");
const util = require("node:util");

const rootDir = "./";

const FOLDER_PATTERNS = [
  "_source",
  "node_modules",
  ".turbo",
  ".next",
  ".content-collections",
  ".trigger",
  ".superdesign",
  ".vercel/output",
];

const FILE_PATTERNS = [
  /^.+.lock$/,
  /^.+-lock.yaml$/,
  "tsconfig.tsbuildinfo",
];

/**
 * Function to run 'pnpm store prune' using exec.
 */
async function prunePnpmStore() {
  console.info(`Start executing 'pnpm store prune'`);

  const execPromise = util.promisify(exec);
  try {
    const { stdout, stderr } = await execPromise("pnpm store prune");
    console.log(`pnpm store prune output: ${stdout}`);
    if (stderr) {
      console.error(`Error output: ${stderr}`);
    }
  } catch (error) {
    console.error(`Error executing 'pnpm store prune':`, error);
  }
}

/**
 * Delete a folder
 */
function deleteFolder(folderPath) {
  try {
    fsPromises.rm(folderPath, { recursive: true, force: true });
    console.log(`Deleted: ${folderPath}`);
  } catch (error) {
    console.error(`Error deleting ${folderPath}:`, error);
  }
}

/**
 * Delete a file or directory recursively
 */
async function deleteFile(targetPath) {
  try {
    const stats = await fsPromises.lstat(targetPath);

    if (stats.isDirectory()) {
      const entries = await fsPromises.readdir(targetPath);
      const deletePromises = entries.map((entry) =>
        deleteFile(join(targetPath, entry)),
      );
      await Promise.all(deletePromises);
      await fsPromises.rmdir(targetPath);
    } else {
      await fsPromises.unlink(targetPath);
    }

    console.log(`Deleted: ${targetPath}`);
  } catch (error) {
    console.error(`Error deleting ${targetPath}:`, error);
  }
}

/**
 * Check if a path matches any of the given patterns
 */
function matchesPattern(name, patterns) {
  return patterns.some((pattern) =>
    typeof pattern === "string" ? name === pattern : pattern.test(name),
  );
}

/**
 * Clean folders recursively
 */
async function cleanFolders(directory) {
  const entries = await fsPromises.readdir(directory, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(directory, entry.name);

    if (entry.isDirectory()) {
      if (matchesPattern(entry.name, FOLDER_PATTERNS)) {
        deleteFolder(fullPath);
        continue;
      }

      // Verify and remove duplicates with "(1)"
      const match = entry.name.match(/^(.*)\s*\(1\)$/);
      if (match) {
        const originalName = match[1].trim();
        const originalPath = join(directory, originalName);

        if (existsSync(originalPath) && statSync(originalPath).isDirectory()) {
          console.log(
            `Duplicate detected: ${fullPath} matches ${originalPath}`,
          );
          deleteFolder(fullPath);
          continue;
        }
        console.log(`No duplicate for: ${fullPath}`);
      }

      await cleanFolders(fullPath);
    } else if (entry.isFile()) {
      if (matchesPattern(entry.name, FILE_PATTERNS)) {
        await deleteFile(fullPath);
      }
    }
  }
}

async function startClean() {
  try {
    await prunePnpmStore();
    console.info("Start cleaning old install caches");

    await cleanFolders(rootDir);
    console.info("End of cleaning old install caches");
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

startClean();
