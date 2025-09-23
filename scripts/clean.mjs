// @ts-ignore
import {
  rmSync,
  readdirSync,
  existsSync,
  statSync,
  promises as fsPromises,
} from "node:fs";
// @ts-ignore
import path, { join } from "node:path";
import { exec } from "node:child_process";

import util from "node:util";

const rootDir = "./";

/**
 * Function to run 'pnpm store prune' using exec.
 */
async function prunePnpmStore() {
  console.info(`Start executing 'pnpm store prune'`);

  exec("pnpm store prune", (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing 'pnpm store prune': ${error.message}`);
      return;
    }

    if (stderr) {
      console.error(`Error output: ${stderr}`);
      return;
    }

    console.log(`pnpm store prune output: ${stdout}`);
  });
}

/**
 * @param {import("fs").PathLike} folderPath
 */
function deleteFolder(folderPath) {
  try {
    rmSync(folderPath, { recursive: true, force: true });
    console.log(`Deleted: ${folderPath}`);
  } catch (error) {
    console.error(`Error deleting ${folderPath}:`, error);
  }
}

/**
 * @param {import("fs").PathLike} targetPath
 */
async function deleteFile(targetPath) {
  try {
    const stats = await fsPromises.lstat(targetPath);

    if (stats.isDirectory()) {
      // Read all entries in the directory
      const entries = await fsPromises.readdir(targetPath);
      // @ts-ignore
      const deletePromises = entries.map((entry) =>
        // @ts-ignore
        deleteFile(join(targetPath, entry)),
      );
      await Promise.all(deletePromises);

      // After all entries have been deleted, remove the directory itself
      await fsPromises.rmdir(targetPath);
    } else {
      // If it's a file, simply unlink it
      await fsPromises.unlink(targetPath);
    }

    console.log(`Deleted: ${targetPath}`);
  } catch (error) {
    console.error(`Error deleting ${targetPath}:`, error);
  }
}

/**
 * @param {import("fs").PathLike} directory
 */
async function cleanFolders(directory) {
  readdirSync(directory, { withFileTypes: true }).forEach((entry) => {
    // @ts-ignore
    const fullPath = join(directory, entry.name);

    if (entry.isDirectory()) {
      if (
        [
          "_source",
          "node_modules",
          ".turbo",
          ".next",
          ".content-collections",
          ".trigger",
          ".superdesign",
        ].some((pattern) =>
          // @ts-ignore
          typeof pattern === "string"
            ? entry.name === pattern
            : // @ts-ignore
              pattern.test(entry.name)
        )
      ) {
        deleteFolder(fullPath);
        return;
      }

      // Vérifier et supprimer les doublons avec "(1)"
      const match = entry.name.match(/^(.*)\s*\(1\)$/);
      if (match) {
        const originalName = match[1].trim();
        // @ts-ignore
        const originalPath = join(directory, originalName);

        if (existsSync(originalPath) && statSync(originalPath).isDirectory()) {
          console.log(
            `Doublon détecté : ${fullPath} correspond à ${originalPath}`,
          );
          deleteFolder(fullPath);
          return;
        }
        console.log(`Pas de doublon pour : ${fullPath}`);
      }

      cleanFolders(fullPath);
    } else if (entry.isFile()) {
      if (
        [/^.+\.lock$/, /^.+\-lock.yaml$/, "tsconfig.tsbuildinfo"].some(
          (pattern) =>
            typeof pattern === "string"
              ? entry.name === pattern
              : pattern.test(entry.name),
        )
      ) {
        deleteFile(fullPath);
        return;
      }
    }
  });
}

const execPromise = util.promisify(exec);

// @ts-ignore
async function runBuildSharedPackages() {
  try {
    const { stdout, stderr } = await execPromise("pnpm run build");
    console.log("Output:", stdout);
    if (stderr) {
      console.error("Error output:", stderr);
    }
  } catch (error) {
    console.error("Execution failed:", error);
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
