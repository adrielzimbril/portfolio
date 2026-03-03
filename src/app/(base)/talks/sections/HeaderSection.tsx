"use client";
import React from "react";
import { PageHero } from "@/components/shared/pages/shared/page-hero";
import { useTranslations, useLocale } from "use-intl";
import { usePageViews } from "@/hooks/usePageViews";
import { routes } from "@/data/routes";
import { getPathUrl } from "@/utils";

export function HeaderSection() {
  const t = useTranslations();
  const locale = useLocale();

  usePageViews(
    routes.talks.key,
    undefined,
    { locale, path: getPathUrl(routes.talks.link) },
    false,
  );

  return (
    <PageHero
      title={t("talks.page.header-section.title")}
      description={t("talks.page.header-section.description")}
      isMobileShowed
      imagePath={{ emoji: "🎤" }}
      actionButton
    />
  );
}
