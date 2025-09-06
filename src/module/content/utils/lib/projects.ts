import type { Project } from "@/module/content/types/types";
import { allProjects } from "content-collections";

type GetAllProjectsOptions = {
  published?: boolean;
  locale?: string;
  pageSlug?: string;
  sort?: "asc" | "desc";
  limit?: number;
};

export async function getAllProjects(
  options: GetAllProjectsOptions = {
    published: true,
    locale: undefined,
    pageSlug: undefined,
    sort: "desc",
    limit: Number.MAX_SAFE_INTEGER,
  }
): Promise<Project[]> {
  const { published, locale, pageSlug, sort, limit } = options;
  return Promise.resolve(
    allProjects
      .filter(
        (project) =>
          project.published === published &&
          (!locale || project.locale === locale)
      )
      .sort((a, b) =>
        sort === "asc"
          ? a.created_at.localeCompare(b.created_at)
          : b.created_at.localeCompare(a.created_at)
      )
      .filter((project) => project.slug !== pageSlug)
      .slice(0, limit)
  );
}

export async function getProjectBySlug(
  slug: string,
  options?: {
    locale?: string;
  }
): Promise<Project | null> {
  const { locale } = options ?? {};

  return Promise.resolve(
    allProjects.find(
      (project: Project) =>
        project.slug === slug && (!locale || project.locale === locale)
    ) ?? null
  );
}

interface ProjectsResult {
  currentProject: Project;
  adjacentProjects: Project[];
  totalFound: number;
}

/**
 * Retrieves a project and its adjacent projects (always 2 max)
 * Automatically adapts : if not enough before, takes more after and vice versa
 *
 * @param slug - The slug of the project
 * @param options - Options for the project retrieval
 *
 * @returns Promise<ProjectsResult | null>
 *
 * @example
 * ```typescript
 * const projects = await getProjectWithAdjacent("my-project-slug", { locale: "en" });
 * ```
 * // Returns the project with slug "my-project-slug" and its adjacent projects
 */
export async function getProjectWithAdjacent(
  slug: string,
  options?: {
    locale?: string;
  }
): Promise<ProjectsResult | null> {
  const { locale } = options ?? {};
  // Filter by locale if specified
  const filteredProjects = allProjects.filter(
    (project: Project) => !locale || project.locale === locale
  );

  // Sort by date (most recent first)
  const sortedProjects = filteredProjects.sort(
    (a, b) =>
      new Date(b.created_at || "").getTime() -
      new Date(a.created_at || "").getTime()
  );

  // Find the current project
  const currentIndex = sortedProjects.findIndex(
    (project: Project) => project.slug === slug
  );

  if (currentIndex === -1) {
    return null;
  }

  const currentProject = sortedProjects[currentIndex];

  // Intelligent logic to always have 2 projects
  const availableBefore = currentIndex;
  const availableAfter = sortedProjects.length - currentIndex - 1;
  const totalWanted = 2;

  let beforeCount = 1; // Preference: 1 before, 1 after
  let afterCount = 1;

  // Automatic adaptation
  if (availableBefore === 0) {
    // First project -> take 2 after
    beforeCount = 0;
    afterCount = Math.min(2, availableAfter);
  } else if (availableAfter === 0) {
    // Last project -> take 2 before
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

  // Retrieve the projects
  const beforeProjects =
    beforeCount > 0
      ? sortedProjects.slice(currentIndex - beforeCount, currentIndex)
      : [];

  const afterProjects =
    afterCount > 0
      ? sortedProjects.slice(currentIndex + 1, currentIndex + 1 + afterCount)
      : [];

  // Combine in chronological order
  const adjacentProjects = [...beforeProjects, ...afterProjects];

  return {
    currentProject,
    adjacentProjects,
    totalFound: adjacentProjects.length,
  };
}

type GetAllProjectSlugsOptions = {
  published?: boolean;
  locale?: string;
  sort?: "asc" | "desc";
  limit?: number;
};

export async function getAllProjectSlugs(
  options: GetAllProjectSlugsOptions = {
    published: true,
    locale: undefined,
    sort: "desc",
    limit: Number.MAX_SAFE_INTEGER,
  }
): Promise<string[]> {
  const { published, locale, sort, limit } = options;
  return Promise.resolve(
    allProjects
      .filter(
        (project) =>
          project.published === published &&
          (!locale || project.locale === locale)
      )
      .sort((a, b) =>
        sort === "asc"
          ? a.created_at.localeCompare(b.created_at)
          : b.created_at.localeCompare(a.created_at)
      )
      .map((project) => project.slug)
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
 * Get filtered projects
 *
 * @param options - Filter options
 *
 * @returns Promise<Project[]>
 *
 * @example
 * ```typescript
 * const projects = await getFilteredProjects({ category: "technology" });
 * ```
 * // Returns all projects filtered by category "technology"
 */
export async function getFilteredProjects(
  options: FilterOptions = { published: undefined, locale: undefined }
): Promise<Project[]> {
  const projects = await getAllProjects({
    published: options.published,
    locale: options.locale,
  });
  return Promise.resolve(
    projects.filter((project) => {
      // Filter by category
      if (
        options.category &&
        project.categories.find((cat) => cat.slug === options.category)
      ) {
        return false;
      }

      // Filter by tag
      if (
        options.tag &&
        !project.tags.find((tag) => tag.slug === options.tag)
      ) {
        return false;
      }

      // Filter by search
      if (options.search) {
        const searchLower = options.search.toLowerCase();
        const titleMatch = project.title.toLowerCase().includes(searchLower);
        const contentMatch =
          project.excerpt?.toLowerCase().includes(searchLower) || false;

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
 * const categories = await getAllProjectCategories();
 * ```
 */
export async function getAllProjectCategories(): Promise<string[]> {
  const categories = allProjects.map((project) =>
    project.categories.map((cat) => cat.slug)
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
 * const tags = await getAllProjectTags();
 * ```
 * // Returns all unique tags from all projects
 */
export async function getAllProjectTags(): Promise<string[]> {
  const allTags = allProjects.flatMap((project) =>
    project.tags.map((tag) => tag.slug)
  );
  return Promise.resolve([...new Set(allTags)]);
}
