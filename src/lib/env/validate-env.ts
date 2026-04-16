/**
 * Environment Variable Validation Utility
 * 
 * This utility validates that all required environment variables are set
 * and provides type-safe access to environment variables.
 */

interface EnvVar {
  name: string;
  required: boolean;
  description: string;
  defaultValue?: string;
}

const ENV_VARS: EnvVar[] = [
  // Node Environment
  { name: "NODE_ENV", required: false, defaultValue: "production", description: "Node environment (development/production)" },
  
  // Site Configuration
  { name: "NEXT_PUBLIC_SITE_URL", required: true, description: "Base URL of the site" },
  { name: "NEXT_PUBLIC_DOMAIN_SITE_URL", required: false, description: "Custom domain for CDN/proxy" },
  { name: "NEXT_PUBLIC_S3_DOMAIN_SITE_URL", required: false, description: "Custom domain for S3 assets" },
  { name: "NEXT_PUBLIC_REVAMP_DATE", required: false, defaultValue: "2025-08-17", description: "Site revamp date" },
  
  // API Security
  { name: "API_SECRET_KEY", required: true, description: "Secret key for API validation" },
  { name: "HEALTH_CHECK_SECRET_KEY", required: true, description: "Secret key for health checks" },
  { name: "NEXT_REVALIDATION_SECRET", required: false, description: "Secret for ISR revalidation" },
  
  // GitHub
  { name: "NEXT_PRIVATE_GITHUB_TOKEN", required: false, description: "GitHub personal access token" },
  { name: "NEXT_PUBLIC_GITHUB_USERNAME", required: false, description: "GitHub username" },
  { name: "NEXT_PUBLIC_GITHUB_REPO", required: false, description: "GitHub repository name" },
  { name: "NEXT_PUBLIC_GITHUB_BRANCH", required: false, defaultValue: "main", description: "GitHub branch" },
  
  // Authentication
  { name: "BETTER_AUTH_SECRET", required: true, description: "Secret for Better Auth" },
  
  // Database
  { name: "NEXT_PUBLIC_SUPABASE_URL", required: true, description: "Supabase project URL" },
  { name: "NEXT_PUBLIC_SUPABASE_ANON_KEY", required: true, description: "Supabase anonymous key" },
  
  // Email & Contact
  { name: "CONTACTS_PROVIDER", required: false, description: "Contact form provider" },
  { name: "MAIL_PROVIDER", required: false, description: "Email service provider" },
  { name: "SENDER_EMAIL", required: false, description: "Default sender email" },
  { name: "SENDER_NAME", required: false, description: "Default sender name" },
  { name: "BREVO_API_KEY", required: false, description: "Brevo API key" },
  { name: "RESEND_API_KEY", required: false, description: "Resend API key" },
  { name: "BREVO_GENERAL_LIST_ID", required: false, description: "Brevo general list ID" },
  { name: "BREVO_COURSE_LIST_ID", required: false, description: "Brevo course list ID" },
  { name: "BREVO_VIDEO_LIST_ID", required: false, description: "Brevo video list ID" },
  { name: "BREVO_EBOOKS_LIST_ID", required: false, description: "Brevo ebooks list ID" },
  { name: "BREVO_MASTERCLASS_LIST_ID", required: false, description: "Brevo masterclass list ID" },
  { name: "BREVO_FIGMA_TEMPLATE_LIST_ID", required: false, description: "Brevo Figma template list ID" },
  { name: "BREVO_CODE_LIST_ID", required: false, description: "Brevo code list ID" },
  { name: "BREVO_QUESTS_REGISTER_ID", required: false, description: "Brevo quests register list ID" },
  { name: "BREVO_QUESTS_SUBMISSIONS_ID", required: false, description: "Brevo quests submissions list ID" },
  { name: "RESEND_GENERAL_LIST_ID", required: false, description: "Resend general list ID" },
  { name: "RESEND_COURSE_LIST_ID", required: false, description: "Resend course list ID" },
  { name: "RESEND_VIDEO_LIST_ID", required: false, description: "Resend video list ID" },
  { name: "RESEND_EBOOKS_LIST_ID", required: false, description: "Resend ebooks list ID" },
  { name: "RESEND_AUDIENCE_ID", required: false, description: "Resend audience ID" },
  
  // Payments
  { name: "LEMONSQUEEZY_API_KEY", required: false, description: "LemonSqueezy API key" },
  { name: "LEMONSQUEEZY_WEBHOOK_SECRET", required: false, description: "LemonSqueezy webhook secret" },
  { name: "LEMONSQUEEZY_STORE_ID", required: false, description: "LemonSqueezy store ID" },
  { name: "STRIPE_SECRET_KEY", required: false, description: "Stripe secret key" },
  { name: "STRIPE_WEBHOOK_SECRET", required: false, description: "Stripe webhook secret" },
  
  // Tasks
  { name: "TRIGGER_ACCESS_TOKEN", required: false, description: "Trigger.dev access token" },
  { name: "NEXT_SHIROFOLIO_PUBLIC_APP_URL", required: false, description: "Shirofolio public app URL" },
  
  // Analytics
  { name: "NEXT_PRIVATE_POSTHOG_CODE", required: false, description: "PostHog project ID" },
  { name: "NEXT_PRIVATE_POSTHOG_KEY", required: false, description: "PostHog API key (server)" },
  { name: "NEXT_PUBLIC_POSTHOG_KEY", required: false, description: "PostHog API key (public)" },
  { name: "NEXT_PRIVATE_POSTHOG_PERSONAL_KEY", required: false, description: "PostHog personal API key" },
  { name: "NEXT_PUBLIC_POSTHOG_HOST", required: false, defaultValue: "https://us.i.posthog.com", description: "PostHog host URL" },
  { name: "NEXT_PUBLIC_PLAUSIBLE_URL", required: false, description: "Plausible analytics URL" },
  { name: "NEXT_PUBLIC_GOOGLE_ANALYTICS_ID", required: false, description: "Google Analytics ID" },
  
  // Storage
  { name: "S3_ACCESS_KEY_ID", required: false, description: "S3 access key ID" },
  { name: "S3_SECRET_ACCESS_KEY", required: false, description: "S3 secret access key" },
  { name: "S3_ENDPOINT", required: false, description: "S3 endpoint URL" },
  { name: "S3_REGION", required: false, description: "S3 region" },
  { name: "NEXT_PUBLIC_AVATARS_BUCKET_NAME", required: false, defaultValue: "avatars", description: "Avatars bucket name" },
  
  // AI
  { name: "OPENAI_API_KEY", required: false, description: "OpenAI API key" },
  
  // Bot Protection
  { name: "NEXT_PUBLIC_RECAPTCHA_SITE_KEY", required: false, description: "reCAPTCHA site key" },
  { name: "NEXT_PRIVATE_RECAPTCHA_SECRET_KEY", required: false, description: "reCAPTCHA secret key" },
  { name: "NEXT_PUBLIC_TURNSTILE_SITE_KEY", required: false, description: "Turnstile site key" },
  { name: "NEXT_PRIVATE_TURNSTILE_SECRET_KEY", required: false, description: "Turnstile secret key" },
  { name: "TURNSTILE_SECRET_KEY", required: false, description: "Turnstile secret key (legacy)" },
  
  // Performance
  { name: "SITE_URL", required: false, description: "Site URL for PageSpeed" },
  { name: "PAGESPEED_API_KEY", required: false, description: "PageSpeed API key" },
  { name: "LIGHTHOUSE_CACHE_DAYS", required: false, defaultValue: "10", description: "Lighthouse cache duration in days" },
  
  // Other
  { name: "PORT", required: false, defaultValue: "3000", description: "Server port" },
  { name: "NEXT_PUBLIC_VERCEL_URL", required: false, description: "Vercel deployment URL" },
  { name: "NEXT_PUBLIC_REST_API_ENDPOINT", required: false, description: "REST API endpoint" },
  { name: "NEXT_PUBLIC_WEBSITE_URL", required: false, description: "Website URL" },
];

