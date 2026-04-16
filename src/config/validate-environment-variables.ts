import { z } from "zod";
import { logger } from "@/utils";

/**
 * Environment Variables Schema
 *
 * Required variables will log errors if missing
 * Optional variables have defaults
 */
const environmentVariablesSchema = z.object({
  // Node Environment
  NODE_ENV: z.enum(["development", "production", "test"]).default("production"),
  PORT: z.string().default("3000"),

  // Site Configuration
  NEXT_PUBLIC_SITE_URL: z.string().url().default("http://localhost:3000"),
  NEXT_PUBLIC_DOMAIN_SITE_URL: z.string().optional(),
  NEXT_PUBLIC_S3_DOMAIN_SITE_URL: z.string().optional(),
  NEXT_PUBLIC_VERCEL_URL: z.string().optional(),
  NEXT_PUBLIC_REVAMP_DATE: z.string().default("2025-08-17"),

  // API Security
  API_SECRET_KEY: z.string().min(1, "API_SECRET_KEY is required"),
  HEALTH_CHECK_SECRET_KEY: z
    .string()
    .min(1, "HEALTH_CHECK_SECRET_KEY is required"),
  NEXT_REVALIDATION_SECRET: z.string().optional(),

  // GitHub
  NEXT_PRIVATE_GITHUB_TOKEN: z.string().optional(),
  NEXT_PUBLIC_GITHUB_USERNAME: z.string().optional(),
  NEXT_PUBLIC_GITHUB_REPO: z.string().optional(),
  NEXT_PUBLIC_GITHUB_BRANCH: z.string().default("main"),

  // Authentication
  BETTER_AUTH_SECRET: z.string().min(1, "BETTER_AUTH_SECRET is required"),

  // Database (Supabase)
  NEXT_PUBLIC_SUPABASE_URL: z
    .string()
    .url("NEXT_PUBLIC_SUPABASE_URL must be a valid URL"),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z
    .string()
    .min(1, "NEXT_PUBLIC_SUPABASE_ANON_KEY is required"),

  // Email & Contact
  CONTACTS_PROVIDER: z.string().optional(),
  MAIL_PROVIDER: z.string().optional(),
  SENDER_EMAIL: z.string().email().optional(),
  SENDER_NAME: z.string().optional(),

  // Brevo
  BREVO_API_KEY: z.string().optional(),
  BREVO_GENERAL_LIST_ID: z.string().optional(),
  BREVO_COURSE_LIST_ID: z.string().optional(),
  BREVO_VIDEO_LIST_ID: z.string().optional(),
  BREVO_EBOOKS_LIST_ID: z.string().optional(),
  BREVO_MASTERCLASS_LIST_ID: z.string().optional(),
  BREVO_FIGMA_TEMPLATE_LIST_ID: z.string().optional(),
  BREVO_CODE_LIST_ID: z.string().optional(),
  BREVO_QUESTS_REGISTER_ID: z.string().optional(),
  BREVO_QUESTS_SUBMISSIONS_ID: z.string().optional(),

  // Resend
  RESEND_API_KEY: z.string().optional(),
  RESEND_GENERAL_LIST_ID: z.string().optional(),
  RESEND_COURSE_LIST_ID: z.string().optional(),
  RESEND_VIDEO_LIST_ID: z.string().optional(),
  RESEND_EBOOKS_LIST_ID: z.string().optional(),
  RESEND_AUDIENCE_ID: z.string().optional(),

  // Payments
  LEMONSQUEEZY_API_KEY: z.string().optional(),
  LEMONSQUEEZY_WEBHOOK_SECRET: z.string().optional(),
  LEMONSQUEEZY_STORE_ID: z.string().optional(),
  STRIPE_SECRET_KEY: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),

  // Tasks
  TRIGGER_ACCESS_TOKEN: z.string().optional(),
  NEXT_SHIROFOLIO_PUBLIC_APP_URL: z.string().optional(),

  // Analytics
  NEXT_PRIVATE_POSTHOG_CODE: z.string().optional(),
  NEXT_PRIVATE_POSTHOG_KEY: z.string().optional(),
  NEXT_PUBLIC_POSTHOG_KEY: z.string().optional(),
  NEXT_PRIVATE_POSTHOG_PERSONAL_KEY: z.string().optional(),
  NEXT_PUBLIC_POSTHOG_HOST: z
    .string()
    .url()
    .default("https://us.i.posthog.com"),
  NEXT_PUBLIC_PLAUSIBLE_URL: z.string().optional(),
  NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: z.string().optional(),

  // Storage
  S3_ACCESS_KEY_ID: z.string().optional(),
  S3_SECRET_ACCESS_KEY: z.string().optional(),
  S3_ENDPOINT: z.string().optional(),
  S3_REGION: z.string().optional(),
  NEXT_PUBLIC_AVATARS_BUCKET_NAME: z.string().default("avatars"),

  // AI (Optional - used for markdown file translations and i18n nextintl translations)
  OPENAI_API_KEY: z.string().optional(),

  // Bot Protection
  NEXT_PUBLIC_RECAPTCHA_SITE_KEY: z.string().optional(),
  NEXT_PRIVATE_RECAPTCHA_SECRET_KEY: z.string().optional(),
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: z.string().optional(),
  NEXT_PRIVATE_TURNSTILE_SECRET_KEY: z.string().optional(),
  TURNSTILE_SECRET_KEY: z.string().optional(),

  // Performance
  SITE_URL: z.string().optional(),
  PAGESPEED_API_KEY: z.string().optional(),
  LIGHTHOUSE_CACHE_DAYS: z.string().default("10"),

  // Legacy / Other
  NEXT_PUBLIC_REST_API_ENDPOINT: z.string().optional(),
  NEXT_PUBLIC_WEBSITE_URL: z.string().optional(),
});

