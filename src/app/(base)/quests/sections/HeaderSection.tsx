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
      title="Challenges des créatifs 🎖️"
      description="Repousse tes limites et remporte des récompenses. Intègre le top 3 et sois affiché en vedette sur le site, termine premier et ton travail sera partagé en exclusivité sur mes réseaux."
      isMobileShowed
      imagePath={{ emoji: "🏆" }}
      actionButton
    />
  );
}
