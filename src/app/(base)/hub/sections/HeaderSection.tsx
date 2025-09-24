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
    routes.hub.key,
    undefined,
    {
      locale: locale,
      path: getPathUrl(routes.hub.link),
    },
    false
  );

  return (
    <PageHero
      title={t("hub.page.header-section.title")}
      description={t("hub.page.header-section.description")}
      //buttonLink={routes.hub.link}
      //buttonText={t("hub.page.header-section.cta")}
      //imagePath={getImageUrl(getEmojiHub("🧑🏻‍🎨", "fluent", "anim"))}
      imagePath={{ emoji: "🧑🏻‍🎨" }}
      actionButton
    />
  );
}
