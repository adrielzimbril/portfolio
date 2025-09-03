import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import rehypeShiki from "@shikijs/rehype";
import { z } from "zod";
import { appConfig } from "@/data/config";

function sanitizePath(path: string) {
  return path
    .replace(/(\.[a-zA-Z-]{2,5})$/, "")
    .replace(/^\//, "")
    .replace(/\/$/, "")
    .replace(/index$/, "");
}

function getLocaleFromFilePath(path: string) {
  return (
    path.match(/(\.[a-zA-Z-]{2,5})+\.(md|mdx|json)$/)?.[1]?.replace(".", "") ??
    appConfig.i18n.defaultLocale
  );
}

const posts = defineCollection({
  name: "posts",
  directory: "content/posts",
  include: "**/*.{mdx,md}",
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    photo: z.string().optional(),
    category: z.string(),
    category_id: z.number(),
    meta_title: z.string().optional(),
    meta_description: z.string().optional(),
    created_at: z.date(),
    updated_at: z.date(),
    published: z.boolean(),
  }),
  transform: async (document, context) => {
    const body = await compileMDX(context, document, {
      rehypePlugins: [
        [
          rehypeShiki,
          {
            theme: "github-dark",
          },
        ],
      ],
    });

    return {
      ...document,
      body,
      locale: getLocaleFromFilePath(document._meta.filePath),
      path: sanitizePath(document._meta.path),
      slug: document._meta.path,
    };
  },
});

const projects = defineCollection({
  name: "projects",
  directory: "content/projects",
  include: "**/*.{mdx,md}",
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    project_type: z.string(),
    project_type_id: z.number(),
    project_type_label: z.string(),
    project_link: z.string().optional(),
    project_keywords: z.string().optional(),
    category: z.string(),
    category_id: z.number(),
    image_big: z.string(),
    image_thumbnail: z.string(),
    gallery: z.array(z.string()).optional(),
    date_project_start: z.date().optional(),
    date_project_end: z.date().optional(),
    client: z.string(),
    button_text: z.string().optional(),
    button_link: z.string().optional(),
    meta_title: z.string(),
    meta_description: z.string(),
    created_at: z.date(),
    updated_at: z.date(),
    published: z.boolean(),
  }),
  transform: async (document, context) => {
    const body = await compileMDX(context, document, {
      rehypePlugins: [
        [
          rehypeShiki,
          {
            theme: "nord",
          },
        ],
      ],
    });
    const slug = document._meta.path;

    return {
      ...document,
      body,
      locale: getLocaleFromFilePath(document._meta.filePath),
      path: sanitizePath(document._meta.path),
      slug,
    };
  },
});

export default defineConfig({
  collections: [posts, projects],
});
