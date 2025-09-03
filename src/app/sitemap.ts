import { getAllPosts } from "@/module/content/utils/lib/posts";
import type { MetadataRoute } from "next";
import { Post } from "@/module/content/types/types";
import { appConfig } from "@data/app-config";
import { getBaseUrl } from "@/utils/base-url";

const baseUrl = getBaseUrl();
const locales = appConfig.i18n.enabled
  ? Object.keys(appConfig.i18n.locales)
  : [appConfig.i18n.defaultLocale];

const staticMarketingPages = ["", "/changelog"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();

  return [
    ...staticMarketingPages.flatMap((page) =>
      locales.map((locale) => ({
        url: new URL(`/${locale}${page}`, baseUrl).href,
        lastModified: new Date(),
      }))
    ),
    ...posts.map((post: Post) => ({
      url: new URL(`/${post.locale}/blog/${post.path}`, baseUrl).href,
      lastModified: new Date(),
    })),
  ];
}
