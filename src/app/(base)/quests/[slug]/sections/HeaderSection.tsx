"use client";
import React from "react";
import { HeaderSection as QuestHeaderSection } from "@/components/shared/pages/quests/page/header-section";
import { PreviewContentType } from "@/types";
import { useTranslations, useLocale } from "use-intl";
import { getQuestAskUrl, getResourcesUrl } from "@/utils/base-url";
import { usePageViews } from "@/hooks/usePageViews";
import { PageType, QuestAskType } from "@/types/enum";
import {
  isRegistrationClosed,
  isSubmissionClosed,
} from "@/integrations/content/lib";

export function HeaderSection({
  title,
  cover,
  description,
  dates,
  tags,
  pageViewsData,
}: {
  title: string;
  cover: string;
  description: string;
  dates: {
    registration_end: string;
    submission_end: string;
    results: string;
  };
  tags?: { name: string; color: string }[];
  pageViewsData: { slug: string; locale: string };
}) {
  const t = useTranslations();
  const isRegistrationOpen = !isRegistrationClosed(dates.registration_end);
  const isSubmissionOpen = !isSubmissionClosed(
    dates.submission_end,
    dates.results,
  );

  usePageViews(
    pageViewsData.slug,
    PageType.QUESTS,
    {
      locale: pageViewsData.locale,
      path: getResourcesUrl(PageType.QUESTS, pageViewsData.slug),
    },
    false,
  );

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
              title,
              subtitle: description,
            }
      }
      mainTitle={title}
      slug={pageViewsData.slug}
      description={description}
      tags={tags}
      ctaButton={
        isRegistrationOpen
          ? getQuestAskUrl(pageViewsData.slug, QuestAskType.ENROLL)
          : isSubmissionOpen
            ? getQuestAskUrl(pageViewsData.slug, QuestAskType.SUBMIT)
            : undefined
      }
      ctaButtonText={`${
        isRegistrationOpen
          ? t("quests.cards.actions.participate")
          : isSubmissionOpen
            ? t("quests.inner-page.header.cta.submitWork")
            : ""
      } 🦄`}
      pageType={PageType.QUESTS}
    />
  );
}
