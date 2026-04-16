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
export const logger = {
  info: (...args: unknown[]) => console.log("ℹ️ [INFO]", ...args),
  warn: (...args: unknown[]) => console.warn("⚠️ [WARN]", ...args),
  error: (...args: unknown[]) => console.error("❌ [ERROR]", ...args),
  success: (...args: unknown[]) => console.log("✅ [SUCCESS]", ...args),

  debug: (...args: unknown[]) =>
    process.env.NODE_ENV === "development" &&
    console.debug("🐛 [DEBUG]", ...args),

  trace: (...args: unknown[]) =>
    process.env.NODE_ENV === "development" &&
    console.trace("[🗺️ TRACE]", ...args),
};

export default logger;
