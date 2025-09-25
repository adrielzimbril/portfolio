/**
 * Resources Configuration
 * 
 * This file contains the configuration for external resource URLs and provides
 * utility functions to interact with resources.
 * 
 * Resources are managed through content collections and can be accessed by their slugs.
 */

import { 
  getAllResourceSlugs as fetchAllResourceSlugs, 
  getResourceBySlug as fetchResourceBySlug
} from "@/module/content/utils/lib";

// Define Resource type based on the expected structure
type Resource = {
  id: number;
  slug: string;
  url?: string;
  [key: string]: any; // Allow for additional properties
};

/**
 * Type representing a resource slug
 */
type ResourceSlug = string;

/**
 * Type representing a resource URL
 */
type ResourceUrl = string;

/**
 * Base URL for all resources
 */
const RESOURCE_BASE_URL = 'https://example.com/ressources';

/**
 * Default resource URL format
 */
const DEFAULT_RESOURCE_URL = `${RESOURCE_BASE_URL}/{slug}`;

/**
 * Map of resource slugs to their specific URLs
 * If a resource has a custom URL, it can be specified here
 */
const RESOURCE_URL_OVERRIDES: Partial<Record<ResourceSlug, ResourceUrl>> = {
  // Example: 'custom-resource': 'https://custom-url.com/specific-resource'
};

/**
 * Gets the URL for a resource based on its slug
 * 
 * @param slug - The slug of the resource
 * @returns Promise that resolves to the complete URL for the resource
 * 
 * @example
 * ```typescript
 * const url = await getResourceUrl('example-resource');
 * // Returns: 'https://example.com/ressources/example-resource'
 * ```
 */
export const getResourceUrl = async (slug: string): Promise<string> => {
  // First check for URL overrides
  if (slug in RESOURCE_URL_OVERRIDES && RESOURCE_URL_OVERRIDES[slug]) {
    return RESOURCE_URL_OVERRIDES[slug] as string;
  }
  
  // Then check if the resource exists in the CMS
  try {
    const resource = await getResourceBySlug(slug);
    if (resource) {
      // Use the resource's URL if available, otherwise use default format
      return (resource as any).url || DEFAULT_RESOURCE_URL.replace('{slug}', slug);
    }
  } catch (error) {
    console.error(`Error fetching resource with slug '${slug}':`, error);
  }
  
  // Fallback to default URL format
  return DEFAULT_RESOURCE_URL.replace('{slug}', slug);
};

/**
 * Gets a resource by its slug
 * 
 * @param slug - The slug of the resource
 * @returns Promise that resolves to the resource or null if not found
 */
export const getResourceBySlug = async (slug: string): Promise<Resource | null> => {
  try {
    return await fetchResourceBySlug(slug);
  } catch (error) {
    console.error(`Error fetching resource with slug '${slug}':`, error);
    return null;
  }
};

/**
 * Gets all available resource slugs
 * 
 * @param options - Options for filtering resources
 * @returns Promise that resolves to an array of resource slugs
 */
export const getAllResourceSlugs = async (options: {
  published?: boolean;
  locale?: string;
  sort?: 'asc' | 'desc';
  limit?: number;
} = {}): Promise<string[]> => {
  try {
    return await fetchAllResourceSlugs(options);
  } catch (error) {
    console.error('Error fetching resource slugs:', error);
    return [];
  }
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

/**
 * Gets all available resources with their URLs
 * 
 * @returns Promise that resolves to a record of resource slugs and their URLs
 */
export const getAllResources = async (): Promise<Record<string, string>> => {
  try {
    const slugs = await getAllResourceSlugs();
    const resources: Record<string, string> = {};
    
    // Fetch each resource's URL in parallel
    await Promise.all(
      slugs.map(async (slug) => {
        resources[slug] = await getResourceUrl(slug);
      })
    );
    
    return resources;
  } catch (error) {
    console.error('Error fetching all resources:', error);
    return {};
  }
};
