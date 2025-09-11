import { PageType } from "@/types";

/**
 * Gets the base URL of the application.
 *
 * Returns the base URL of the application.
 * @returns {string} The base URL of the application.
 */
export function getBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }
  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  }
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

/**
 * Gets the URL of a path.
 * @param {string} path - The path.
 *
 * Returns the URL of a path.
 * @returns {string} The URL of the path.
 *
 * @example
 * getPathUrl("/about"); // returns "https://base-url/about"
 */
export function getPathUrl(path: string): string {
  const BASE_URL = getBaseUrl();
  return new URL(path, BASE_URL).href;
}

/**
 * Gets the API base URL.
 *
 * Returns the API base URL.
 * @returns {string} The API base URL.
 */
export function getApiBaseUrl(): string {
  return `${getBaseUrl()}/api`;
}

/**
 * Gets the resources URL.
 *
 * @param {string} resource - The resource type.
 * @param {string | undefined} slug - The slug of the resource.
 *
 * Returns the resources URL.
 * @returns {string} The resources URL.
 *
 * @example
 * getResourcesUrl("hub", "slug"); // returns "https://base-url/hub/slug"
 * getResourcesUrl("projects"); // returns "https://base-url/projects"
 * getResourcesUrl("thoughts", "slug"); // returns "https://base-url/thoughts/slug"
 */
export function getResourcesUrl(
  resource: PageType,
  slug?: string | undefined
): string {
  return `${getBaseUrl()}/${resource}${slug ? `/${slug}` : ""}`;
}

/**
 * Gets the image URL.
 *
 * @param {string} slug - The slug of the image.
 *
 * Returns the image URL.
 * @returns {string} The image URL.
 *
 * @example
 * getImageUrl(""); // returns ""
 * getImageUrl("slug"); // returns "https://base-url/images/slug"
 * getImageUrl("https://example.com/image.jpg"); // returns "https://example.com/image.jpg"
 */
export function getImageUrl(slug: string): string {
  if (!slug) return "";
  if (slug.startsWith("http://") || slug.startsWith("https://")) {
    return slug;
  }

  const base = getBaseUrl().replace(/\/+$/, "");
  const path = slug.replace(/^\/+/, "");

  return `${base}/${path}`;
}

export function getResourceAskUrl(slug?: string): string {
  if (!slug) return "";
  return getResourcesUrl(PageType.HUB, `get/${slug}`);
}
