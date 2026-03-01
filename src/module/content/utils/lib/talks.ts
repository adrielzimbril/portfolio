import { allTalks } from "content-collections";

export type Talk = (typeof allTalks)[number];

type Options = {
  published?: boolean;
  locale?: string;
  pageSlug?: string;
  sort?: "asc" | "desc";
  limit?: number;
};

export async function getAllTalks(
  options: Partial<Options> = {}
): Promise<Talk[]> {
  const { published, locale, pageSlug, sort, limit } = {
    published: true,
    locale: undefined,
    pageSlug: undefined,
    sort: "desc",
    limit: Number.MAX_SAFE_INTEGER,
    ...options,
  };

  return Promise.resolve(
    allTalks
      .filter(
        (item) => item.published === published && (!locale || item.locale === locale)
      )
      .sort((a, b) => (sort === "asc" ? a.id - b.id : b.id - a.id))
      .filter((item) => item.slug !== pageSlug)
      .slice(0, limit)
  );
}
