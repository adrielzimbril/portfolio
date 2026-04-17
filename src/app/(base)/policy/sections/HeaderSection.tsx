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
    routes.policy.key,
    undefined,
    {
      locale: locale,
      path: getPathUrl(routes.policy.link),
    },
    false,
  );

  return (
    <PageHero
      title={t("policy.page.title")}
      description={t("policy.page.description")}
      imagePath={{ emoji: "📜" }}
      isMobileShowed
    />
  );
}
