"use client";
import React from "react";
import { PageHero } from "@/components/shared/pages/shared/page-hero";
import { useTranslations, useLocale } from "use-intl";
import { usePageViews } from "@/hooks/usePageViews";
import { routes } from "@/data/routes";
import { getPathUrl } from "@/utils";

export function HeaderSection({ title }: { title: string }) {
  const t = useTranslations();
  const locale = useLocale();
  usePageViews(
    routes.submit.key,
    undefined,
    { locale: locale, path: getPathUrl(routes.submit.link) },
    false,
  );

  return (
    <PageHero
      title={title}
      description="Soumets ton travail ici, pour confirmer ta participation, et qui sait tu pourrais faire partie du prochain trio gagnant 😏"
      badge="Participe au challenge 🧪"
      imagePath={{ emoji: "🏆" }}
      isMobileShowed
      actionButton
    />
  );
}
