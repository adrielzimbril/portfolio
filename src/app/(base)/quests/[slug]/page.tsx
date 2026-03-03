import React from "react";
import { HeaderSection } from "./sections/HeaderSection";
import { QuestDetailsSection } from "./sections/QuestDetailsSection";
import { CallToAction } from "@/components/shared/pages/shared/call-to-action";
import { getLocale } from "next-intl/server";
import { PageParams } from "@/types";
import { localeRedirect } from "@/module/i18n/routing";
import { routes } from "@/data/routes";
import { getImageUrl } from "@/utils";
import { Metadata } from "next";
import { DEFAULT_COLOR_CODE_NAME_LIST } from "@/types";
import { metadata as baseMetadata } from "@/app/metadata";
import {
  getQuestWithAdjacent,
  getQuestBySlug,
  isRegistrationClosed,
  isSubmissionClosed,
  isResultsPublished,
} from "@/module/content/utils/lib/quests";
import { QuestParticipantsSection } from "./sections/QuestParticipantsSection";
import { MorePreviewSection } from "./sections/MorePreviewSection";

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
      images: [
        getImageUrl(quest?.cover ?? ""),
        getImageUrl("opengraph-image.png"),
      ],
    },
    twitter: {
      ...baseMetadata.twitter,
      title: quest?.title,
      description: quest?.excerpt,
      images: [
        getImageUrl(quest?.cover ?? ""),
        getImageUrl("opengraph-image.png"),
      ],
    },
  };

  return metadata;
}

export default async function SubShop(props: { params: Promise<PageParams> }) {
  const { slug } = await props.params;
  const locale = await getLocale();
  const quest = await getQuestWithAdjacent(slug, { locale });

  if (!quest) {
    return localeRedirect({ href: routes.hub.link, locale });
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
      name: `Inscriptions ${registrationClosed ? "cloturees" : "ouvertes"}`,
      meta: {
        color: registrationClosed
          ? DEFAULT_COLOR_CODE_NAME_LIST.RED
          : DEFAULT_COLOR_CODE_NAME_LIST.PURPLE,
      },
    },
    {
      name: `Soumissions ${submissionClosed ? "cloturees" : "ouvertes"}`,
      meta: {
        color: submissionClosed
          ? DEFAULT_COLOR_CODE_NAME_LIST.ORANGE
          : DEFAULT_COLOR_CODE_NAME_LIST.BLUE,
      },
    },
    {
      name: `Résultats ${resultsPublished ? "publiés" : "à venir"}`,
      meta: {
        color: DEFAULT_COLOR_CODE_NAME_LIST.WHITE_GOLD,
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
      <HeaderSection
        title={title}
        slug={slug}
        cover={cover ?? ""}
        description={excerpt}
        dates={dates}
        tags={tags.map((tag) => ({
          name: tag.name,
          color: tag.meta.color as any,
        }))}
      />
      <QuestDetailsSection
        content={body || ""}
        slug={slug}
        dates={dates}
        tags={tags}
      />
      {isResultsPublished(quest_end, results_published) && (
        <QuestParticipantsSection questSlug={slug} />
      )}
      {quest!.adjacentQuests.length > 0 && (
        <MorePreviewSection data={quest!.adjacentQuests} />
      )}
      <CallToAction isPage />
    </>
  );
}
