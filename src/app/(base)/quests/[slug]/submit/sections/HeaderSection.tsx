"use client";
import React from "react";
import { PageHero } from "@/components/shared/pages/shared/page-hero";
import { useLocale, useTranslations } from "use-intl";
import { usePageViews } from "@/hooks/usePageViews";
import { routes } from "@/data/routes";
import { getPathUrl } from "@/utils/base-url";

export function HeaderSection({
  title,
  actionButton,
  buttonLink,
  buttonText,
}: {
  title: string;
  actionButton?: boolean;
  buttonLink?: string;
  buttonText?: string;
}) {
  const t = useTranslations();
  const locale = useLocale();

  usePageViews(
    routes.submit.key,
    undefined,
    { locale, path: getPathUrl(routes.submit.link) },
    false,
  );

  return (
    <PageHero
      title={title}
      description={t("quests.submit.hero.description")}
      badge={t("quests.submit.hero.badge")}
      imagePath={{ emoji: "🏆" }}
      isMobileShowed
      actionButton={actionButton}
      buttonLink={buttonLink}
      buttonText={buttonText}
    />
  );
}
