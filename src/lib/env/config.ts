/**
 * Centralized Environment Configuration
 * 
 * This file provides type-safe access to all environment variables.
 * Import from this file instead of using process.env directly.
 * 
 * Usage:
 * import { env } from "@/lib/env/config";
 * const siteUrl = env.NEXT_PUBLIC_SITE_URL;
 */

import { validateEnv, getEnvVar } from "./validate-env";

// Validate environment variables on import (only in production or when explicitly enabled)
if (process.env.NODE_ENV === "production") {
  validateEnv();
}

/**
 * Public environment variables (exposed to browser)
 * Variables starting with NEXT_PUBLIC_
 */
export const publicEnv = {
  // Site Configuration
  NEXT_PUBLIC_SITE_URL: getEnvVar("NEXT_PUBLIC_SITE_URL", "http://localhost:3000"),
  NEXT_PUBLIC_DOMAIN_SITE_URL: getEnvVar("NEXT_PUBLIC_DOMAIN_SITE_URL", ""),
  NEXT_PUBLIC_S3_DOMAIN_SITE_URL: getEnvVar("NEXT_PUBLIC_S3_DOMAIN_SITE_URL", ""),
  NEXT_PUBLIC_REVAMP_DATE: getEnvVar("NEXT_PUBLIC_REVAMP_DATE", "2025-08-17"),
  NEXT_PUBLIC_VERCEL_URL: getEnvVar("NEXT_PUBLIC_VERCEL_URL", ""),
  
  // GitHub (public info)
  NEXT_PUBLIC_GITHUB_USERNAME: getEnvVar("NEXT_PUBLIC_GITHUB_USERNAME", ""),
  NEXT_PUBLIC_GITHUB_REPO: getEnvVar("NEXT_PUBLIC_GITHUB_REPO", ""),
  NEXT_PUBLIC_GITHUB_BRANCH: getEnvVar("NEXT_PUBLIC_GITHUB_BRANCH", "main"),
  
  // Database
  NEXT_PUBLIC_SUPABASE_URL: getEnvVar("NEXT_PUBLIC_SUPABASE_URL", ""),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: getEnvVar("NEXT_PUBLIC_SUPABASE_ANON_KEY", ""),
  
  // Analytics
  NEXT_PUBLIC_POSTHOG_KEY: getEnvVar("NEXT_PUBLIC_POSTHOG_KEY", ""),
  NEXT_PUBLIC_POSTHOG_HOST: getEnvVar("NEXT_PUBLIC_POSTHOG_HOST", "https://us.i.posthog.com"),
  NEXT_PUBLIC_PLAUSIBLE_URL: getEnvVar("NEXT_PUBLIC_PLAUSIBLE_URL", ""),
  NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: getEnvVar("NEXT_PUBLIC_GOOGLE_ANALYTICS_ID", ""),
  
  // Storage
  NEXT_PUBLIC_AVATARS_BUCKET_NAME: getEnvVar("NEXT_PUBLIC_AVATARS_BUCKET_NAME", "avatars"),
  
  // Bot Protection
  NEXT_PUBLIC_RECAPTCHA_SITE_KEY: getEnvVar("NEXT_PUBLIC_RECAPTCHA_SITE_KEY", ""),
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: getEnvVar("NEXT_PUBLIC_TURNSTILE_SITE_KEY", ""),
  
  // Other
  NEXT_PUBLIC_REST_API_ENDPOINT: getEnvVar("NEXT_PUBLIC_REST_API_ENDPOINT", ""),
  NEXT_PUBLIC_WEBSITE_URL: getEnvVar("NEXT_PUBLIC_WEBSITE_URL", ""),
} as const;

/**
 * Private environment variables (server-side only)
 * Variables starting with NEXT_PRIVATE_ or no prefix
 */
