/**
 * Resources Configuration
 *
 * This file contains the configuration for external resource URLs and provides
 * utility functions to interact with resources.
 *
 * Resources are managed through content collections and can be accessed by their slugs.
 */

import { getAllResourceSlugs } from "@/module/content/utils/lib";

/**
 * Type for custom data that can be associated with a resource
 */
type CustomResourceData<T = any> = {
  // The URL for this resource (if different from default)
  url?: string;
  // Any additional custom data
  data: T;
};

/**
 * Type representing a resource slug
 */
type ResourceSlug = string;

/**
 * Base URL for all resources
 */
const RESOURCE_BASE = await getAllResourceSlugs();

/**
 * Map of resource slugs to their custom data
 * You can define custom data for any resource here
 * 
 * only existing resources slug in RESOURCE_BASE are allowed
 */
const CUSTOM_RESOURCES: Record<typeof RESOURCE_BASE, string> = {
  // Example:
  // 'custom-resource': "url string"
};

/**
 * Gets the custom data for a resource based on its slug
 *
 * @param slug - The slug of the resource
 * @returns The custom data for the resource or null if not found
 *
 * @example
 * ```typescript
 * const data = getResourceData('custom-resource');
 * // Returns: { url: '...', data: { ... } } or null if not found
 * ```
 */
export const getResourceData = <T = any>(
  slug: string
): CustomResourceData<T> | null => {
  return CUSTOM_RESOURCES[slug] || null;
};

/**
 * Checks if a resource exists for a given slug
 *
 * @param slug - The slug of the resource to check
 * @returns Promise that resolves to true if the resource exists, false otherwise
 */
export const resourceExists = async (slug: string): Promise<boolean> => {
  try {
    const resource = await getResourceBySlug(slug);
    return resource !== null;
  } catch (error) {
    console.error(`Error checking if resource '${slug}' exists:`, error);
    return false;
  }
};
