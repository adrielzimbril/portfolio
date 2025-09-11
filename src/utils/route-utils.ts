/**
 * Get the active path from the URL parameter
 *
 * @param path - The path to get the active path from
 *
 * @returns The active path
 *
 * @example
 * getActivePathFromUrlParam("/about") // returns "/about"
 * getActivePathFromUrlParam(["/about", "contact"]) // returns "/about/contact"
 */

import logger from "./logger";

export function getActivePathFromUrlParam(path: string | string[]) {
  return Array.isArray(path) ? path.join("/") : path || "";
}

/**
 * Check if the given path is the active path
 *
 * @param path - The path to check
 *
 * @returns Whether the given path is the active path
 *
 * @example
 * isActivePath("/about") // returns true if the current path is "/about"
 *
 * isActivePath("/about/contact") // returns true if the current path is "/about/contact"
 */
export function isActivePath(path: string) {
  return (
    getActivePathFromUrlParam(path) ===
    getActivePathFromUrlParam(window.location.pathname)
  );
}

/**
 * Find the active path in an array of routes.
 *
 * This function analyzes a URL path and determines which route from the array
 * best matches the given path. It can return either the first matching segment
 * or all matching segments according to the options.
 *
 * @param {Object} options - The options object
 * @param {string} options.path - The URL path to analyze (ex: "/thoughts/my-post")
 * @param {string[]} options.array - The array of routes available (ex: ["home", "thoughts", "contact"])
 * @param {boolean} [options.asInclude=false] - If true, returns only the first matching segment
 * @param {boolean} [options.withSlash=false] - If true, adds a "/" at the beginning of the result
 *
 * @returns {string} The active path
 *
 * @example
 * // Basic case - exact path
 * getActivePathInArray({
 *   path: "/about",
 *   array: ["home", "about", "contact"]
 * })
 * // → "about"
 *
 * @example
 * // Path with sub-route - returns all matching segments
 * getActivePathInArray({
 *   path: "/thoughts/my-post",
 *   array: ["home", "thoughts", "contact"]
 * })
 * // → "thoughts"
 *
 * @example
 * // withSlash=true - adds a slash at the beginning
 * getActivePathInArray({
 *   path: "/thoughts/my-post",
 *   array: ["home", "thoughts", "contact"],
 *   withSlash: true
 * })
 * // → "/thoughts"
 *
 * @example
 * // asInclude=true - returns only the first matching segment
 * getActivePathInArray({
 *   path: "/about/team/john",
 *   array: ["home", "about", "team"],
 *   asInclude: true
 * })
 * // → "about" (premier segment trouvé)
 *
 * @example
 * // Root path - returns the first route in the array
 * getActivePathInArray({
 *   path: "/",
 *   array: ["home", "about", "contact"]
 * })
 * // → "home"
 *
 * @example
 * // No match - returns empty string
 * getActivePathInArray({
 *   path: "/unknown/route",
 *   array: ["home", "about", "contact"]
 * })
 * // → ""
 */
export function getActivePathInArray({
  path,
  array,
  asInclude = false,
  withSlash = false,
}: {
  path: string;
  array: string[];
  asInclude?: boolean;
  withSlash?: boolean;
}): string {
  // Clean the path: remove leading/trailing "/" and split into segments
  const segments = path.split("/").filter(Boolean);

  // Normalize the array: remove leading "/" from each item
  const normalizedArray = array.map((item) => item.replace(/^\/+/, ""));

  // If path is empty or root ("/"), return the first route
  if (segments.length === 0) {
    return normalizedArray[0] || "";
  }

  // "Include" mode: return only the first matching segment
  if (asInclude) {
    const firstMatch = segments.find((segment) =>
      normalizedArray.includes(segment)
    );
    return firstMatch || "";
  }

  // Normal mode: return all matching segments joined by "/"
  const matchedSegments = segments.filter((segment) =>
    normalizedArray.includes(segment)
  );

  const result = matchedSegments.join("/");
  return withSlash ? "/" + result : result;
}