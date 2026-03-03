"use client";
import React from "react";
import { HeaderSection as QuestHeaderSection } from "@/components/shared/pages/quests/page/header-section";
import { PreviewContentType } from "@/types";
import { ResourceType } from "@/types/enum";
import { usePageViews } from "@/hooks/usePageViews";
import { PageType } from "@/types";
import { getResourcesUrl } from "@/utils/base-url";
import { useTranslations } from "use-intl";
import { getQuestAskUrl } from "@/utils/base-url";
import { QuestAskType } from "@/types/enum";

export function HeaderSection({
  title,
  slug,
  cover,
  description,
  tags,
  //pageViewsData,
}: {
  title: string;
  slug: string;
  cover: string;
  description: string;
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
      ctaButton={getQuestAskUrl(slug, QuestAskType.ENROLL)}
      ctaButtonText={`${t("common.button.participate")} 🦄`}
    />
  );
}
