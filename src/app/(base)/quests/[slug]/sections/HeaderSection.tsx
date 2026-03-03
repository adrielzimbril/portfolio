"use client";
import React from "react";
import { HeaderSection as QuestHeaderSection } from "@/components/shared/pages/quests/page/header-section";
import { PreviewContentType } from "@/types";
import { useTranslations } from "use-intl";
import { getQuestAskUrl } from "@/utils/base-url";
import { QuestAskType } from "@/types/enum";
import {
  isRegistrationClosed,
  isSubmissionClosed,
} from "@/module/content/utils/lib";

export function HeaderSection({
  title,
  slug,
  cover,
  description,
  dates,
  tags,
  //pageViewsData,
}: {
  title: string;
  slug: string;
  cover: string;
  description: string;
  dates: {
    registration_end: string;
    submission_end: string;
    results: string;
  };
  tags?: { name: string; color: string }[];
  //pageViewsData: { slug: string; locale: string };
}) {
  const t = useTranslations();

  // usePageViews(
  //   pageViewsData.slug,
  //   PageType.HUB,
  //   {
  //     locale: pageViewsData.locale,
  //     path: getResourcesUrl(PageType.HUB, pageViewsData.slug),
  //   },
  //   false
  // );

  return (
    <QuestHeaderSection
      sectionClassName="md:w-[90%] mx-auto"
      previewContent={
        cover
          ? {
              type: PreviewContentType.IMAGE,
              src: cover,
              alt: title,
            }
          : {
              type: PreviewContentType.TEXT,
              emoji: "🏆",
              title: title,
              subtitle: description,
            }
      }
      mainTitle={title}
      slug={slug}
      description={description}
      tags={tags}
      ctaButton={
        !isRegistrationClosed(dates.registration_end)
          ? getQuestAskUrl(slug, QuestAskType.ENROLL)
          : !isSubmissionClosed(dates.submission_end, dates.results)
            ? getQuestAskUrl(slug, QuestAskType.SUBMIT)
            : undefined
      }
      ctaButtonText={`${!isRegistrationClosed(dates.registration_end) ? "Participer" : !isSubmissionClosed(dates.submission_end, dates.results) ? "Soumettre mon travail" : ""} 🦄`}
    />
  );
}
