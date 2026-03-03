import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import rehypeShiki from "@shikijs/rehype";
import { z } from "zod";
import { appConfig } from "@data/app-config";

import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeUnwrapImages from "rehype-unwrap-images";
import rehypeVideo from "rehype-video";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import { PortfolioProjectResearchScope, ResourceType } from "@/types";

const BASE_COLLECTION_PATH = "src/content";

/**
 * Gets the locale from a file path.
 * Returns defaultLocale if nothing is found.
 */
export function getLocaleFromFilePath(filePath: string): string {
  // matches .xx or .xx-XX before the extension
  const match = filePath.match(/\.([a-z]{2}(?:-[A-Z]{2})?)\.[^.]+$/i);
  if (match) {
    // normalization: zh-cn -> zh-CN
    return match[1]!.replace(/^[a-z]{2}-[a-z]{2}$/, (l) =>
      l
        .split("-")
        .map((p, i) => (i ? p.toUpperCase() : p.toLowerCase()))
        .join("-")
    );
  }

  // no locale found, return default
  return appConfig.i18n.defaultLocale;
}

/**
 * Sanitizes a path to make it a "clean route".
 * Removes locale (if any), extension, extra slashes, and "index".
 */
export function sanitizePath(filePath: string): string {
  // separate filename from path
  const parts = filePath.split("/");

  // get last segment
  const last = parts.pop() || "";

  // remove locale and extension if any
  const cleanLast = last
    .replace(/\.([a-z]{2}(?:-[A-Z]{2})?)$/, "") // remove locale
    .replace(/\.[^.]+$/, ""); // remove extension

  // push back cleaned segment
  if (cleanLast) parts.push(cleanLast);

  // join path, clean leading/trailing slashes, remove "index"
  return parts
    .join("/")
    .replace(/^\/|\/$/g, "")
    .replace(/index$/, "");
}


async function compileBodyMDX(context: any, document: any) {
  const remarkPluginsList: any = [
    remarkGfm,
    remarkParse,
    remarkRehype,
    remarkFrontmatter,
    remarkMdxFrontmatter,
    // mdxAnnotations.remark,
  ];

  const rehypePluginsList: any = [
    [rehypeVideo, { allowDangerousHtml: true, details: false }],
    // [mdxAnnotations.rehype],
    [rehypeUnwrapImages],
    [
      rehypeShiki,
      {
        themes: {
          light: "one-dark-pro",
          dark: "github-dark",
        },
      },
    ],
    [rehypePrettyCode],
    [rehypeStringify],
  ];

  return await compileMDX(context, document, {
    remarkPlugins: remarkPluginsList,
    rehypePlugins: rehypePluginsList,
  });
}

// Collection of authors (dans posts/authors/)
const authors = defineCollection({
  name: "authors",
  directory: `${BASE_COLLECTION_PATH}/posts/authors`,
  include: "**/*.{md,mdx}",
  schema: z.object({
    ref: z.string(),
    displayName: z.string(),
    email: z.string().email(),
    bio: z.string().optional(),
    avatar: z.string().optional(),
    social: z
      .object({
        twitter: z.string().optional(),
        github: z.string().optional(),
        linkedin: z.string().optional(),
        website: z.string().optional(),
      })
      .optional(),
  }),
  transform: async (document, context) => {
    const body = await compileMDX(context, document);

    return {
      ...document,
      body,
      locale: getLocaleFromFilePath(document._meta.filePath),
      path: sanitizePath(document._meta.path),
    };
  },
});

// Collection of categories for posts (in posts/categories/)
const postCategories = defineCollection({
  name: "postCategories",
  directory: `${BASE_COLLECTION_PATH}/posts/categories`,
  include: "**/*.{md,mdx}",
  schema: z.object({
    id: z.number(),
    name: z.string(),
    description: z.string().optional(),
    color: z.string(), // Squircle color (ex: "BLUE")
    slug: z.string(),
  }),
  transform: async (document, context) => {
    const body = await compileMDX(context, document);

    return {
      ...document,
      body,
      locale: getLocaleFromFilePath(document._meta.filePath),
      path: sanitizePath(document._meta.path),
    };
  },
});

// Collection of tags for posts (in posts/tags/)
const postTags = defineCollection({
  name: "postTags",
  directory: `${BASE_COLLECTION_PATH}/posts/tags`,
  include: "**/*.{md,mdx}",
  schema: z.object({
    id: z.number(),
    name: z.string(),
    description: z.string().optional(),
    color: z.string(), // Squircle color
    slug: z.string(),
  }),
  transform: async (document, context) => {
    const body = await compileMDX(context, document);

    return {
      ...document,
      body,
      locale: getLocaleFromFilePath(document._meta.filePath),
      path: sanitizePath(document._meta.path),
    };
  },
});

