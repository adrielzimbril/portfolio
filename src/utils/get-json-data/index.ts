import { JsonData } from "@/types/type";
import logger from "../logger";
import { apiRoutes } from "@/data/api-routes";

/**
 * CLIENT-ONLY: Fetches JSON data from an API endpoint
 *
 * @param fileName - The name of the file to read
 * @param subfolder - Optional: The subfolder where the file is located
 *
 * @returns Promise<JsonData<T>>
 *
 * @template T - The type of the data
 *
 * @example
 * const data = await getJsonData("projects", "personal");
 * // returns the content of projects.json in the personal folder
 */
export async function getJsonData<T>(
  fileName: string,
  subfolder?: string
): Promise<JsonData<T>> {
  try {
    const params = new URLSearchParams();
    params.set("fileName", fileName);
    if (subfolder) {
      params.set("subfolder", subfolder);
    }

    const response = await fetch(`${apiRoutes.jsonData.link}?${params}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    logger.error("Error fetching JSON data:", error);
    throw error;
  }
}

/**
 * Client-side cache for JSON data
 */
const clientJsonCache = new Map<string, JsonData<unknown>>();

/**
 * CLIENT-ONLY: Cached version for client-side usage
 *
 * @param fileName - The name of the file to read
 * @param subfolder - Optional: The subfolder where the file is located
 *
 * @returns Promise<JsonData<T>>
 *
 * @template T - The type of the data
 *
 * @example
 * const data = await getJsonDataCached("projects", "personal");
 * // returns the cached data if available, otherwise loads from disk
 */
export async function getJsonDataCached<T>(
  fileName: string,
  subfolder?: string
): Promise<JsonData<T>> {
  const cacheKey = subfolder ? `${subfolder}-key-${fileName}` : fileName;

  if (clientJsonCache.has(cacheKey)) {
    return clientJsonCache.get(cacheKey) as JsonData<T>;
  }

  const data = await getJsonData<T>(fileName, subfolder);
  clientJsonCache.set(cacheKey, data);
  return data;
}

/**
 * CLIENT-ONLY: Preload multiple JSON files into cache
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
      logger.info(`Preloaded: ${subfolder ? `${subfolder}/` : ""}${fileName}`);
    } catch (error) {
      logger.error(`Failed to preload ${fileName}:`, error);
    }
  });
}

/**
 * CLIENT-ONLY: Get cache statistics
 *
 * @returns Object containing the size of the cache and an array of cache keys
 */
export function getCacheStats(): {
  size: number;
  keys: string[];
} {
  return {
    size: clientJsonCache.size,
    keys: Array.from(clientJsonCache.keys()),
  };
}

/**
 * CLIENT-ONLY: Clear the cache
 *
 * @example
 * clearJsonCache();
 * // clears the client JSON cache
 */
export function clearJsonCache(): void {
  clientJsonCache.clear();
  logger.info("Client JSON cache cleared");
}
