import type { Post } from "@/module/content/types/types";
import { allPosts } from "content-collections";

type GetAllPostsOptions = {
  published?: boolean;
  locale?: string;
  pageSlug?: string;
  sort?: "asc" | "desc";
  limit?: number;
};

export async function getAllPosts(
  options: GetAllPostsOptions = {
    published: true,
    locale: undefined,
    pageSlug: undefined,
    sort: "asc",
    limit: undefined,
  }
): Promise<Post[]> {
  const { published, locale, pageSlug, sort, limit } = options;
  return Promise.resolve(
    allPosts
      .filter(
        (post) =>
          post.published === published && (!locale || post.locale === locale)
      )
      .sort((a, b) =>
        sort === "asc"
          ? a.path.localeCompare(b.path)
          : b.path.localeCompare(a.path)
      )
      .filter((post) => post.slug !== pageSlug)
      .slice(0, limit)
  );
}

export async function getPostBySlug(
  slug: string,
  options?: {
    locale?: string;
  }
): Promise<Post | null> {
  const { locale } = options ?? {};

  return Promise.resolve(
    allPosts.find(
      (post: Post) => post.path === slug && (!locale || post.locale === locale)
    ) ?? null
  );
}

type GetAllPostSlugsOptions = {
  published?: boolean;
  locale?: string;
  sort?: "asc" | "desc";
  limit?: number;
};

export async function getAllPostSlugs(
  options: GetAllPostSlugsOptions = {
    published: true,
    locale: undefined,
    sort: "asc",
    limit: undefined,
  }
): Promise<string[]> {
  const { published, locale, sort, limit } = options;
  return Promise.resolve(
    allPosts
      .filter(
        (post) =>
          post.published === published && (!locale || post.locale === locale)
      )
      .sort((a, b) =>
        sort === "asc"
          ? a.path.localeCompare(b.path)
          : b.path.localeCompare(a.path)
      )
      .map((post) => post.path)
      .slice(0, limit)
  );
}

type FilterOptions = {
  category?: string;
  tag?: string;
  search?: string;
  published?: boolean;
  locale?: string;
};

/**
 * Get filtered posts
 *
 * @param options - Filter options
 *
 * @returns Promise<Post[]>
 *
 * @example
 * ```typescript
 * const posts = await getFilteredPosts({ category: "technology" });
 * ```
 * // Returns all posts filtered by category "technology"
 */
export async function getFilteredPosts(
  options: FilterOptions = { published: undefined, locale: undefined }
): Promise<Post[]> {
  const posts = await getAllPosts({
    published: options.published,
    locale: options.locale,
  });
  return Promise.resolve(
    posts.filter((post) => {
      // Filter by category
      if (
        options.category &&
        post.categories.find((cat) => cat.slug === options.category)
      ) {
        return false;
      }

      // Filter by tag
      if (options.tag && !post.tags.find((tag) => tag.slug === options.tag)) {
        return false;
      }

      // Filter by search
      if (options.search) {
        const searchLower = options.search.toLowerCase();
        const titleMatch = post.title.toLowerCase().includes(searchLower);
        const contentMatch =
          post.excerpt?.toLowerCase().includes(searchLower) || false;

        if (!titleMatch && !contentMatch) {
          return false;
        }
      }

      return true;
    })
  );
}

/**
 * Get all categories
 *
 * @returns Promise<string[]>
 *
 * @example
 * ```typescript
 * const categories = await getAllCategories();
 * ```
 */
export async function getAllCategories(): Promise<string[]> {
  const categories = allPosts.map((post) =>
    post.categories.map((cat) => cat.slug)
  );
  return Promise.resolve([...new Set(categories.flat())]);
}

/**
 * Get all tags
 *
 * @returns Promise<string[]>
 *
 * @example
 * ```typescript
 * const tags = await getAllTags();
 * ```
 * // Returns all unique tags from all posts
 */
export async function getAllTags(): Promise<string[]> {
  const allTags = allPosts.flatMap((post) => post.tags.map((tag) => tag.slug));
  return Promise.resolve([...new Set(allTags)]);
}