/**
 * Validates that all required environment variables are set
 * Throws an error if any required variable is missing
 */
export function validateEnv(): void {
  const missing: string[] = [];
  const warnings: string[] = [];

  ENV_VARS.forEach((envVar) => {
    const value = process.env[envVar.name];
    
    if (envVar.required && !value) {
      missing.push(envVar.name);
    }
    
    if (!value && envVar.defaultValue) {
      warnings.push(`Using default value for ${envVar.name}: ${envVar.defaultValue}`);
    }
  });

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables:\n${missing.map((name) => `  - ${name}`).join("\n")}\n\n` +
      `Please check your .env.local file and ensure all required variables are set.`
    );
  }

  if (warnings.length > 0 && process.env.NODE_ENV === "development") {
    console.warn("Environment Variable Warnings:");
    warnings.forEach((warning) => console.warn(`  ⚠️  ${warning}`));
  }
}

/**
 * Get all environment variables with their values
 * Useful for debugging and logging
 */
export function getEnvVars(): Record<string, string | undefined> {
  const envVars: Record<string, string | undefined> = {};
  
  ENV_VARS.forEach((envVar) => {
    envVars[envVar.name] = process.env[envVar.name] || envVar.defaultValue;
  });
  
  return envVars;
}

/**
 * Check if a specific environment variable is set
 */
export function isEnvVarSet(name: string): boolean {
  return !!process.env[name];
}

/**
 * Get environment variable with fallback
 */
export function getEnvVar(name: string, defaultValue?: string): string {
  return process.env[name] || defaultValue || "";
}
