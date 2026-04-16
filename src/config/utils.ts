/**
 * Configuration Utility Functions
 *
 * Helper functions for environment variable operations and checks
 */

import { ConfigValue } from "@/config";

// ============================================================================
// ENVIRONMENT MODE CHECKS
// ============================================================================

/**
 * Check if running in development mode
 */
export function isDevelopment(): boolean {
  return ConfigValue.NODE_ENV === "development";
}

/**
 * Check if running in production mode
 */
export function isProduction(): boolean {
  return ConfigValue.NODE_ENV === "production";
}

/**
 * Check if running in test mode
 */
export function isTest(): boolean {
  return ConfigValue.NODE_ENV === "test";
}

// ============================================================================
// ENVIRONMENT VARIABLE HELPERS
// ============================================================================

/**
 * Get all environment variables with their values
 * Useful for debugging and logging
 *
 * @returns Record of all environment variable names to their values
 */
export function getEnvVars(): Record<string, string | undefined> {
  return {
    // Node Environment
    NODE_ENV: ConfigValue.NODE_ENV,
    PORT: ConfigValue.PORT,

    // Site Configuration
    NEXT_PUBLIC_SITE_URL: ConfigValue.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_DOMAIN_SITE_URL: ConfigValue.NEXT_PUBLIC_DOMAIN_SITE_URL,
    NEXT_PUBLIC_S3_DOMAIN_SITE_URL: ConfigValue.NEXT_PUBLIC_S3_DOMAIN_SITE_URL,
    NEXT_PUBLIC_VERCEL_URL: ConfigValue.NEXT_PUBLIC_VERCEL_URL,
    NEXT_PUBLIC_REVAMP_DATE: ConfigValue.NEXT_PUBLIC_REVAMP_DATE,

    // API Security
    API_SECRET_KEY: ConfigValue.API_SECRET_KEY,
    HEALTH_CHECK_SECRET_KEY: ConfigValue.HEALTH_CHECK_SECRET_KEY,
    NEXT_REVALIDATION_SECRET: ConfigValue.NEXT_REVALIDATION_SECRET,

    // GitHub
    NEXT_PRIVATE_GITHUB_TOKEN: ConfigValue.NEXT_PRIVATE_GITHUB_TOKEN,
    NEXT_PUBLIC_GITHUB_USERNAME: ConfigValue.NEXT_PUBLIC_GITHUB_USERNAME,
    NEXT_PUBLIC_GITHUB_REPO: ConfigValue.NEXT_PUBLIC_GITHUB_REPO,
    NEXT_PUBLIC_GITHUB_BRANCH: ConfigValue.NEXT_PUBLIC_GITHUB_BRANCH,

    // Authentication
    BETTER_AUTH_SECRET: ConfigValue.BETTER_AUTH_SECRET,

    // Database (Supabase)
    NEXT_PUBLIC_SUPABASE_URL: ConfigValue.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: ConfigValue.NEXT_PUBLIC_SUPABASE_ANON_KEY,

    // Email & Contact
    CONTACTS_PROVIDER: ConfigValue.CONTACTS_PROVIDER,
    MAIL_PROVIDER: ConfigValue.MAIL_PROVIDER,
    SENDER_EMAIL: ConfigValue.SENDER_EMAIL,
    SENDER_NAME: ConfigValue.SENDER_NAME,

    // Brevo
    BREVO_API_KEY: ConfigValue.BREVO_API_KEY,
    BREVO_GENERAL_LIST_ID: ConfigValue.BREVO_GENERAL_LIST_ID,
    BREVO_COURSE_LIST_ID: ConfigValue.BREVO_COURSE_LIST_ID,
    BREVO_VIDEO_LIST_ID: ConfigValue.BREVO_VIDEO_LIST_ID,
    BREVO_EBOOKS_LIST_ID: ConfigValue.BREVO_EBOOKS_LIST_ID,
    BREVO_MASTERCLASS_LIST_ID: ConfigValue.BREVO_MASTERCLASS_LIST_ID,
    BREVO_FIGMA_TEMPLATE_LIST_ID: ConfigValue.BREVO_FIGMA_TEMPLATE_LIST_ID,
    BREVO_CODE_LIST_ID: ConfigValue.BREVO_CODE_LIST_ID,
    BREVO_QUESTS_REGISTER_ID: ConfigValue.BREVO_QUESTS_REGISTER_ID,
    BREVO_QUESTS_SUBMISSIONS_ID: ConfigValue.BREVO_QUESTS_SUBMISSIONS_ID,

    // Resend
    RESEND_API_KEY: ConfigValue.RESEND_API_KEY,
    RESEND_GENERAL_LIST_ID: ConfigValue.RESEND_GENERAL_LIST_ID,
    RESEND_COURSE_LIST_ID: ConfigValue.RESEND_COURSE_LIST_ID,
    RESEND_VIDEO_LIST_ID: ConfigValue.RESEND_VIDEO_LIST_ID,
    RESEND_EBOOKS_LIST_ID: ConfigValue.RESEND_EBOOKS_LIST_ID,
    RESEND_AUDIENCE_ID: ConfigValue.RESEND_AUDIENCE_ID,

    // Payments
    LEMONSQUEEZY_API_KEY: ConfigValue.LEMONSQUEEZY_API_KEY,
    LEMONSQUEEZY_WEBHOOK_SECRET: ConfigValue.LEMONSQUEEZY_WEBHOOK_SECRET,
    LEMONSQUEEZY_STORE_ID: ConfigValue.LEMONSQUEEZY_STORE_ID,
    STRIPE_SECRET_KEY: ConfigValue.STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_SECRET: ConfigValue.STRIPE_WEBHOOK_SECRET,

    // Tasks
    TRIGGER_ACCESS_TOKEN: ConfigValue.TRIGGER_ACCESS_TOKEN,
    NEXT_SHIROFOLIO_PUBLIC_APP_URL: ConfigValue.NEXT_SHIROFOLIO_PUBLIC_APP_URL,
    ANALYZE_BUNDLE: ConfigValue.ANALYZE_BUNDLE,

    // Analytics
    NEXT_PRIVATE_POSTHOG_CODE: ConfigValue.NEXT_PRIVATE_POSTHOG_CODE,
    NEXT_PRIVATE_POSTHOG_KEY: ConfigValue.NEXT_PRIVATE_POSTHOG_KEY,
    NEXT_PUBLIC_POSTHOG_KEY: ConfigValue.NEXT_PUBLIC_POSTHOG_KEY,
    NEXT_PRIVATE_POSTHOG_PERSONAL_KEY:
      ConfigValue.NEXT_PRIVATE_POSTHOG_PERSONAL_KEY,
    NEXT_PUBLIC_POSTHOG_HOST: ConfigValue.NEXT_PUBLIC_POSTHOG_HOST,
    NEXT_PUBLIC_PLAUSIBLE_URL: ConfigValue.NEXT_PUBLIC_PLAUSIBLE_URL,
    NEXT_PUBLIC_GOOGLE_ANALYTICS_ID:
      ConfigValue.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,

    // Storage
    S3_ACCESS_KEY_ID: ConfigValue.S3_ACCESS_KEY_ID,
    S3_SECRET_ACCESS_KEY: ConfigValue.S3_SECRET_ACCESS_KEY,
    S3_ENDPOINT: ConfigValue.S3_ENDPOINT,
    S3_REGION: ConfigValue.S3_REGION,
    NEXT_PUBLIC_AVATARS_BUCKET_NAME:
      ConfigValue.NEXT_PUBLIC_AVATARS_BUCKET_NAME,

    // AI
    OPENAI_API_KEY: ConfigValue.OPENAI_API_KEY,

    // Bot Protection
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: ConfigValue.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
    NEXT_PRIVATE_RECAPTCHA_SECRET_KEY:
      ConfigValue.NEXT_PRIVATE_RECAPTCHA_SECRET_KEY,
    NEXT_PUBLIC_TURNSTILE_SITE_KEY: ConfigValue.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
    NEXT_PRIVATE_TURNSTILE_SECRET_KEY:
      ConfigValue.NEXT_PRIVATE_TURNSTILE_SECRET_KEY,
    TURNSTILE_SECRET_KEY: ConfigValue.TURNSTILE_SECRET_KEY,

    // Performance
    SITE_URL: ConfigValue.SITE_URL,
    PAGESPEED_API_KEY: ConfigValue.PAGESPEED_API_KEY,
    LIGHTHOUSE_CACHE_DAYS: ConfigValue.LIGHTHOUSE_CACHE_DAYS,

    // Legacy / Other
    NEXT_PUBLIC_REST_API_ENDPOINT: ConfigValue.NEXT_PUBLIC_REST_API_ENDPOINT,
    NEXT_PUBLIC_WEBSITE_URL: ConfigValue.NEXT_PUBLIC_WEBSITE_URL,
  };
}