export const privateEnv = {
  // Node Environment
  NODE_ENV: getEnvVar("NODE_ENV", "production"),
  PORT: getEnvVar("PORT", "3000"),
  
  // API Security
  API_SECRET_KEY: getEnvVar("API_SECRET_KEY", ""),
  HEALTH_CHECK_SECRET_KEY: getEnvVar("HEALTH_CHECK_SECRET_KEY", ""),
  NEXT_REVALIDATION_SECRET: getEnvVar("NEXT_REVALIDATION_SECRET", ""),
  
  // GitHub
  NEXT_PRIVATE_GITHUB_TOKEN: getEnvVar("NEXT_PRIVATE_GITHUB_TOKEN", ""),
  NEXT_PRIVATE_GITHUB_TOKEN_OLD: getEnvVar("NEXT_PRIVATE_GITHUB_TOKEN_OLD", ""),
  NEXT_PRIVATE_GITHUB_TOKEN_NEW: getEnvVar("NEXT_PRIVATE_GITHUB_TOKEN_NEW", ""),
  
  // Authentication
  BETTER_AUTH_SECRET: getEnvVar("BETTER_AUTH_SECRET", ""),
  
  // Email & Contact
  CONTACTS_PROVIDER: getEnvVar("CONTACTS_PROVIDER", ""),
  MAIL_PROVIDER: getEnvVar("MAIL_PROVIDER", ""),
  SENDER_EMAIL: getEnvVar("SENDER_EMAIL", ""),
  SENDER_NAME: getEnvVar("SENDER_NAME", ""),
  
  // Brevo
  BREVO_API_KEY: getEnvVar("BREVO_API_KEY", ""),
  BREVO_GENERAL_LIST_ID: getEnvVar("BREVO_GENERAL_LIST_ID", ""),
  BREVO_COURSE_LIST_ID: getEnvVar("BREVO_COURSE_LIST_ID", ""),
  BREVO_VIDEO_LIST_ID: getEnvVar("BREVO_VIDEO_LIST_ID", ""),
  BREVO_EBOOKS_LIST_ID: getEnvVar("BREVO_EBOOKS_LIST_ID", ""),
  BREVO_MASTERCLASS_LIST_ID: getEnvVar("BREVO_MASTERCLASS_LIST_ID", ""),
  BREVO_FIGMA_TEMPLATE_LIST_ID: getEnvVar("BREVO_FIGMA_TEMPLATE_LIST_ID", ""),
  BREVO_CODE_LIST_ID: getEnvVar("BREVO_CODE_LIST_ID", ""),
  BREVO_QUESTS_REGISTER_ID: getEnvVar("BREVO_QUESTS_REGISTER_ID", ""),
  BREVO_QUESTS_SUBMISSIONS_ID: getEnvVar("BREVO_QUESTS_SUBMISSIONS_ID", ""),
  
  // Resend
  RESEND_API_KEY: getEnvVar("RESEND_API_KEY", ""),
  RESEND_GENERAL_LIST_ID: getEnvVar("RESEND_GENERAL_LIST_ID", ""),
  RESEND_COURSE_LIST_ID: getEnvVar("RESEND_COURSE_LIST_ID", ""),
  RESEND_VIDEO_LIST_ID: getEnvVar("RESEND_VIDEO_LIST_ID", ""),
  RESEND_EBOOKS_LIST_ID: getEnvVar("RESEND_EBOOKS_LIST_ID", ""),
  RESEND_AUDIENCE_ID: getEnvVar("RESEND_AUDIENCE_ID", ""),
  
  // Payments
  LEMONSQUEEZY_API_KEY: getEnvVar("LEMONSQUEEZY_API_KEY", ""),
  LEMONSQUEEZY_WEBHOOK_SECRET: getEnvVar("LEMONSQUEEZY_WEBHOOK_SECRET", ""),
  LEMONSQUEEZY_STORE_ID: getEnvVar("LEMONSQUEEZY_STORE_ID", ""),
  STRIPE_SECRET_KEY: getEnvVar("STRIPE_SECRET_KEY", ""),
  STRIPE_WEBHOOK_SECRET: getEnvVar("STRIPE_WEBHOOK_SECRET", ""),
  
  // Tasks
  TRIGGER_ACCESS_TOKEN: getEnvVar("TRIGGER_ACCESS_TOKEN", ""),
  NEXT_SHIROFOLIO_PUBLIC_APP_URL: getEnvVar("NEXT_SHIROFOLIO_PUBLIC_APP_URL", ""),
  
  // Analytics
  NEXT_PRIVATE_POSTHOG_CODE: getEnvVar("NEXT_PRIVATE_POSTHOG_CODE", ""),
  NEXT_PRIVATE_POSTHOG_KEY: getEnvVar("NEXT_PRIVATE_POSTHOG_KEY", ""),
  NEXT_PRIVATE_POSTHOG_PERSONAL_KEY: getEnvVar("NEXT_PRIVATE_POSTHOG_PERSONAL_KEY", ""),
  
  // Storage
  S3_ACCESS_KEY_ID: getEnvVar("S3_ACCESS_KEY_ID", ""),
  S3_SECRET_ACCESS_KEY: getEnvVar("S3_SECRET_ACCESS_KEY", ""),
  S3_ENDPOINT: getEnvVar("S3_ENDPOINT", ""),
  S3_REGION: getEnvVar("S3_REGION", ""),
  
  // AI
  OPENAI_API_KEY: getEnvVar("OPENAI_API_KEY", ""),
  
  // Bot Protection
  NEXT_PRIVATE_RECAPTCHA_SECRET_KEY: getEnvVar("NEXT_PRIVATE_RECAPTCHA_SECRET_KEY", ""),
  NEXT_PRIVATE_TURNSTILE_SECRET_KEY: getEnvVar("NEXT_PRIVATE_TURNSTILE_SECRET_KEY", ""),
  TURNSTILE_SECRET_KEY: getEnvVar("TURNSTILE_SECRET_KEY", ""),
  
  // Performance
  SITE_URL: getEnvVar("SITE_URL", "https://www.adrielzimbril.com/"),
  PAGESPEED_API_KEY: getEnvVar("PAGESPEED_API_KEY", ""),
  LIGHTHOUSE_CACHE_DAYS: getEnvVar("LIGHTHOUSE_CACHE_DAYS", "10"),
} as const;

