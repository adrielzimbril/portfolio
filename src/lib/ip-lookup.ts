import logger from "@/utils/logger";

export interface IPData {
  [key: string]: any;
}

export async function lookupIP(ipAddress?: string): Promise<IPData> {
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
