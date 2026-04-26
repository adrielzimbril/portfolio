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
    routes.connections.key,
    undefined,
    {
      locale: locale,
      path: getPathUrl(routes.connections.link),
    },
    false,
  );

  return (
    <PageHero
      title={t("connections.page.header-section.title")}
      description={t("connections.page.header-section.description")}
      imagePath={{ emoji: "🔗" }}
      isMobileShowed
    />
  );
}
