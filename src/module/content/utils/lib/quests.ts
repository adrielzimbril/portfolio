import { allQuests } from "content-collections";

export type Quest = (typeof allQuests)[number];

type Options = {
  published?: boolean;
  locale?: string;
  pageSlug?: string;
  sort?: "asc" | "desc";
  limit?: number;
};

export async function getAllQuests(
  options: Partial<Options> = {}
): Promise<Quest[]> {
  const { published, locale, pageSlug, sort, limit } = {
    published: true,
    locale: undefined,
    pageSlug: undefined,
    sort: "desc",
    limit: Number.MAX_SAFE_INTEGER,
    ...options,
  };

  return Promise.resolve(
    allQuests
      .filter(
        (item) => item.published === published && (!locale || item.locale === locale)
      )
      .sort((a, b) => (sort === "asc" ? a.id - b.id : b.id - a.id))
      .filter((item) => item.slug !== pageSlug)
      .slice(0, limit)
  );
}

export async function getQuestBySlug(
  slug: string,
  options?: { locale?: string }
): Promise<Quest | null> {
  const { locale } = options ?? {};
  return Promise.resolve(
    allQuests.find(
      (item) => item.slug === slug && (!locale || item.locale === locale)
    ) ?? null
  );
}

export function isRegistrationClosed(quest: Quest): boolean {
  return Date.now() > new Date(quest.registration_deadline).getTime();
}

export function isSubmissionClosed(quest: Quest): boolean {
  const now = Date.now();
  return (
    now > new Date(quest.submission_deadline).getTime() ||
    now > new Date(quest.challenge_end).getTime()
  );
}
