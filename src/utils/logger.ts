/**
 * Simple client-side logger
 * Works in browser (console)
 *
 * @example
 * logger.info("Hello, world!");
 * // ℹ️ [INFO] Hello, world!
 *
 * logger.warn("This is a warning message");
 * // ⚠️ [WARN] This is a warning message
 *
 * logger.error("Something went wrong!");
 * // ❌ [ERROR] Something went wrong!
 *
 * logger.debug("This is a debug message");
 * // 🐛 [DEBUG] This is a debug message
 *
 * logger.success("Operation completed successfully!");
 * // ✅ [SUCCESS] Operation completed successfully!
 */
import { isDevelopment } from "@/config";

export const logger = {
  info: (...args: unknown[]) => console.log("ℹ️ [INFO]", ...args),
  warn: (...args: unknown[]) => console.warn("⚠️ [WARN]", ...args),
  error: (...args: unknown[]) => console.error("❌ [ERROR]", ...args),
  success: (...args: unknown[]) => console.log("✅ [SUCCESS]", ...args),

  debug: (...args: unknown[]) =>
    isDevelopment() && console.debug("🐛 [DEBUG]", ...args),

  trace: (...args: unknown[]) =>
    isDevelopment() && console.trace("[🗺️ TRACE]", ...args),

  /**
   * Environment variable logging
   * Logs environment variable validation results
   */
  env: {
    error: (varName: string, message: string) =>
      console.error(`❌ [ENV_VAR_ERROR] ${varName}: ${message}`),

    warn: (varName: string, message: string) =>
      console.warn(`⚠️ [ENV_VAR_WARNING] ${varName}: ${message}`),

    info: (varName: string, message: string) =>
      console.log(`ℹ️ [ENV_VAR_INFO] ${varName}: ${message}`),

    success: (varName: string, message: string) =>
      console.log(`✅ [ENV_VAR_SUCCESS] ${varName}: ${message}`),

    missing: (varName: string) =>
      console.warn(
        `⚠️ [ENV_VAR_WARNING] Optional variable not set: ${varName}`,
      ),

    required: (varName: string) =>
      console.error(`❌ [ENV_VAR_ERROR] Required variable missing: ${varName}`),
  },
};

export default logger;
