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
    routes.routes.key,
    undefined,
    {
      locale: locale,
      path: getPathUrl(routes.routes.link),
    },
    false,
  );

  return (
    <PageHero
      title={t("routes.page.title")}
      description={t("routes.page.description")}
      imagePath={{ emoji: "🗺️" }}
      isMobileShowed
    />
  );
}
