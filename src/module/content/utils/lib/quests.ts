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
      .filter((item) => item.published === published)
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
      (quest) => quest.slug === slug && quest.published === true,
    ) ?? null,
  );
}

interface QuestsResult {
  currentQuest: Quest;
  adjacentQuests: Quest[];
  totalFound: number;
}

/**
 * Retrieves a quest and its adjacent quests (always 2 max)
 * Automatically adapts : if not enough before, takes more after and vice versa
 *
 * @param slug - The slug of the quest
 * @param options - Options for the quest retrieval
 *
 * @returns Promise<QuestsResult | null>
 *
 * @example
 * ```typescript
 * const quests = await getQuestWithAdjacent("my-quest-slug", { locale: "fr" });
 * ```
 * // Returns the quest with slug "my-quest-slug" and its adjacent quests
 */
export async function getQuestWithAdjacent(
  slug: string,
  options?: {
    locale?: string;
  },
): Promise<QuestsResult | null> {
  const { locale } = options ?? {};
  // Filter by locale if specified
  const filteredQuests = allQuests.filter(
    //(quest: Quest) => !locale || quest.locale === locale,
    (quest: Quest) => quest.published === true,
  );

  const now = new Date();

  // Sort by date (most recent first)
  const sortedQuests = filteredQuests.sort((a, b) => {
    const inscriptionA = new Date(a.registration_deadline);
    const submissionA = new Date(a.submission_deadline);
    const resultsA = new Date(a.quest_end);

    const inscriptionB = new Date(b.registration_deadline);
    const submissionB = new Date(b.submission_deadline);
    const resultsB = new Date(b.quest_end);

    // Categorize items
    const getStatus = (inscription: Date, submission: Date, results: Date) => {
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
  });

  // Find the current quest
  const currentIndex = sortedQuests.findIndex(
    (quest: Quest) => quest.slug === slug,
  );

  if (currentIndex === -1) {
    return null;
  }

  const currentQuest = sortedQuests[currentIndex]!;

  // Intelligent logic to always have 2 quests
  const availableBefore = currentIndex;
  const availableAfter = sortedQuests.length - currentIndex - 1;
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

  // Retrieve the quests
  const beforeQuests =
    beforeCount > 0
      ? sortedQuests.slice(currentIndex - beforeCount, currentIndex)
      : [];

  const afterQuests =
    afterCount > 0
      ? sortedQuests.slice(currentIndex + 1, currentIndex + 1 + afterCount)
      : [];

  // Combine in chronological order
  const adjacentQuests = [...beforeQuests, ...afterQuests];

  return {
    currentQuest: currentQuest,
    adjacentQuests: adjacentQuests,
    totalFound: adjacentQuests.length,
  };
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

export function isResultsPublished(
  questEnd: string,
  resultsPublished: boolean,
): boolean {
  return resultsPublished && Date.now() > new Date(questEnd).getTime();
}
