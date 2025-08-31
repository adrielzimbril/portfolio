import { JsonData } from "@/types/type";

/**
 * CLIENT-ONLY: Fetches JSON data from an API endpoint
 *
 * @param fileName - The name of the file to read
 * @param subfolder - Optional: The subfolder where the file is located
 *
 * @template T - The type of the data
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