/**
 * Check if a specific environment variable is set
 *
 * @param name - The name of the environment variable to check
 * @returns true if the environment variable is set and has a value
 */
export function isEnvVarSet(name: string): boolean {
  return !!process.env[name];
}

/**
 * Get environment variable with fallback
 *
 * @param name - The name of the environment variable
 * @param defaultValue - Optional default value if the variable is not set
 * @returns The environment variable value or the default value
 */
export function getEnvVar(name: string, defaultValue?: string): string {
  return process.env[name] || defaultValue || "";
}

/**
 * Get environment variable safely (throws error if not set in production)
 *
 * @param name - The name of the environment variable
 * @returns The environment variable value
 * @throws Error if variable is not set in production
 */
export function getEnvVarSafe(name: string): string {
  const value = process.env[name];

  if (!value && isProduction()) {
    throw new Error(
      `Required environment variable "${name}" is not set in production`,
    );
  }

  return value || "";
}

/**
 * Get public environment variables only (safe to expose to client)
 *
 * @returns Record of public environment variables only
 */
export function getPublicEnvVars(): Record<string, string | undefined> {
  const envVars = getEnvVars();
  const publicVars: Record<string, string | undefined> = {};

  Object.keys(envVars).forEach((key) => {
    if (key.startsWith("NEXT_PUBLIC_")) {
      publicVars[key] = envVars[key];
    }
  });

  return publicVars;
}

