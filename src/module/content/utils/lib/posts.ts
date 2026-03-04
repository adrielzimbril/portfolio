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
  options: Partial<GetAllPostsOptions> = {}
): Promise<Post[]> {
  const { published, locale, pageSlug, sort, limit } = {
    published: true,
    locale: undefined,
    pageSlug: undefined,
    sort: "desc",
    limit: Number.MAX_SAFE_INTEGER,
    ...options,
  };
  return Promise.resolve(
    allPosts
      .filter(
        (post) =>
          post.published === published && (!locale || post.locale === locale)
      )
      .sort((a, b) =>
        sort === "asc"
          ? a.created_at.localeCompare(b.created_at)
          : b.created_at.localeCompare(a.created_at)
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
      (post: Post) =>
        post.slug === slug &&
        (!locale || post.locale === locale) &&
        post.published === true,
    ) ?? null,
  );
}

interface PostsResult {
  currentPost: Post;
  adjacentPosts: Post[];
  totalFound: number;
}

/**
 * Retrieves a post and its adjacent posts (always 2 max)
 * Automatically adapts : if not enough before, takes more after and vice versa
 *
 * @param slug - The slug of the post
 * @param options - Options for the post retrieval
 *
 * @returns Promise<PostsResult | null>
 *
 * @example
 * ```typescript
 * const posts = await getPostWithAdjacent("my-post-slug", { locale: "fr" });
 * ```
 * // Returns the post with slug "my-post-slug" and its adjacent posts
 */
export async function getPostWithAdjacent(
  slug: string,
  options?: {
    locale?: string;
  }
): Promise<PostsResult | null> {
  const { locale } = options ?? {};
  // Filter by locale if specified
  const filteredPosts = allPosts.filter(
    (post: Post) =>
      post.published === true && (!locale || post.locale === locale),
  );

  // Sort by date (most recent first)
  const sortedPosts = filteredPosts.sort(
    (a, b) =>
      new Date(b.created_at || "").getTime() -
      new Date(a.created_at || "").getTime()
  );

  // Find the current post
  const currentIndex = sortedPosts.findIndex(
    (post: Post) => post.slug === slug
  );

  if (currentIndex === -1) {
    return null;
  }

  const currentPost = sortedPosts[currentIndex]!;

  // Intelligent logic to always have 2 posts
  const availableBefore = currentIndex;
  const availableAfter = sortedPosts.length - currentIndex - 1;
  const totalWanted = 2;

  let beforeCount = 1; // Preference: 1 before, 1 after
  let afterCount = 1;

  // Automatic adaptation
  if (availableBefore === 0) {
    // First post -> take 2 after
    beforeCount = 0;
    afterCount = Math.min(2, availableAfter);
  } else if (availableAfter === 0) {
    // Last post -> take 2 before
    beforeCount = Math.min(2, availableBefore);
    afterCount = 0;
  } else if (availableBefore < 1) {
    // Not enough before -> compensate with after
    beforeCount = availableBefore;
    afterCount = Math.min(totalWanted - beforeCount, availableAfter);
  } else if (availableAfter < 1) {
    // Not enough after -> compensate with before
    afterCount = availableAfter;
    beforeCount = Math.min(totalWanted - afterCount, availableBefore);
  }

  // Retrieve the posts
  const beforePosts =
    beforeCount > 0
      ? sortedPosts.slice(currentIndex - beforeCount, currentIndex)
      : [];

  const afterPosts =
    afterCount > 0
      ? sortedPosts.slice(currentIndex + 1, currentIndex + 1 + afterCount)
      : [];

  // Combine in chronological order
  const adjacentPosts = [...beforePosts, ...afterPosts];

  return {
    currentPost,
    adjacentPosts,
    totalFound: adjacentPosts.length,
  };
}

type GetAllPostSlugsOptions = {
  published?: boolean;
  locale?: string;
  sort?: "asc" | "desc";
  limit?: number;
};

export async function getAllPostSlugs(
  options: Partial<GetAllPostSlugsOptions> = {}
): Promise<string[]> {
  const { published, locale, sort, limit } = {
    published: true,
    locale: undefined,
    sort: "desc",
    limit: Number.MAX_SAFE_INTEGER,
    ...options,
  };

  return Promise.resolve(
    allPosts
      .filter(
        (post) =>
          post.published === published && (!locale || post.locale === locale)
      )
      .sort((a, b) =>
        sort === "asc"
          ? a.created_at.localeCompare(b.created_at)
          : b.created_at.localeCompare(a.created_at)
      )
      .map((post) => post.slug)
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
 * const categories = await getAllPostCategories();
 * ```
 */
export async function getAllPostCategories(): Promise<string[]> {
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
 * const tags = await getAllPostTags();
 * ```
 * // Returns all unique tags from all posts
 */
export async function getAllPostTags(): Promise<string[]> {
  const allTags = allPosts.flatMap((post) => post.tags.map((tag) => tag.slug));
  return Promise.resolve([...new Set(allTags)]);
}
