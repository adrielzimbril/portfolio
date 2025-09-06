import type { Resource } from "@/module/content/types/types";
import { allResources } from "content-collections";

type GetAllResourcesOptions = {
  published?: boolean;
  locale?: string;
  pageSlug?: string;
  sort?: "asc" | "desc";
  limit?: number;
};

export async function getAllResources(
  options: Partial<GetAllResourcesOptions> = {}
): Promise<Resource[]> {
  const { published, locale, pageSlug, sort, limit } = {
    published: true,
    locale: undefined,
    pageSlug: undefined,
    sort: "desc",
    limit: Number.MAX_SAFE_INTEGER,
    ...options,
  };

  return Promise.resolve(
    allResources
      .filter(
        (resource) =>
          resource.published === published &&
          (!locale || resource.locale === locale)
      )
      .sort((a, b) => (sort === "asc" ? a.id - b.id : b.id - a.id))
      .filter((resource) => resource.slug !== pageSlug)
      .slice(0, limit)
  );
}

export async function getResourceBySlug(
  slug: string,
  options?: {
    locale?: string;
  }
): Promise<Resource | null> {
  const { locale } = options ?? {};

  return Promise.resolve(
    allResources.find(
      (resource: Resource) =>
        resource.slug === slug && (!locale || resource.locale === locale)
    ) ?? null
  );
}

interface ResourcesResult {
  currentResource: Resource;
  adjacentResources: Resource[];
  totalFound: number;
}

/**
 * Retrieves a resource and its adjacent resources (always 2 max)
 * Automatically adapts : if not enough before, takes more after and vice versa
 *
 * @param slug - The slug of the resource
 * @param options - Options for the resource retrieval
 *
 * @returns Promise<ResourcesResult | null>
 *
 * @example
 * ```typescript
 * const resources = await getResourceWithAdjacent("my-resource-slug", { locale: "en" });
 * ```
 * // Returns the resource with slug "my-resource-slug" and its adjacent resources
 */
export async function getResourceWithAdjacent(
  slug: string,
  options?: {
    locale?: string;
  }
): Promise<ResourcesResult | null> {
  const { locale } = options ?? {};
  // Filter by locale if specified
  const filteredResources = allResources.filter(
    (resource: Resource) => !locale || resource.locale === locale
  );

  // Sort by date (most recent first)
  const sortedResources = filteredResources.sort((a, b) => b.id - a.id);

  // Find the current resource
  const currentIndex = sortedResources.findIndex(
    (resource: Resource) => resource.slug === slug
  );

  if (currentIndex === -1) {
    return null;
  }

  const currentResource = sortedResources[currentIndex];

  // Intelligent logic to always have 2 resources
  const availableBefore = currentIndex;
  const availableAfter = sortedResources.length - currentIndex - 1;
  const totalWanted = 2;

  let beforeCount = 1; // Preference: 1 before, 1 after
  let afterCount = 1;

  // Automatic adaptation
  if (availableBefore === 0) {
    // First resource -> take 2 after
    beforeCount = 0;
    afterCount = Math.min(2, availableAfter);
  } else if (availableAfter === 0) {
    // Last resource -> take 2 before
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

  // Retrieve the resources
  const beforeResources =
    beforeCount > 0
      ? sortedResources.slice(currentIndex - beforeCount, currentIndex)
      : [];

  const afterResources =
    afterCount > 0
      ? sortedResources.slice(currentIndex + 1, currentIndex + 1 + afterCount)
      : [];

  // Combine in chronological order
  const adjacentResources = [...beforeResources, ...afterResources];

  return {
    currentResource,
    adjacentResources,
    totalFound: adjacentResources.length,
  };
}

type GetAllResourceSlugsOptions = {
  published?: boolean;
  locale?: string;
  sort?: "asc" | "desc";
  limit?: number;
};

export async function getAllResourceSlugs(
  options: Partial<GetAllResourceSlugsOptions> = {}
): Promise<string[]> {
  const { published, locale, sort, limit } = {
    published: true,
    locale: undefined,
    sort: "desc",
    limit: Number.MAX_SAFE_INTEGER,
    ...options,
  };
  return Promise.resolve(
    allResources
      .filter(
        (resource) =>
          resource.published === published &&
          (!locale || resource.locale === locale)
      )
      .sort((a, b) => (sort === "asc" ? a.id - b.id : b.id - a.id))
      .map((resource) => resource.slug)
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
 * Get filtered resources
 *
 * @param options - Filter options
 *
 * @returns Promise<Resource[]>
 *
 * @example
 * ```typescript
 * const resources = await getFilteredResources({ category: "technology" });
 * ```
 * // Returns all resources filtered by category "technology"
 */
export async function getFilteredResources(
  options: FilterOptions = { published: undefined, locale: undefined }
): Promise<Resource[]> {
  const resources = await getAllResources({
    published: options.published,
    locale: options.locale,
  });
  return Promise.resolve(
    resources.filter((resource) => {
      // Filter by tag
      if (
        options.tag &&
        !resource.tags.find((tag) => tag.slug === options.tag)
      ) {
        return false;
      }

      // Filter by search
      if (options.search) {
        const searchLower = options.search.toLowerCase();
        const titleMatch = resource.title.toLowerCase().includes(searchLower);
        const contentMatch =
          resource.excerpt?.toLowerCase().includes(searchLower) || false;

        if (!titleMatch && !contentMatch) {
          return false;
        }
      }

      return true;
    })
  );
}

/**
 * Get all tags
 *
 * @returns Promise<string[]>
 *
 * @example
 * ```typescript
 * const tags = await getAllResourceTags();
 * ```
 * // Returns all unique tags from all resources
 */
export async function getAllResourceTags(): Promise<string[]> {
  const allTags = allResources.flatMap((resource) =>
    resource.tags.map((tag) => tag.slug)
  );
  return Promise.resolve([...new Set(allTags)]);
}
