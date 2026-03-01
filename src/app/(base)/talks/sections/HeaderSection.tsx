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
    routes.thoughts.key,
    undefined,
    { locale: locale, path: getPathUrl(routes.thoughts.link) },
    false,
  );

  return (
    <PageHero
      title="Talks"
      description="Toutes les sessions talks: affiches, role, date et ressources."
      //buttonLink={routes.thoughts.link}
      //buttonText={t("thoughts.page.header-section.cta")}
      //imagePath={getImageUrl(getEmojiHub("🧑🏻‍🎨", "fluent", "anim"))}
      isMobileShowed
      imagePath={{ emoji: "🎤" }}
      actionButton
    />
  );
}
