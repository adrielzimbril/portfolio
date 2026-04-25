/**
 * Resources Configuration
 *
 * This file contains the configuration for external resource URLs and provides
 * utility functions to interact with resources.
 *
 * Resources are managed through content collections and can be accessed by their slugs.
 */

import { getResourceBySlug } from "@/integrations/content/lib";
import logger from "@/utils/logger";
import { hubResourcesRepository } from "@/integrations/supabase/repository/hubResources";
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/integrations/supabase/types";

/**
 * Base URL for all resources
 */
export enum AllUserResourceSlug {
  THE_MISTAKE_THAT_STOPS_YOU_FROM_IMPROVING = "the-mistake-that-stops-you-from-improving",
  SOCIAL_BANNER_TEMPLATE = "social-banner-template",
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
  "the-mistake-that-stops-you-from-improving":
    "https://docs.google.com/document/d/1oWOfuqpznMF6rKObGimkBsnmShVTEw6LuZjV82Kuy-o/edit?usp=sharing",
  "social-banner-template":
    "https://www.figma.com/community/file/1623784451151162978",
};

/**
 * Gets the custom data for a resource based on its slug
 *
 * @param slug - The slug of the resource
 * @param supabase - Optional Supabase client to fetch from DB
 * @returns The custom data for the resource or null if not found
 */
export const getResourceUserUrl = async (
  slug: string,
  supabase?: SupabaseClient<Database>,
): Promise<string | null> => {
  // 1. Try to fetch from Supabase if client is provided
  if (supabase) {
    try {
      const repo = hubResourcesRepository(supabase);
      const data = await repo.getBySlug(slug);
      if (data?.private_url) {
        return data.private_url;
      }
    } catch (error) {
      logger.error(`Error fetching private URL for slug "${slug}":`, error);
    }
  }

  // 2. Fallback to hardcoded config
  return CUSTOM_RESOURCES[slug as AllUserResourceSlug] || null;
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
    logger.error(`Error checking if resource '${slug}' exists:`, error);
    return false;
  }
};
