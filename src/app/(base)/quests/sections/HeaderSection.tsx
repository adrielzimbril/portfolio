"use client";
import React from "react";
import { PageHero } from "@/components/shared/pages/shared/page-hero";
import { useLocale, useTranslations } from "use-intl";
import { usePageViews } from "@/hooks/usePageViews";
import { routes } from "@/data/routes";
import { getPathUrl } from "@/utils/base-url";

export function HeaderSection() {
  const t = useTranslations();
  const locale = useLocale();

  usePageViews(
    routes.quests.key,
    undefined,
    { locale, path: getPathUrl(routes.quests.link) },
    false,
  );

  return (
    <PageHero
      title={t("quests.page.header-section.title")}
      description={t("quests.page.header-section.description")}
      isMobileShowed
      imagePath={{ emoji: "🏆" }}
      actionButton
    />
  );
}
