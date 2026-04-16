/**
 * Centralized Configuration
 *
 * This file serves as the entry point for all configuration exports.
 * Import from here instead of using process.env directly.
 *
 * Usage:
 * import { ConfigValue, getSiteUrl, getSupabaseConfig, getGitHubConfig } from "@/config";
 * const siteUrl = ConfigValue.NEXT_PUBLIC_SITE_URL;
 * const supabaseConfig = getSupabaseConfig();
 */

// Export configuration values
export * from "@/config/config";

// Export utility functions
export * from "@/config/utils";

// Export validation functions
export * from "@/config/validate-environment-variables";
