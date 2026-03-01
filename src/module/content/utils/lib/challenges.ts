import { allChallenges } from "content-collections";

export type Challenge = (typeof allChallenges)[number];

type Options = {
  published?: boolean;
  locale?: string;
  pageSlug?: string;
  sort?: "asc" | "desc";
  limit?: number;
};

export async function getAllChallenges(
  options: Partial<Options> = {}
): Promise<Challenge[]> {
  const { published, locale, pageSlug, sort, limit } = {
    published: true,
    locale: undefined,
    pageSlug: undefined,
    sort: "desc",
    limit: Number.MAX_SAFE_INTEGER,
    ...options,
  };

  return Promise.resolve(
    allChallenges
      .filter(
        (item) => item.published === published && (!locale || item.locale === locale)
      )
      .sort((a, b) => (sort === "asc" ? a.id - b.id : b.id - a.id))
      .filter((item) => item.slug !== pageSlug)
      .slice(0, limit)
  );
}

export async function getChallengeBySlug(
  slug: string,
  options?: { locale?: string }
): Promise<Challenge | null> {
  const { locale } = options ?? {};
  return Promise.resolve(
    allChallenges.find(
      (item) => item.slug === slug && (!locale || item.locale === locale)
    ) ?? null
  );
}

export function isRegistrationClosed(challenge: Challenge): boolean {
  return Date.now() > new Date(challenge.registration_deadline).getTime();
}

export function isSubmissionClosed(challenge: Challenge): boolean {
  const now = Date.now();
  return (
    now > new Date(challenge.submission_deadline).getTime() ||
    now > new Date(challenge.challenge_end).getTime()
  );
}

