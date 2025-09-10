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

export function getActivePathFromUrlParam(path: string | string[]) {
  return Array.isArray(path) ? path.join("/") : path || "";
}
