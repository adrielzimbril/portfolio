import {
  getAllPosts,
  getAllResources,
  getAllProjects,
} from "@/module/content/utils/lib";
import type { MetadataRoute } from "next";
import { Post, Resource, Project } from "@/module/content/types/types";
import { appConfig } from "@data/app-config";
import { getBaseUrl } from "@/utils/base-url";
import { routes } from "@/data/route";

const baseUrl = getBaseUrl();
const locales = appConfig.i18n.enabled
  ? Object.keys(appConfig.i18n.locales)
  : [appConfig.i18n.defaultLocale];

const baseRoutes = Object.values(routes)
  .map((route) => {
    if (route.inHeader) {
      return route.link;
    }
    return null;
  })
  .filter((page) => page !== null);

const staticMarketingPages = [...new Set([...baseRoutes, "/contact"])];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();
  const resources = await getAllResources();
  const projects = await getAllProjects();

  return [
    ...staticMarketingPages.flatMap((page: string) =>
      locales.map((locale) => ({
        url: new URL(`/${locale}${page}`, baseUrl).href,
        lastModified: new Date(),
        alternates: {
          languages: locales.map((l) => ({
            href: new URL(`/${l}${page}`, baseUrl).href,
            hreflang: l,
          })),
        },
      }))
    ),
    ...posts.map((post: Post) => ({
      url: new URL(`/${post.locale}/thoughts/${post.path}`, baseUrl).href,
      lastModified: new Date(),
      alternates: {
        languages: locales.map((l) => ({
          href: new URL(`/${l}/thoughts/${post.path}`, baseUrl).href,
          hreflang: l,
        })),
      },
    })),
    ...resources.map((resource: Resource) => ({
      url: new URL(`/${resource.locale}/hub/${resource.path}`, baseUrl).href,
      lastModified: new Date(),
      alternates: {
        languages: locales.map((l) => ({
          href: new URL(`/${l}/hub/${resource.path}`, baseUrl).href,
          hreflang: l,
        })),
      },
    })),
    ...projects.map((project: Project) => ({
      url: new URL(`/${project.locale}/projects/${project.path}`, baseUrl).href,
      lastModified: new Date(),
      alternates: {
        languages: locales.map((l) => ({
          href: new URL(`/${l}/projects/${project.path}`, baseUrl).href,
          hreflang: l,
        })),
      },
    })),
  ];
}
