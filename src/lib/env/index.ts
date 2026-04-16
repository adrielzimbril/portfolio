/**
 * Environment Configuration Module
 * 
 * This module provides centralized, type-safe access to environment variables.
 * 
 * Usage:
 * import { env, publicEnv, privateEnv } from "@/lib/env";
 * 
 * For client-side components (use publicEnv):
 * import { publicEnv } from "@/lib/env";
 * const siteUrl = publicEnv.NEXT_PUBLIC_SITE_URL;
 * 
 * For server-side code (use env or privateEnv):
 * import { env } from "@/lib/env";
 * const apiSecret = env.API_SECRET_KEY;
 */

export * from "./validate-env";
export * from "./config";
