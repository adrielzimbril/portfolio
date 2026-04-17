/**
 * Centralized Authentication Routes
 */
import { ConfigValue } from "@/config";

export const authRoutes = {
  login: "/api/auth/login",
  callback: "/api/auth/callback",
  // redirect destinations
  defaultRedirect: ConfigValue.AUTH_DEFAULT_REDIRECT,
  error: "/auth/auth-code-error",
} as const;
