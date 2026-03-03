"use client";

import React from "react";
import { PageHero } from "@/components/shared/pages/shared/page-hero";
import { useLocale } from "use-intl";
import { usePageViews } from "@/hooks/usePageViews";
import { routes } from "@/data/routes";
import { getPathUrl } from "@/utils";

export function HeaderSection() {
  const locale = useLocale();
  usePageViews(
    routes.quests.key,
    undefined,
    { locale, path: getPathUrl(routes.quests.link) },
    false,
  );

  return (
    <PageHero
      title="Challenges 🏆"
      description="Mes challenges en cours et passes: brief, recompenses, participants, gagnants et soumissions."
      isMobileShowed
      imagePath={{ emoji: "🏆" }}
      actionButton
    />
  );
}
