#!/usr/bin/env tsx
/**
 * Environment Variables Validation Script
 * 
 * This script validates all environment variables before starting the application.
 * Run it manually with: pnpm validate:env
 * It's also automatically run before `pnpm dev` and `pnpm build`.
 */

import { validateEnvironmentVariables } from "../src/config/validate-environment-variables";

console.log("🔍 Validating environment variables...\n");

try {
  const result = validateEnvironmentVariables();
  console.log("✅ Environment variables validated successfully!\n");
  process.exit(0);
} catch (error) {
  console.error("❌ Environment variables validation failed!\n");
  console.error(error);
  process.exit(1);
}