// Collection of categories for projects (in projects/categories/)
const projectCategories = defineCollection({
  name: "projectCategories",
  directory: `${BASE_COLLECTION_PATH}/projects/categories`,
  include: "**/*.{md,mdx}",
  schema: z.object({
    id: z.number(),
    name: z.string(),
    description: z.string().optional(),
    color: z.string(), // Squircle color
    slug: z.string(),
  }),
  transform: async (document, context) => {
    const body = await compileMDX(context, document);

    return {
      ...document,
      body,
      locale: getLocaleFromFilePath(document._meta.filePath),
      path: sanitizePath(document._meta.path),
    };
  },
});

// Collection of tags for projects (in projects/tags/) - If you want separate tags
const projectTags = defineCollection({
  name: "projectTags",
  directory: `${BASE_COLLECTION_PATH}/projects/tags`,
  include: "**/*.{md,mdx}",
  schema: z.object({
    id: z.number(),
    name: z.string(),
    description: z.string().optional(),
    color: z.string(), // Squircle color
    slug: z.string(),
  }),
  transform: async (document, context) => {
    const body = await compileMDX(context, document);

    return {
      ...document,
      body,
      locale: getLocaleFromFilePath(document._meta.filePath),
      path: sanitizePath(document._meta.path),
    };
  },
});

// Collection of tags for resources (in resources/tags/) - If you want separate tags
const resourceTags = defineCollection({
  name: "resourceTags",
  directory: `${BASE_COLLECTION_PATH}/resources/tags`,
  include: "**/*.{md,mdx}",
  schema: z.object({
    id: z.number(),
    name: z.string(),
    description: z.string().optional(),
    color: z.string(),
    slug: z.string(),
  }),
  transform: async (document, context) => {
    const body = await compileMDX(context, document);

    return {
      ...document,
      body,
      locale: getLocaleFromFilePath(document._meta.filePath),
      path: sanitizePath(document._meta.path),
    };
  },
});

// Collection of posts with relations
const posts = defineCollection({
  name: "posts",
  directory: `${BASE_COLLECTION_PATH}/posts`,
  include: "*.{mdx,md}", // Only files at the root of posts/
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    excerpt: z.string().optional(),
    cover: z.string().optional(),
    categories_id: z.array(z.number()), // ID of the category
    tags_id: z.array(z.number()), // Array of tag IDs
    created_at: z.string(),
    updated_at: z.string().optional(),
    published: z.boolean(),
    featured: z.boolean().optional().default(false),
  }),
  transform: async (document, context) => {
    const body = await compileBodyMDX(context, document);
    const locale = getLocaleFromFilePath(document._meta.filePath);

    // Resolve relations
    const categories = context
      .documents(postCategories)
      .filter(
        (c) =>
          document.categories_id.includes(c.id) &&
          getLocaleFromFilePath(c._meta.filePath) === locale
      );

    const tags = context
      .documents(postTags)
      .filter(
        (t) =>
          document.tags_id.includes(t.id) &&
          getLocaleFromFilePath(t._meta.filePath) === locale
      );

    return {
      ...document,
      body,
      locale: locale,
      path: sanitizePath(document._meta.path),
      //slug: document._meta.path,
      // Relations resolved
      categories: categories || [],
      tags: tags || [],
    };
  },
});

// Collection of projects with relations
const projects = defineCollection({
  name: "projects",
  directory: `${BASE_COLLECTION_PATH}/projects`,
  include: "*.{mdx,md}", // Only files at the root of projects/
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    excerpt: z.string().optional(),
    project_link: z.string().optional(),
    project_keywords: z.string().optional(),
    role: z.array(z.string()).optional(),
    categories_id: z.array(z.number()), // ID of the project category
    tags_id: z.array(z.number()), // Array of tag IDs
    image_big: z.string().optional(),
    image_thumbnail: z.string().optional(),
    gallery: z.array(z.string()).optional(),
    date_project: z.array(z.string().nullable().optional()),
    client: z.string().optional(),
    button_link: z.string().optional(),
    created_at: z.string(),
    updated_at: z.string().optional(),
    published: z.boolean(),
    featured: z.boolean().optional().default(false),
    cardSectionDescription: z.string().optional(),
    cards: z
      .array(
        z.object({
          title: z.enum(Object.values(PortfolioProjectResearchScope)),
          emoji: z.string(),
          description: z.string(),
          methodology: z.string(),
        })
      )
      .optional(),
    goalSectionDescription: z.string().optional(),
    goalSectionSubDescription: z.string().optional(),
    pointSectionDescription: z.string().optional(),
    points: z
      .array(z.object({ title: z.string(), description: z.string() }))
      .optional(),
    statementSectionDescription: z.string().optional(),
    statements: z
      .array(
        z.object({
          icon: z.string(),
          number: z.string(),
          description: z.string(),
        })
      )
      .optional(),
    previewSectionDescription: z.string().optional(),
    resultSectionDescription: z.string().optional(),
    results: z
      .array(
        z.object({
          badge: z.string(),
          icon: z.string(),
          content: z.string(),
        })
      )
      .optional(),
  }),
  transform: async (document, context) => {
    const body = await compileBodyMDX(context, document);
    const locale = getLocaleFromFilePath(document._meta.filePath);

    // Resolve relations
    const categories = context
      .documents(projectCategories)
      .filter(
        (c) =>
          document.categories_id.includes(c.id) &&
          getLocaleFromFilePath(c._meta.filePath) === locale
      );

    // Use projectTags or postTags according to your preference
    const tags = context
      .documents(projectTags)
      .filter(
        (t) =>
          document.tags_id.includes(t.id) &&
          getLocaleFromFilePath(t._meta.filePath) === locale
      );

    return {
      ...document,
      body,
      locale: locale,
      path: sanitizePath(document._meta.path),
      //slug: document._meta.path,
      // Resolved relations
      categories: categories || [],
      tags: tags || [],
    };
  },
});

