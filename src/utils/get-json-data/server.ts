import { readFileSync, existsSync, readdirSync } from "fs";
import { join } from "path";
import { JsonData } from "@/types/type";

/**
 * SERVER-ONLY: Reads a JSON file from the filesystem
 *
 * @param fileName - The name of the file to read
 * @param subfolder - Optional: The subfolder where the file is located
 *
 * @template T - The type of the data
 *
 * @example
 * const data = getJsonData("projects", "personal");
 * // returns the content of projects.json in the personal folder
 */
export function getJsonData<T>(
  fileName: string,
  subfolder?: string
): JsonData<T> {
  try {
    // Build the base path
    const baseFolder = "src/data";
    const basePath = subfolder ? join(baseFolder, subfolder) : baseFolder;

    // Complete file path
    const filePath = join(process.cwd(), basePath, `${fileName}.json`);

    console.log(
      "Looking for file:",
      `${fileName}.json`,
      "in folder:",
      basePath,
      "(full path:",
      filePath,
      ")"
    );

    // Check if file exists
    if (!existsSync(filePath)) {
      throw new Error(
        `The file ${fileName}.json does not exist in ${basePath}`
      );
    }

    // Read and parse the file
    const fileContent = readFileSync(filePath, "utf-8");
    return JSON.parse(fileContent);
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error(
        `JSON parsing error in ${fileName}.json: ${error.message}`
      );
    }
    throw error;
  }
}

/**
 * Cache for server-side JSON data
 */
const serverJsonCache = new Map<string, JsonData<unknown>>();

/**
 * SERVER-ONLY: Cached version for better performance
 *
 * @param fileName - The name of the file to read
 * @param subfolder - Optional: The subfolder where the file is located
 *
 * @template T - The type of the data
 *
 * @example
 * const data = getJsonDataCached("projects", "personal");
 * // returns the cached data if available, otherwise loads from disk
 */
export function getJsonDataCached<T>(
  fileName: string,
  subfolder?: string
): JsonData<T> {
  const cacheKey = subfolder ? `${subfolder}/${fileName}` : fileName;

  if (serverJsonCache.has(cacheKey)) {
    console.log(`Cache hit for: ${cacheKey}`);
    return serverJsonCache.get(cacheKey) as JsonData<T>;
  }

  console.log(`Cache miss for: ${cacheKey}, loading from disk`);
  const data = getJsonData<T>(fileName, subfolder);
  serverJsonCache.set(cacheKey, data);
  return data;
}

/**
 * SERVER-ONLY: Get all available files in a directory
 *
 * @param subfolder - Optional: The subfolder to scan
 * @returns Array of available JSON file names (without .json extension)
 *
 * @example
 * const files = getAvailableJsonFiles("personal");
 * // returns ["projects", "skills"]
 */
export function getAvailableJsonFiles(subfolder?: string): string[] {
  try {
    const baseFolder = "src/data";
    const basePath = subfolder ? join(baseFolder, subfolder) : baseFolder;
    const fullPath = join(process.cwd(), basePath);

    if (!existsSync(fullPath)) {
      return [];
    }

    const files = readdirSync(fullPath);

    return files
      .filter((file: string) => file.endsWith(".json"))
      .map((file: string) => file.replace(".json", ""));
  } catch (error) {
    console.error("Error reading directory:", error);
    return [];
  }
}

/**
 * SERVER-ONLY: Preload multiple JSON files into cache
 *
 * @param files - Array of objects with fileName and optional subfolder
 *
 * @example
 * preloadJsonFiles([{ fileName: "projects", subfolder: "personal" }]);
 * // preloads the projects.json file from the personal subfolder
 */
export function preloadJsonFiles(
  files: Array<{ fileName: string; subfolder?: string }>
): void {
  files.forEach(({ fileName, subfolder }) => {
    try {
      getJsonDataCached(fileName, subfolder);
      console.log(`Preloaded: ${subfolder ? `${subfolder}/` : ""}${fileName}`);
    } catch (error) {
      console.error(`Failed to preload ${fileName}:`, error);
    }
  });
}

/**
 * SERVER-ONLY: Get cache statistics
 *
 * @returns Object containing the size of the cache and an array of cache keys
 *
 * @example
 * const stats = getCacheStats();
 * // returns { size: 10, keys: ["projects", "skills"] }
 */
export function getCacheStats(): {
  size: number;
  keys: string[];
} {
  return {
    size: serverJsonCache.size,
    keys: Array.from(serverJsonCache.keys()),
  };
}

/**
 * SERVER-ONLY: Clear the cache
 *
 * @example
 * clearServerJsonCache();
 * // clears the server JSON cache
 */
export function clearServerJsonCache(): void {
  serverJsonCache.clear();
  console.log("Server JSON cache cleared");
}