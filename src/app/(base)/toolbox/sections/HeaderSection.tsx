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
    routes.tools.key,
    undefined,
    {
      locale: locale,
      path: getPathUrl(routes.tools.link),
    },
    false,
  );

  return (
    <PageHero
      title={t("tools.page.header-section.title")}
      description={t("tools.page.header-section.description")}
      badge={t("tools.page.header-section.badge")}
      imagePath={{ emoji: "🛠️" }}
      isMobileShowed
    />
  );
}
