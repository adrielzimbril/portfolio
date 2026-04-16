/**
 * Centralized Configuration Entry Point
 *
 * This file serves as the entry point for all configuration exports.
 * Import from here instead of using process.env directly.
 *
 * Usage:
 * import { ConfigValue, getSiteUrl, getSupabaseConfig, getGitHubConfig } from "@/config";
 * const siteUrl = ConfigValue.NEXT_PUBLIC_SITE_URL;
 * const supabaseConfig = getSupabaseConfig();
 *
 * EXCEPTION: NEXT_SHIROFOLIO_PUBLIC_APP_URL
 * This variable should be accessed via process.env.NEXT_SHIROFOLIO_PUBLIC_APP_URL
 * It is used by Trigger.dev background tasks that maintain the Laravel database
 * and other background tasks. These tasks run outside the Next.js context.
 */

// Export configuration values
export * from "@/config/config";

// Export utility functions
export * from "@/config/utils";

// Export validation functions
export * from "@/config/validate-environment-variables";
