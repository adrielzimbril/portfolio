import logger from "@/utils/logger";

export interface IPData<T> {
  [key: string]: string | number | T[] | Date | File;
}

export async function lookupIP<T>(ipAddress?: string): Promise<IPData<T>> {
  try {
    const url = `https://api.oricodes.com/ip/${ipAddress || ""}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`IP lookup failed with status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    logger.error("Error fetching IP data:", error);
    throw error;
  }
}
