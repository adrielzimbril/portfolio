import {
  rmSync,
  readdirSync,
  existsSync,
  statSync,
  promises as fsPromises,
} from "node:fs";
import path, { join } from "node:path";
import { exec } from "node:child_process";
import util from "node:util";

const rootDir = "./";

/**
 * Function to run 'pnpm store prune' using exec.
 */
async function prunePnpmStore(): Promise<void> {
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
 * @param {string} folderPath
 */
function deleteFolder(folderPath: string): void {
  try {
    rmSync(folderPath, { recursive: true, force: true });
    console.log(`Deleted: ${folderPath}`);
  } catch (error) {
    console.error(`Error deleting ${folderPath}:`, error);
  }
}

/**
 * @param {string} targetPath
 */
async function deleteFile(targetPath: string): Promise<void> {
  try {
    const stats = await fsPromises.lstat(targetPath);

    if (stats.isDirectory()) {
      // Read all entries in the directory
      const entries = await fsPromises.readdir(targetPath);
      const deletePromises = entries.map((entry) =>
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
 * @param {string} directory
 */
async function cleanFolders(directory: string): Promise<void> {
  readdirSync(directory, { withFileTypes: true }).forEach((entry) => {
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
          ".vercel/output",
        ].some((pattern) =>
          typeof pattern === "string"
            ? entry.name === pattern
            : pattern.test(entry.name)
        )
      ) {
        deleteFolder(fullPath);
        return;
      }

      // Vérifier et supprimer les doublons avec "(1)"
      const match = entry.name.match(/^(.*)\s*\(1\)$/);
      if (match) {
        const originalName = match[1].trim();
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

async function runBuildSharedPackages(): Promise<void> {
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

async function startClean(): Promise<void> {
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
