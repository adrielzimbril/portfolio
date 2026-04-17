/**
 * Centralized Authentication Routes
 */
export const authRoutes = {
  login: "/api/auth/login",
  callback: "/api/auth/callback",
  // redirect destinations
  defaultRedirect: "/community",
  error: "/auth/auth-code-error",
} as const;
