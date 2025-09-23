import {
  getAllPosts,
  getAllResources,
  getAllProjects,
} from "@/module/content/utils/lib";
import type { MetadataRoute } from "next";
import { Post, Resource, Project } from "@/module/content/types/types";
import { appConfig } from "@data/app-config";
import { getBaseUrl } from "@/utils/base-url";
import { routes } from "@/data/routes";

const baseUrl = getBaseUrl();

const baseRoutes = Object.values(routes)
  .map((route) => {
    if (route.inHeader) {
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
  }
  return typePriority[type];
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();
  const resources = await getAllResources();
  const projects = await getAllProjects();

  return [
    ...staticMarketingPages.flatMap((page: string) => ({
      url: new URL(`${page === "/" ? "" : "/"}${page}`, baseUrl).href,
      lastModified: new Date(),
      priority: getPriority(page === "/" ? "home" : "marketing"),
    })),
    ...posts.map((post: Post) => ({
      url: new URL(`/thoughts/${post.path}`, baseUrl).href,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: getPriority("resources"),
    })),
    ...resources.map((resource: Resource) => ({
      url: new URL(`/hub/${resource.path}`, baseUrl).href,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: getPriority("resources"),
    })),
    ...projects.map((project: Project) => ({
      url: new URL(`/projects/${project.path}`, baseUrl).href,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: getPriority("resources"),
    })),
  ];
}
