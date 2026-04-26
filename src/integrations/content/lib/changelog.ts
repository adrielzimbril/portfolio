import type { Changelog } from "@/integrations/content/types/types";
import { allChangelogs } from "content-collections";
import { ChangelogItemType, SortOrder } from "@/types/enum";

type GetAllChangelogOptions = {
  published?: boolean;
  locale?: string;
  sort?: SortOrder;
  limit?: number;
  type?: ChangelogItemType;
};

export async function getAllChangelog(
  options: Partial<GetAllChangelogOptions> = {},
): Promise<Changelog[]> {
  const { published, locale, sort, limit, type } = {
    published: true,
    locale: undefined,
    sort: SortOrder.DESC,
    limit: Number.MAX_SAFE_INTEGER,
    type: undefined,
    ...options,
  };
  return Promise.resolve(
    allChangelogs
      .filter(
        (entry) =>
          entry.published === published &&
          (!locale || entry.locale === locale) &&
          (!type || entry.type === type),
      )
      .sort((a, b) =>
        sort === SortOrder.ASC
          ? a.date.localeCompare(b.date)
          : b.date.localeCompare(a.date),
      )
      .slice(0, limit),
  );
}

export async function getChangelogByVersion(
  version: string,
  options?: {
    locale?: string;
  },
): Promise<Changelog | null> {
  const { locale } = options ?? {};

  return Promise.resolve(
    allChangelogs.find(
      (entry: Changelog) =>
        entry.version === version &&
        (!locale || entry.locale === locale) &&
        entry.published === true,
    ) ?? null,
  );
}

type FilterOptions = {
  type?: ChangelogItemType;
  search?: string;
  published?: boolean;
  locale?: string;
};

export async function getFilteredChangelog(
  options: FilterOptions = { published: undefined, locale: undefined },
): Promise<Changelog[]> {
  const entries = await getAllChangelog({
    published: options.published,
    locale: options.locale,
  });
  return Promise.resolve(
    entries.filter((entry) => {
      // Filter by type
      if (options.type && entry.type !== options.type) {
        return false;
      }

      // Filter by search
      if (options.search) {
        const searchLower = options.search.toLowerCase();
        const versionMatch = entry.version.toLowerCase().includes(searchLower);
        const bodyMatch =
          entry.body?.toLowerCase().includes(searchLower) || false;

        if (!versionMatch && !bodyMatch) {
          return false;
        }
      }

      return true;
    }),
  );
}

export async function getChangelogTypeCounts(
  options: { published?: boolean; locale?: string } = {},
): Promise<Record<string, number>> {
  const entries = await getAllChangelog(options);
  return Promise.resolve({
    all: entries.length,
    milestone: entries.filter((e) => e.type === ChangelogItemType.MILESTONE)
      .length,
    feature: entries.filter((e) => e.type === ChangelogItemType.FEATURE).length,
    fix: entries.filter((e) => e.type === ChangelogItemType.FIX).length,
    improvement: entries.filter((e) => e.type === ChangelogItemType.IMPROVEMENT)
      .length,
  });
}
