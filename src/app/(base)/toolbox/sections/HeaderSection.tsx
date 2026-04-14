"use client";
import React from "react";
import { PageHero } from "@/components/shared/pages/shared/page-hero";
import { routes } from "@/data/routes";
import { useTranslations, useLocale } from "use-intl";
import { usePageViews } from "@/hooks/usePageViews";
import { getPathUrl } from "@/utils/base-url";

export function HeaderSection() {
  const t = useTranslations();
  const locale = useLocale();

  usePageViews(
    routes.toolbox.key,
    undefined,
    {
      locale: locale,
      path: getPathUrl(routes.toolbox.link),
    },
    false,
  );

  return (
    <PageHero
      title={t("toolbox.page.header-section.title")}
      description={t("toolbox.page.header-section.description")}
      badge={t("toolbox.page.header-section.badge")}
      imagePath={{ emoji: "🛠️" }}
      isMobileShowed
    />
  );
}