export type EnvVars = z.infer<typeof environmentVariablesSchema>;

/**
 * Validate environment variables using Zod
 * Logs warnings for missing optional variables
 * Logs errors for missing required variables
 * Returns validated environment variables with defaults applied
 */
export function validateEnvironmentVariables(): EnvVars {
  const envVars = {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_DOMAIN_SITE_URL: process.env.NEXT_PUBLIC_DOMAIN_SITE_URL,
    NEXT_PUBLIC_S3_DOMAIN_SITE_URL: process.env.NEXT_PUBLIC_S3_DOMAIN_SITE_URL,
    NEXT_PUBLIC_VERCEL_URL: process.env.NEXT_PUBLIC_VERCEL_URL,
    NEXT_PUBLIC_REVAMP_DATE: process.env.NEXT_PUBLIC_REVAMP_DATE,
    API_SECRET_KEY: process.env.API_SECRET_KEY,
    HEALTH_CHECK_SECRET_KEY: process.env.HEALTH_CHECK_SECRET_KEY,
    NEXT_REVALIDATION_SECRET: process.env.NEXT_REVALIDATION_SECRET,
    NEXT_PRIVATE_GITHUB_TOKEN: process.env.NEXT_PRIVATE_GITHUB_TOKEN,
    NEXT_PUBLIC_GITHUB_USERNAME: process.env.NEXT_PUBLIC_GITHUB_USERNAME,
    NEXT_PUBLIC_GITHUB_REPO: process.env.NEXT_PUBLIC_GITHUB_REPO,
    NEXT_PUBLIC_GITHUB_BRANCH: process.env.NEXT_PUBLIC_GITHUB_BRANCH,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    CONTACTS_PROVIDER: process.env.CONTACTS_PROVIDER,
    MAIL_PROVIDER: process.env.MAIL_PROVIDER,
    SENDER_EMAIL: process.env.SENDER_EMAIL,
    SENDER_NAME: process.env.SENDER_NAME,
    BREVO_API_KEY: process.env.BREVO_API_KEY,
    BREVO_GENERAL_LIST_ID: process.env.BREVO_GENERAL_LIST_ID,
    BREVO_COURSE_LIST_ID: process.env.BREVO_COURSE_LIST_ID,
    BREVO_VIDEO_LIST_ID: process.env.BREVO_VIDEO_LIST_ID,
    BREVO_EBOOKS_LIST_ID: process.env.BREVO_EBOOKS_LIST_ID,
    BREVO_MASTERCLASS_LIST_ID: process.env.BREVO_MASTERCLASS_LIST_ID,
    BREVO_FIGMA_TEMPLATE_LIST_ID: process.env.BREVO_FIGMA_TEMPLATE_LIST_ID,
    BREVO_CODE_LIST_ID: process.env.BREVO_CODE_LIST_ID,
    BREVO_QUESTS_REGISTER_ID: process.env.BREVO_QUESTS_REGISTER_ID,
    BREVO_QUESTS_SUBMISSIONS_ID: process.env.BREVO_QUESTS_SUBMISSIONS_ID,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    RESEND_GENERAL_LIST_ID: process.env.RESEND_GENERAL_LIST_ID,
    RESEND_COURSE_LIST_ID: process.env.RESEND_COURSE_LIST_ID,
    RESEND_VIDEO_LIST_ID: process.env.RESEND_VIDEO_LIST_ID,
    RESEND_EBOOKS_LIST_ID: process.env.RESEND_EBOOKS_LIST_ID,
    RESEND_AUDIENCE_ID: process.env.RESEND_AUDIENCE_ID,
    LEMONSQUEEZY_API_KEY: process.env.LEMONSQUEEZY_API_KEY,
    LEMONSQUEEZY_WEBHOOK_SECRET: process.env.LEMONSQUEEZY_WEBHOOK_SECRET,
    LEMONSQUEEZY_STORE_ID: process.env.LEMONSQUEEZY_STORE_ID,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    TRIGGER_ACCESS_TOKEN: process.env.TRIGGER_ACCESS_TOKEN,
    NEXT_SHIROFOLIO_PUBLIC_APP_URL: process.env.NEXT_SHIROFOLIO_PUBLIC_APP_URL,
    ANALYZE: process.env.ANALYZE,
    NEXT_PRIVATE_POSTHOG_CODE: process.env.NEXT_PRIVATE_POSTHOG_CODE,
    NEXT_PRIVATE_POSTHOG_KEY: process.env.NEXT_PRIVATE_POSTHOG_KEY,
    NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
    NEXT_PRIVATE_POSTHOG_PERSONAL_KEY:
      process.env.NEXT_PRIVATE_POSTHOG_PERSONAL_KEY,
    NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    NEXT_PUBLIC_PLAUSIBLE_URL: process.env.NEXT_PUBLIC_PLAUSIBLE_URL,
    NEXT_PUBLIC_GOOGLE_ANALYTICS_ID:
      process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,
    S3_ACCESS_KEY_ID: process.env.S3_ACCESS_KEY_ID,
    S3_SECRET_ACCESS_KEY: process.env.S3_SECRET_ACCESS_KEY,
    S3_ENDPOINT: process.env.S3_ENDPOINT,
    S3_REGION: process.env.S3_REGION,
    NEXT_PUBLIC_AVATARS_BUCKET_NAME:
      process.env.NEXT_PUBLIC_AVATARS_BUCKET_NAME,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
    NEXT_PRIVATE_RECAPTCHA_SECRET_KEY:
      process.env.NEXT_PRIVATE_RECAPTCHA_SECRET_KEY,
    NEXT_PUBLIC_TURNSTILE_SITE_KEY: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
    NEXT_PRIVATE_TURNSTILE_SECRET_KEY:
      process.env.NEXT_PRIVATE_TURNSTILE_SECRET_KEY,
    TURNSTILE_SECRET_KEY: process.env.TURNSTILE_SECRET_KEY,
    SITE_URL: process.env.SITE_URL,
    PAGESPEED_API_KEY: process.env.PAGESPEED_API_KEY,
    LIGHTHOUSE_CACHE_DAYS: process.env.LIGHTHOUSE_CACHE_DAYS,
    NEXT_PUBLIC_REST_API_ENDPOINT: process.env.NEXT_PUBLIC_REST_API_ENDPOINT,
    NEXT_PUBLIC_WEBSITE_URL: process.env.NEXT_PUBLIC_WEBSITE_URL,
  };

  const result = environmentVariablesSchema.safeParse(envVars);

  if (!result.success) {
    // Log errors for missing required variables
    result.error.issues.forEach((issue) => {
      const varName = issue.path.join(".");
      if (issue.code === "invalid_type" || issue.code === "too_small") {
        logger.env.error(varName, issue.message);
      } else {
        logger.env.warn(varName, issue.message);
      }
    });
  }

  // Log warnings for missing optional variables in development
  if (process.env.NODE_ENV === "development") {
    const optionalVars = [
      "NEXT_PRIVATE_GITHUB_TOKEN",
      "NEXT_PUBLIC_GITHUB_USERNAME",
      "NEXT_PUBLIC_GITHUB_REPO",
      "BREVO_API_KEY",
      "RESEND_API_KEY",
      "OPENAI_API_KEY",
      "NEXT_PUBLIC_POSTHOG_KEY",
      "NEXT_PUBLIC_GOOGLE_ANALYTICS_ID",
      "S3_ACCESS_KEY_ID",
      "NEXT_PUBLIC_TURNSTILE_SITE_KEY",
    ];

    optionalVars.forEach((varName) => {
      if (!process.env[varName]) {
        logger.env.missing(varName);
      }
    });
  }

  // Return validated data with defaults applied
  return result.success
    ? result.data
    : (environmentVariablesSchema.parse({}) as EnvVars);
}
