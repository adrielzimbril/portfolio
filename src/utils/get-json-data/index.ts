import { getJsonData as getJsonDataServer } from "@/utils/get-json-data/server";
import { getJsonData as getJsonDataClient } from "@/utils/get-json-data/client";
import { GetServerMode, JsonData } from "@/types/type";

/**
 * Check if we're running in a Node.js environment (server-side)
 */
const isServer = typeof window === "undefined";

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
  options?: GetServerMode
): Promise<JsonData<T>> {
  const { mode } = options || {};
  if (mode === "server" || (mode === "auto" && isServer)) {
    //return getJsonDataServer<T>(fileName, subfolder);
    return await getJsonDataClient<T>(fileName, subfolder);
  } else {
    return await getJsonDataServer<T>(fileName, subfolder);
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
  options?: GetServerMode
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
