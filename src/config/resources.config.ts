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
import { hubProductLinksRepository } from "@/integrations/supabase/repository/hubProductLinks";
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/integrations/supabase/types";

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
      const repo = hubProductLinksRepository(supabase);
      const data = await repo.getBySlug(slug);
      if (data?.private_url) {
        return data.private_url;
      }
    } catch (error) {
      logger.error(`Error fetching private URL for slug "${slug}":`, error);
    }
  }

  return null;
};

/**
 * Checks if a resource exists for a given slug
 *
 * @param slug - The slug of the resource to check
 * @returns Promise that resolves to true if the resource exists, false otherwise
 */
export const resourceUserExists = async (slug: string): Promise<boolean> => {
  try {
    const resource = await getResourceBySlug(slug);
    return resource !== null;
  } catch (error) {
    logger.error(`Error checking if resource '${slug}' exists:`, error);
    return false;
  }
};
