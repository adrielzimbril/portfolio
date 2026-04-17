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
    routes.changelog.key,
    undefined,
    {
      locale: locale,
      path: getPathUrl(routes.changelog.link),
    },
    false,
  );

  return (
    <PageHero
      title={t("changelog.page.title")}
      description={t("changelog.page.description")}
      imagePath={{ emoji: "📝" }}
      isMobileShowed
    />
  );
}
