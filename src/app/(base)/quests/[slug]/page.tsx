import React from "react";
import { HeaderSection } from "@/app/(base)/quests/[slug]/sections/HeaderSection";
import { QuestDetailsSection } from "@/app/(base)/quests/[slug]/sections/QuestDetailsSection";
import { CallToAction } from "@/components/shared/pages/shared/call-to-action";
import { ReactionBar } from "@/components/shared/reactions/ReactionBar";
import { PageType, PageParams } from "@/types";
import { getLocale, getTranslations } from "next-intl/server";
import { localeRedirect } from "@/integrations/i18n/routing";
import { routes } from "@/data/routes";
import { getImageUrl } from "@/utils/base-url";
import { Metadata } from "next";
import { DEFAULT_COLOR_CODE_NAME } from "@/types";
import { metadata as baseMetadata } from "@/app/metadata";
import { Skeleton } from "@/components/ui/skeleton";
import {
  getQuestWithAdjacent,
  getQuestBySlug,
  isRegistrationClosed,
  isSubmissionClosed,
  isResultsPublished,
} from "@/integrations/content/lib/quests";
import { QuestParticipantsSection } from "@/app/(base)/quests/[slug]/sections/QuestParticipantsSection";
import { MorePreviewSection } from "@/app/(base)/quests/[slug]/sections/MorePreviewSection";

export async function generateMetadata(props: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const locale = await getLocale();
  const quest = await getQuestBySlug(slug, { locale });

  const metadata: Metadata = {
    title: quest?.title,
    description: quest?.excerpt,
    openGraph: {
      ...baseMetadata.openGraph,
      title: quest?.title,
      description: quest?.excerpt,
      images: [getImageUrl(quest?.cover ?? "opengraph-image.png")],
    },
    twitter: {
      ...baseMetadata.twitter,
      title: quest?.title,
      description: quest?.excerpt,
      images: [getImageUrl(quest?.cover ?? "opengraph-image.png")],
    },
  };

  return metadata;
}

export default async function SubShop(props: { params: Promise<PageParams> }) {
  const { slug } = await props.params;
  const locale = await getLocale();
  const t = await getTranslations();
  const quest = await getQuestWithAdjacent(slug, { locale });

  if (!quest) {
    return localeRedirect({ href: routes.quests.link, locale });
  }

  const {
    title,
    cover,
    body,
    excerpt,
    registration_deadline,
    submission_deadline,
    quest_end,
    results_published,
    rewards,
    winners,
  } = quest.currentQuest;

  const registrationClosed = isRegistrationClosed(registration_deadline);
  const submissionClosed = isSubmissionClosed(submission_deadline, quest_end);
  const resultsPublished = isResultsPublished(quest_end, results_published);

  const tags: {
    name: string;
    meta: {
      [key: string]: any;
    };
  }[] = [
    {
      name: t(
        registrationClosed
          ? "quests.cards.tags.registration.closed"
          : "quests.cards.tags.registration.open",
      ),
      meta: {
        color: registrationClosed
          ? DEFAULT_COLOR_CODE_NAME.RED
          : DEFAULT_COLOR_CODE_NAME.PURPLE,
      },
    },
    {
      name: t(
        submissionClosed
          ? "quests.cards.tags.submission.closed"
          : "quests.cards.tags.submission.open",
      ),
      meta: {
        color: submissionClosed
          ? DEFAULT_COLOR_CODE_NAME.ORANGE
          : DEFAULT_COLOR_CODE_NAME.BLUE,
      },
    },
    {
      name: t(
        resultsPublished
          ? "quests.cards.tags.results.published"
          : "quests.cards.tags.results.upcoming",
      ),
      meta: {
        color: DEFAULT_COLOR_CODE_NAME.WHITE_GOLD,
      },
    },
  ];

  const dates: {
    registration_end: string;
    submission_end: string;
    results: string;
  } = {
    registration_end: registration_deadline,
    submission_end: submission_deadline,
    results: quest_end,
  };

  return (
    <>
      <Skeleton name="quest-detail-header" loading={false}>
        <HeaderSection
          title={title}
          cover={cover ?? ""}
          description={excerpt}
          dates={dates}
          pageViewsData={{ slug, locale }}
          tags={tags.map((tag) => ({
            name: tag.name,
            color: tag.meta.color as any,
          }))}
        />
      </Skeleton>
      <Skeleton name="quest-detail-content" loading={false}>
        <QuestDetailsSection
          content={body || ""}
          slug={slug}
          dates={dates}
          tags={tags}
          rewards={rewards}
        />
          <ReactionBar 
            pageType={PageType.QUESTS} 
            entityId={slug} 
            variant="inline" 
            className="max-w-4xl mx-auto my-12" 
          />
      </Skeleton>
      {isResultsPublished(quest_end, results_published) && (
        <Skeleton name="quest-detail-participants" loading={false}>
          <QuestParticipantsSection winners={winners} />
        </Skeleton>
      )}
      <Skeleton name="quest-detail-more" loading={false}>
          <MorePreviewSection data={quest.adjacentQuests} />
      </Skeleton>
    </>
  );
}
