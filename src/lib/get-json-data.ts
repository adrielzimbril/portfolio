import { readFileSync, existsSync } from "fs";
import { join } from "path";

// Types for better security
export type JsonData<T = unknown> = Record<string, unknown> | unknown[] | T;

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

// Cached version with performance in mind
const jsonCache = new Map<string, JsonData<unknown>>();

export function getJsonDataCached<T>(
  fileName: string,
  subfolder?: string
): JsonData<T> {
  const cacheKey = subfolder ? `${subfolder}/${fileName}` : fileName;

  if (jsonCache.has(cacheKey)) {
    return jsonCache.get(cacheKey) as JsonData<T>;
  }

  const data = getJsonData(fileName, subfolder);
  jsonCache.set(cacheKey, data);
  return data as JsonData<T>;
}

// Function to clear the cache if needed
export function clearJsonCache(): void {
  jsonCache.clear();
}

// Example usage with your existing data
// const projectData = getJsonDataCached("projects", "personal");
// const resourceData = getJsonDataCached("resources", "personal");
