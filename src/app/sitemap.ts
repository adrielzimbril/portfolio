import { getResourcesUrl } from "@/utils/base-url";
import type { MetadataRoute } from "next";
import { getAbsolutePathUrl } from "@/utils/base-url";
import { routes } from "@/data/routes";
import { PageType } from "@/types";

const baseRoutes = Object.values(routes)
  .map((route) => {
    if (route.inSitemap) {
      return route.link;
    }
    return null;
  })
  .filter((page) => page !== null);

const staticMarketingPages = [...new Set([...baseRoutes, "/contact"])];

/**
 * Get the priority of a route
 * @param route The route to get the priority of
 * @returns The priority of the route
 *
 * Priority levels:
 *  - Landing Page	1 (Highest Priority)
 *  - Supporting Pages	0.8 (High Priority)
 *  - Docs	0.8 (High Priority)
 *  - Resources pages	: 0.6 (Medium Priority)
 *      - Thoughts
 *      - Projects
 *      - Resources
 */
const getPriority = (type: "home" | "marketing" | "resources"): number => {
  const typePriority = {
    home: 1,
    marketing: 0.8,
    resources: 0.6,
  };
  return typePriority[type];
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    ...staticMarketingPages.flatMap((page: string) => ({
      url: getAbsolutePathUrl({ type: "default", path: page }),
      lastModified: new Date(),
      priority: getPriority(page === "/" ? "home" : "marketing"),
    })),
  ];
}
