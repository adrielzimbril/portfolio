"use client";
import React from "react";
import { PageHero } from "@/components/shared/pages/shared/page-hero";
import { useTranslations, useLocale } from "use-intl";
import { usePageViews } from "@/hooks/usePageViews";
import { routes } from "@/data/routes";
import { getPathUrl } from "@/utils/base-url";

export function HeaderSection() {
  const t = useTranslations();
  const locale = useLocale();
  usePageViews(
    routes.projects.key,
    undefined,
    { locale: locale, path: getPathUrl(routes.projects.link) },
    false
  );

  return (
    <PageHero
      title={t("projects.page.header-section.title")}
      description={t("projects.page.header-section.description")}
      //buttonLink={routes.hub.link}
      //buttonText={t("projects.page.header-section.cta")}
      //imagePath={getImageUrl(getEmojiHub("🧑🏻‍🎨", "fluent", "anim"))}
      isMobileShowed
      imagePath={{ emoji: "🧑🏻‍🚀" }}
      actionButton
    />
  );
}
