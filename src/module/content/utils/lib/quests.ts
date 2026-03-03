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

  const now = new Date();
  
  return Promise.resolve(
    allQuests
      .filter(
        (item) =>
          item.published === published && (!locale || item.locale === locale),
      )
      .sort((a, b) => {
        const inscriptionA = new Date(a.registration_deadline);
        const submissionA = new Date(a.submission_deadline);
        const resultsA = new Date(a.quest_end);

        const inscriptionB = new Date(b.registration_deadline);
        const submissionB = new Date(b.submission_deadline);
        const resultsB = new Date(b.quest_end);

        // Categorize items
        const getStatus = (
          inscription: Date,
          submission: Date,
          results: Date,
        ) => {
          // Priority: Ongoing (0) > Upcoming (1) > In Submission (1.5) > Past (2)
          if (now < inscription) return { priority: 1, date: inscription }; // upcoming
          if (now < submission) return { priority: 0, date: inscription }; // ongoing - sort by end of registration
          if (now < results) return { priority: 1.5, date: submission }; // in submission - then by submission
          return { priority: 2, date: results }; // past
        };

        const statusA = getStatus(inscriptionA, submissionA, resultsA);
        const statusB = getStatus(inscriptionB, submissionB, resultsB);

        // Sort by priority first, then by date
        if (statusA.priority !== statusB.priority) {
          return statusA.priority - statusB.priority;
        }

        // In the same category, sort by date (the closest first)
        return statusA.date.getTime() - statusB.date.getTime();
      })
      .filter((item) => item.slug !== pageSlug)
      .slice(0, limit),
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

export function isRegistrationClosed(registrationDeadline: string): boolean {
  return Date.now() > new Date(registrationDeadline).getTime();
}

export function isSubmissionClosed(
  submissionDeadline: string,
  questEnd: string
): boolean {
  const now = Date.now();
  return (
    now > new Date(submissionDeadline).getTime() ||
    now > new Date(questEnd).getTime()
  );
}

export function isResultsPublished(questEnd: string): boolean {
  return Date.now() > new Date(questEnd).getTime();
}