/**
 * Get private environment variables only (server-side only)
 *
 * @returns Record of private environment variables only
 */
export function getPrivateEnvVars(): Record<string, string | undefined> {
  const envVars = getEnvVars();
  const privateVars: Record<string, string | undefined> = {};

  Object.keys(envVars).forEach((key) => {
    if (!key.startsWith("NEXT_PUBLIC_")) {
      privateVars[key] = envVars[key];
    }
  });

  return privateVars;
}

// ============================================================================
// HELPER FUNCTIONS FOR GROUPED CONFIG
// ============================================================================

/**
 * Get site URL configuration
 */
export function getSiteUrl() {
  return {
    url: ConfigValue.NEXT_PUBLIC_SITE_URL,
    domainUrl: ConfigValue.NEXT_PUBLIC_DOMAIN_SITE_URL,
    s3DomainUrl: ConfigValue.NEXT_PUBLIC_S3_DOMAIN_SITE_URL,
    vercelUrl: ConfigValue.NEXT_PUBLIC_VERCEL_URL,
  };
}

/**
 * Get Supabase configuration
 */
export function getSupabaseConfig() {
  return {
    url: ConfigValue.NEXT_PUBLIC_SUPABASE_URL,
    anonKey: ConfigValue.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  };
}

/**
 * Get GitHub configuration
 */
export function getGitHubConfig() {
  return {
    token: ConfigValue.NEXT_PRIVATE_GITHUB_TOKEN,
    username: ConfigValue.NEXT_PUBLIC_GITHUB_USERNAME || "adrielzimbril",
    repo: ConfigValue.NEXT_PUBLIC_GITHUB_REPO || "portfolio-shiro",
    branch: ConfigValue.NEXT_PUBLIC_GITHUB_BRANCH || "main",
  };
}

/**
 * Get S3 configuration
 */
export function getS3Config() {
  return {
    accessKeyId: ConfigValue.S3_ACCESS_KEY_ID,
    secretAccessKey: ConfigValue.S3_SECRET_ACCESS_KEY,
    endpoint: ConfigValue.S3_ENDPOINT,
    region: ConfigValue.S3_REGION,
    bucketName: ConfigValue.NEXT_PUBLIC_AVATARS_BUCKET_NAME,
  };
}

/**
 * Get PostHog configuration
 */
export function getPosthogConfig() {
  return {
    code: ConfigValue.NEXT_PRIVATE_POSTHOG_CODE,
    key: ConfigValue.NEXT_PUBLIC_POSTHOG_KEY,
    personalKey: ConfigValue.NEXT_PRIVATE_POSTHOG_PERSONAL_KEY,
    host: ConfigValue.NEXT_PUBLIC_POSTHOG_HOST,
  };
}

/**
 * Get Brevo configuration
 */
export function getBrevoConfig() {
  return {
    apiKey: ConfigValue.BREVO_API_KEY,
    generalListId: ConfigValue.BREVO_GENERAL_LIST_ID,
    courseListId: ConfigValue.BREVO_COURSE_LIST_ID,
    videoListId: ConfigValue.BREVO_VIDEO_LIST_ID,
    ebooksListId: ConfigValue.BREVO_EBOOKS_LIST_ID,
    masterclassListId: ConfigValue.BREVO_MASTERCLASS_LIST_ID,
    figmaTemplateListId: ConfigValue.BREVO_FIGMA_TEMPLATE_LIST_ID,
    codeListId: ConfigValue.BREVO_CODE_LIST_ID,
    questsRegisterId: ConfigValue.BREVO_QUESTS_REGISTER_ID,
    questsSubmissionsId: ConfigValue.BREVO_QUESTS_SUBMISSIONS_ID,
  };
}

/**
 * Get Resend configuration
 */
export function getResendConfig() {
  return {
    apiKey: ConfigValue.RESEND_API_KEY,
    generalListId: ConfigValue.RESEND_GENERAL_LIST_ID,
    courseListId: ConfigValue.RESEND_COURSE_LIST_ID,
    videoListId: ConfigValue.RESEND_VIDEO_LIST_ID,
    ebooksListId: ConfigValue.RESEND_EBOOKS_LIST_ID,
    audienceId: ConfigValue.RESEND_AUDIENCE_ID,
  };
}

/**
 * Get Turnstile configuration
 */
export function getTurnstileConfig() {
  return {
    siteKey: ConfigValue.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
    secretKey:
      ConfigValue.NEXT_PRIVATE_TURNSTILE_SECRET_KEY ||
      ConfigValue.TURNSTILE_SECRET_KEY,
  };
}
