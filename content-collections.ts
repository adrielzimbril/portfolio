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
import rehypeImgSize from "rehype-img-size";
import rehypeVideo from "rehype-video";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import { PortfolioProjectResearchScope, ResourceType } from "@/types";
// import { mdxAnnotations } from "mdx-annotations";
// import { rehypeExtendedTable } from "rehype-extended-table";

const BASE_COLLECTION_PATH = "src/content";

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

// Collection of project types (in projects/types/)
const projectTypes = defineCollection({
  name: "projectTypes",
  directory: `${BASE_COLLECTION_PATH}/projects/types`,
  include: "**/*.{md,mdx}",
  schema: z.object({
    id: z.number(),
    name: z.string(),
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
    const body = await compileMDX(context, document, {
      remarkPlugins: [
        remarkGfm,
        remarkParse,
        remarkRehype,
        remarkFrontmatter,
        remarkMdxFrontmatter,
        // mdxAnnotations.remark,
      ],
      rehypePlugins: [
        [
          rehypeShiki,
          {
            theme: "github-dark",
          },
        ],
        // [rehypeImgSize],
        [rehypeVideo, { allowDangerousHtml: true, details: false }],
        [rehypeStringify],
        [rehypePrettyCode],
        // [mdxAnnotations.rehype],
        // [rehypeExtendedTable],
        [rehypeUnwrapImages],
      ],
    });

    // Resolve relations
    const categories = context
      .documents(postCategories)
      .filter((c) => document.categories_id.includes(c.id));

    const tags = context
      .documents(postTags)
      .filter((t) => document.tags_id.includes(t.id));

    return {
      ...document,
      body,
      locale: getLocaleFromFilePath(document._meta.filePath),
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
    project_type: z.string().optional(),
    project_type_id: z.number().optional(), // ID of the project type
    project_type_label: z.string().optional(),
    project_link: z.string().optional(),
    project_keywords: z.string().optional(),
    categories_id: z.array(z.number()), // ID of the project category
    tags_id: z.array(z.number()), // Array of tag IDs
    image_big: z.string().optional(),
    image_thumbnail: z.string().optional(),
    gallery: z.array(z.string()).optional(),
    date_project: z.array(z.string().nullable().optional()),
    client: z.string().optional(),
    button_text: z.string().optional(),
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
    const body = await compileMDX(context, document, {
      remarkPlugins: [
        remarkGfm,
        remarkParse,
        remarkRehype,
        remarkFrontmatter,
        remarkMdxFrontmatter,
        // mdxAnnotations.remark,
      ],
      rehypePlugins: [
        [
          rehypeShiki,
          {
            theme: "github-dark",
          },
        ],
        // [rehypeImgSize],
        [rehypeVideo, { allowDangerousHtml: true, details: false }],
        [rehypeStringify],
        [rehypePrettyCode],
        // [mdxAnnotations.rehype],
        // [rehypeExtendedTable],
        [rehypeUnwrapImages],
      ],
    });

    // Resolve relations
    const categories = context
      .documents(projectCategories)
      .filter((c) => document.categories_id.includes(c.id));

    // Use projectTags or postTags according to your preference
    const tags = context
      .documents(projectTags)
      .filter((t) => document.tags_id.includes(t.id));

    const project_type = context
      .documents(projectTypes)
      .filter((t) => document.project_type_id === t.id);

    return {
      ...document,
      body,
      locale: getLocaleFromFilePath(document._meta.filePath),
      path: sanitizePath(document._meta.path),
      //slug: document._meta.path,
      // Resolved relations
      categories: categories || [],
      tags: tags || [],
      project_type: project_type || [],
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
    studentsNumber: z.number(),
    studentsProfilImage: z.array(z.string()),
    created_at: z.string(),
    updated_at: z.string().optional(),
    published: z.boolean(),
  }),
  transform: async (document, context) => {
    const body = await compileMDX(context, document, {
      remarkPlugins: [
        remarkGfm,
        remarkParse,
        remarkRehype,
        remarkFrontmatter,
        remarkMdxFrontmatter,
        // mdxAnnotations.remark,
      ],
      rehypePlugins: [
        [
          rehypeShiki,
          {
            theme: "github-dark",
          },
        ],
        // [rehypeImgSize],
        [rehypeVideo, { allowDangerousHtml: true, details: false }],
        [rehypeStringify],
        [rehypePrettyCode],
        // [mdxAnnotations.rehype],
        // [rehypeExtendedTable],
        [rehypeUnwrapImages],
      ],
    });

    // Use resourcesTags or postTags according to your preference
    const tags = context
      .documents(resourceTags)
      .filter((t) => document.tags_id.includes(t.id));

    return {
      ...document,
      body,
      locale: getLocaleFromFilePath(document._meta.filePath),
      path: sanitizePath(document._meta.path),
      //slug: document._meta.path,
      // Resolved relations
      tags: tags || [],
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
    projectTypes,
    resourceTags,
    // Main collections with relations
    posts,
    projects,
    resources,
  ],
});
