/**
 * Resources Configuration
 *
 * This file contains the configuration for external resource URLs and provides
 * utility functions to interact with resources.
 *
 * Resources are managed through content collections and can be accessed by their slugs.
 */

import { getResourceBySlug } from "@/module/content/utils/lib";

/**
 * Base URL for all resources
 */
export enum AllUserResourceSlug {
  THE_MISTAKE_THAT_STOPS_YOU_FROM_IMPROVING = "the-mistake-that-stops-you-from-improving",
  SOCIAL_BANNER_TEMPLATE = "social-banner-template",
  TEST = "test",
}

/**
 * Map of resource slugs to their custom data
 * You can define custom data for any resource here
 *
 * only existing resources slug in RESOURCE_BASE are allowed
 */
const CUSTOM_RESOURCES: Record<AllUserResourceSlug, string> = {
  // Example:
  // 'custom-resource': "url string"
  test: "https://shirofolio.com/projects/test",
  "the-mistake-that-stops-you-from-improving":
    "https://docs.google.com/document/d/1oWOfuqpznMF6rKObGimkBsnmShVTEw6LuZjV82Kuy-o/edit?usp=sharing",
  "social-banner-template":
    "https://www.figma.com/community/file/1623784451151162978",
};

/**
 * Gets the custom data for a resource based on its slug
 *
 * @param slug - The slug of the resource
 * @returns The custom data for the resource or null if not found
 *
 * @example
 * ```typescript
 * const data = getResourceUserUrl('custom-resource');
 * // Returns: 'url string' or null if not found
 * ```
 */
export const getResourceUserUrl = <T = any>(
  slug: AllUserResourceSlug,
): string | null => {
  return CUSTOM_RESOURCES[slug] || null;
};

/**
 * Checks if a resource exists for a given slug
 *
 * @param slug - The slug of the resource to check
 * @returns Promise that resolves to true if the resource exists, false otherwise
 */
export const resourceUserExists = async (
  slug: AllUserResourceSlug,
): Promise<boolean> => {
  try {
    const resource = await getResourceBySlug(slug);
    return resource !== null;
  } catch (error) {
    console.error(`Error checking if resource '${slug}' exists:`, error);
    return false;
  }
};
