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
 * @param {string} url - The URL.
 *
 * Returns the URL of a path.
 * @returns {string} The URL of the path.
 *
 * @example
 * getExternalUrl("https://example.com"); // returns "https://example.com"
 */
export function getExternalUrl(url: string | null | undefined): string {
  if (!url) return "";
  return new URL(url, getBaseUrl()).href;
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
 * Gets the base URL of the application.
 *
 * @param {"default" | "s3"} type - The type of the URL.
 * @default "default"
 *
 * Returns the base URL of the application.
 *
 * @returns {string} The base URL of the application.
 */
export function getAbsoluteUrl(type: "default" | "s3" = "default"): string {
  if (type === "s3") {
    return `${process.env.NEXT_PUBLIC_S3_DOMAIN_SITE_URL}/`;
  }
  return process.env.NEXT_PUBLIC_DOMAIN_SITE_URL
    ? `${process.env.NEXT_PUBLIC_DOMAIN_SITE_URL}/`
    : "https://www.adrielzimbril.com/";
}

/**
 * Gets the URL of a path.
 * @param {string} path - The path.
 *
 * Returns the URL of a path.
 * @returns {string} The URL of the path.
 *
 * @example
 * getAbsolutePathUrl("/about"); // returns "https://base-url/about"
 */
export function getAbsolutePathUrl({
  type = "default",
  path,
}: {
  type?: "default" | "s3";
  path: string;
}): string {
  const BASE_URL = getAbsoluteUrl(type);

  // ✅ Remove the leading slash from the path to avoid overwriting the path // Eg: /about -> about
  const safePath = path.replace(/^\//, "");

  // ✅ Ensure that BASE_URL ends with a single slash // Eg: https://example.com -> https://example.com/
  const safeBase = BASE_URL.replace(/\/+$/, "") + "/";

  return new URL(safePath, safeBase).href;
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
 * getResourcesUrl("quests", "slug"); // returns "https://base-url/quests/slug"
 */
export function getResourcesUrl(
  resource: PageType,
  slug?: string | undefined
): string {
  return `${getBaseUrl()}/${resource}${slug ? `/${slug}` : ""}`;
}

/**
 * Gets the resource ask URL.
 *
 * @param {string} slug - The slug of the resource.
 *
 * Returns the resource ask URL.
 * @returns {string} The resource ask URL.
 *
 * @example
 * getResourceAskUrl("slug"); // returns "https://base-url/hub/get/slug"
 */
export function getResourceAskUrl(slug?: string): string {
  if (!slug) return "";
  return getResourcesUrl(PageType.HUB, `get/${slug}`);
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
 * getImageUrl("slug"); // returns "https://base-url/slug"
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