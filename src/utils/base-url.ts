import { PageType, QuestAskType } from "@/types";
import { ConfigValue, getSiteUrl } from "@/config";

/**
 * Gets the base URL of the application.
 *
 * Returns the base URL of the application.
 * @returns {string} The base URL of the application.
 */
export function getBaseUrl(): string {
  const siteConfig = getSiteUrl();
  if (siteConfig.url) {
    return siteConfig.url;
  }
  if (siteConfig.vercelUrl) {
    return `https://${siteConfig.vercelUrl}`;
  }
  return `http://localhost:${ConfigValue.PORT}`;
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
  const siteConfig = getSiteUrl();
  if (type === "s3") {
    return `${siteConfig.s3DomainUrl}/`;
  }
  return siteConfig.domainUrl
    ? `${siteConfig.domainUrl}/`
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
  const base = getBaseUrl().replace(/\/+$/, "");
  return `${base}/api`;
}

/**
 * Gets the URL of an API path.
 * @param {string} path - The API path.
 *
 * Returns the URL of an API path.
 * @returns {string} The URL of the API path.
 *
 * @example
 * getApiUrl("/views"); // returns "https://base-url/api/views"
 */
export function getApiUrl(path: string): string {
  const base = getApiBaseUrl();
  const safePath = path.replace(/^\//, "");
  return `${base}/${safePath}`;
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
 * getResourcesUrl(PageType.HUB, "slug"); // returns "https://base-url/hub/slug"
 * getResourcesUrl(PageType.PROJECTS); // returns "https://base-url/projects"
 * getResourcesUrl(PageType.THINKS, "slug"); // returns "https://base-url/thoughts/slug"
 * getResourcesUrl(PageType.QUESTS, "slug"); // returns "https://base-url/quests/slug"
 */
export function getResourcesUrl(
  resource: PageType,
  slug?: string | undefined,
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
export function getQuestAskUrl(slug: string, type: QuestAskType): string {
  return getResourcesUrl(PageType.QUESTS, `${slug}/${type}`);
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

/**
 * Gets the clean page URL without trailing slash, hash, or query params.
 *
 * @returns {string} The clean page URL.
 */
export function getThisPageUrl(): string {
  const url = new URL(window.location.href);
  // Remove hash and query params
  url.hash = "";
  url.search = "";
  // Remove trailing slash
  let pathname = url.pathname;
  if (pathname.endsWith("/")) {
    pathname = pathname.slice(0, -1);
  }
  return `${url.origin}${pathname}`;
}