/**
 * Combined environment object for convenience
 * Note: Only use this on the server-side
 */
export const env = {
  ...publicEnv,
  ...privateEnv,
} as const;

/**
 * Type definitions for environment variables
 */
export type PublicEnv = typeof publicEnv;
export type PrivateEnv = typeof privateEnv;
export type Env = typeof env;

/**
 * Helper functions
 */

/**
 * Check if running in development mode
 */
export function isDevelopment(): boolean {
  return privateEnv.NODE_ENV === "development";
}

/**
 * Check if running in production mode
 */
export function isProduction(): boolean {
  return privateEnv.NODE_ENV === "production";
}

/**
 * Check if running in test mode
 */
export function isTest(): boolean {
  return privateEnv.NODE_ENV === "test";
}

/**
 * Get the site URL
 */
export function getSiteUrl(): string {
  return publicEnv.NEXT_PUBLIC_SITE_URL;
}

/**
 * Get the Supabase configuration
 */
export function getSupabaseConfig() {
  return {
    url: publicEnv.NEXT_PUBLIC_SUPABASE_URL,
    anonKey: publicEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  };
}

/**
 * Get GitHub configuration
 */
export function getGitHubConfig() {
  return {
    token: privateEnv.NEXT_PRIVATE_GITHUB_TOKEN,
    username: publicEnv.NEXT_PUBLIC_GITHUB_USERNAME,
    repo: publicEnv.NEXT_PUBLIC_GITHUB_REPO,
    branch: publicEnv.NEXT_PUBLIC_GITHUB_BRANCH,
  };
}

/**
 * Get S3 configuration
 */
export function getS3Config() {
  return {
    accessKeyId: privateEnv.S3_ACCESS_KEY_ID,
    secretAccessKey: privateEnv.S3_SECRET_ACCESS_KEY,
    endpoint: privateEnv.S3_ENDPOINT,
    region: privateEnv.S3_REGION,
    bucketName: publicEnv.NEXT_PUBLIC_AVATARS_BUCKET_NAME,
  };
}
