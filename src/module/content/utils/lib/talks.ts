import { allTalks } from "content-collections";

export type Talk = (typeof allTalks)[number];

type Options = {
  published?: boolean;
  locale?: string;
  pageSlug?: string;
  sort?: "asc" | "desc";
  limit?: number;
};

export async function getAllTalks(options: Partial<Options> = {}): Promise<Talk[]> {
  const { published, locale, pageSlug, sort, limit } = {
    published: true,
    locale: undefined,
    pageSlug: undefined,
    sort: "desc",
    limit: Number.MAX_SAFE_INTEGER,
    ...options,
  };

  const now = new Date();

  return Promise.resolve(
    allTalks
      .filter((item) => item.published === published)
      .sort((a, b) => {
        const dateA = new Date(a.event_date);
        const dateB = new Date(b.event_date);

        // Priority: Today > Future > Past
        // Separate future and past
        const aIsFuture = dateA >= now;
        const bIsFuture = dateB >= now;

        if (aIsFuture && !bIsFuture) return -1; // a first
        if (!aIsFuture && bIsFuture) return 1; // b first

        // In the same category, sort by proximity and then by date (closest first)
        return (
          Math.abs(dateA.getTime() - now.getTime()) -
          Math.abs(dateB.getTime() - now.getTime())
        );
      })
      .filter((item) => item.slug !== pageSlug)
      .slice(0, limit),
  );
}