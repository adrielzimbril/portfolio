export function getBaseUrl() {
	if (process.env.NEXT_PUBLIC_SITE_URL) {
		return process.env.NEXT_PUBLIC_SITE_URL;
	}
	if (process.env.NEXT_PUBLIC_VERCEL_URL) {
		return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
	}
	return `http://localhost:${process.env.PORT ?? 3000}`;
}

export function getApiBaseUrl() {
  return `${getBaseUrl()}/api`;
}

export function getResourcesUrl(
  resource: "hub" | "projects" | "thoughts",
  slug?: string | undefined
) {
  return `${getBaseUrl()}/${resource}${slug ? `/${slug}` : ""}`;
}

export function getImageUrl(slug: string) {
  if (!slug) return "";
  if (slug.startsWith("http://") || slug.startsWith("https://")) {
    return slug;
  }

  const base = getBaseUrl().replace(/\/+$/, "");
  const path = slug.replace(/^\/+/, "");

  return `${base}/${path}`;
}
