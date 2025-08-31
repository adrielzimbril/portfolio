// src/utils/get-json-data.ts
export type JsonData<T = unknown> = Record<string, unknown> | unknown[] | T;

/**
 * Check if we're running in a Node.js environment (server-side)
 */
const isServer = typeof window === "undefined";

/**
 * SERVER-ONLY: Reads a JSON file from the filesystem
 */
async function getJsonDataServer<T>(
  fileName: string,
  subfolder?: string
): Promise<JsonData<T>> {
  // Dynamic import to avoid bundling fs in client code
  const { readFileSync, existsSync } = await import("fs");
  const { join } = await import("path");

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
 * CLIENT-ONLY: Fetches JSON data from an API endpoint
 */
async function getJsonDataClient<T>(
  fileName: string,
  subfolder?: string
): Promise<JsonData<T>> {
  try {
    const params = new URLSearchParams();
    params.set("fileName", fileName);
    if (subfolder) {
      params.set("subfolder", subfolder);
    }

    const response = await fetch(`/api/json-data?${params}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching JSON data:", error);
    throw error;
  }
}

type GetJsonDataOptions = {
  mode?: "server" | "client" | "auto";
};

/**
 * Universal function that works on both server and client
 *
 * @param fileName - The name of the file to read
 * @param subfolder - Optional: The subfolder where the file is located
 *
 * @template T - The type of the data
 */
export async function getJsonData<T>(
  fileName: string,
  subfolder?: string,
  options?: GetJsonDataOptions
): Promise<JsonData<T>> {
  const { mode } = options || {};
  if (mode === "server" || (mode === "auto" && isServer)) {
    return getJsonDataServer<T>(fileName, subfolder);
  } else {
    return getJsonDataClient<T>(fileName, subfolder);
  }
}

/**
 * Cache for both server and client
 */
const jsonCache = new Map<string, JsonData<unknown>>();

/**
 * Cached version that works universally
 * Difference from getJsonData is that it caches the result
 * So it can be used on both server and client
 * And difference between "Client" and "Server" is that "Client" with an API route uses fetch and "Server" uses fs to read files from the filesystem
 *
 * @param fileName - The name of the file to read
 * @param subfolder - Optional: The subfolder where the file is located
 * @param options - Optional: The options for the function
 *
 * @template T - The type of the data
 *
 * @example
 * const data = await getJsonDataCached("projects", "personal", { mode: "client" });
 */
export async function getJsonDataCached<T>(
  fileName: string,
  subfolder?: string,
  options?: GetJsonDataOptions
): Promise<JsonData<T>> {
  const cacheKey = subfolder ? `${subfolder}/${fileName}` : fileName;

  if (jsonCache.has(cacheKey)) {
    return jsonCache.get(cacheKey) as JsonData<T>;
  }

  const data = await getJsonData<T>(fileName, subfolder, options);
  jsonCache.set(cacheKey, data);
  return data;
}

/**
 * Function to clear the cache
 */
export function clearJsonCache(): void {
  jsonCache.clear();
}