const resources = defineCollection({
  name: "resources",
  directory: `${BASE_COLLECTION_PATH}/resources`,
  include: "*.{mdx,md}", // Only files at the root of projects/
  schema: z.object({
    id: z.number(),
    title: z.string(),
    slug: z.string(),
    excerpt: z.string(),
    features: z.array(z.string()).optional(),
    cover: z.string().optional(),
    type: z.enum(Object.values(ResourceType)),
    tags_id: z.array(z.number()),
    studentsNumber: z.number().optional(),
    studentsProfileImage: z.array(z.string()),
    created_at: z.string(),
    updated_at: z.string().optional(),
    published: z.boolean(),
  }),
  transform: async (document, context) => {
    const body = await compileBodyMDX(context, document);
    const locale = getLocaleFromFilePath(document._meta.filePath);

    // Use resourcesTags or postTags according to your preference
    const tags = context
      .documents(resourceTags)
      .filter(
        (t) =>
          document.tags_id.includes(t.id) &&
          getLocaleFromFilePath(t._meta.filePath) === locale
      );

    return {
      ...document,
      body,
      locale: locale,
      path: sanitizePath(document._meta.path),
      //slug: document._meta.path,
      // Resolved relations
      tags: tags || [],
    };
  },
});

const talks = defineCollection({
  name: "talks",
  directory: `${BASE_COLLECTION_PATH}/talks`,
  include: "*.{mdx,md}",
  schema: z.object({
    id: z.number(),
    title: z.string(),
    slug: z.string(),
    excerpt: z.string(),
    cover: z.string().optional(),
    role: z.string(),
    event_date: z.string(),
    participants: z.number().int().nonnegative().optional(),
    event_url: z.string().optional(),
    replay_url: z.string().optional(),
    created_at: z.string(),
    updated_at: z.string().optional(),
    published: z.boolean(),
  }),
  transform: async (document, context) => {
    const body = await compileBodyMDX(context, document);
    const locale = getLocaleFromFilePath(document._meta.filePath);
    return {
      ...document,
      body,
      locale,
      path: sanitizePath(document._meta.path),
    };
  },
});

const quests = defineCollection({
  name: "quests",
  directory: `${BASE_COLLECTION_PATH}/quests`,
  include: "*.{mdx,md}",
  schema: z.object({
    id: z.number(),
    title: z.string(),
    slug: z.string(),
    excerpt: z.string(),
    cover: z.string().optional(),
    registration_deadline: z.string(),
    submission_deadline: z.string(),
    quest_end: z.string(),
    results_published: z.boolean().default(false),
    rewards: z.array(z.string()).default([]),
    winners: z
      .array(
        z.object({
          id: z.string().optional(),
          name: z.string(),
          role: z.string().optional(),
          avatar: z.string().optional(),
          profile_url: z.string().optional(),
          work_url: z.string(),
          work_cover: z.string(),
          rank: z.number().int().positive(),
          pixel_perfect: z.boolean().optional().default(false),
          jury_favorite: z.boolean().optional().default(false),
          original_idea: z.boolean().optional().default(false),
          tags: z.array(z.string()).optional().default([]),
        }),
      )
      .optional()
      .default([]),
    created_at: z.string(),
    updated_at: z.string().optional(),
    published: z.boolean(),
  }),
  transform: async (document, context) => {
    const body = await compileBodyMDX(context, document);
    const locale = getLocaleFromFilePath(document._meta.filePath);
    return {
      ...document,
      body,
      locale,
      path: sanitizePath(document._meta.path),
    };
  },
});

export default defineConfig({
  collections: [
    // Metadata collections
    authors,
    postCategories,
    postTags,
    projectCategories,
    projectTags,
    resourceTags,
    // Main collections with relations
    posts,
    projects,
    resources,
    talks,
    quests,
  ],
});
