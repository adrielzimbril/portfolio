"use client";

import { PageHero } from "@/components/shared/pages/shared/page-hero";
import { routes } from "@/data/routes";
import { usePageViews } from "@/hooks/usePageViews";
import { getPathUrl } from "@/utils";
import { useLocale } from "use-intl";

export function QuestsHeaderSection() {
  const locale = useLocale();

  usePageViews(
    routes.quests.key,
    undefined,
    { locale, path: getPathUrl(routes.quests.link) },
    false
  );

  return (
    <PageHero
      title="Quests"
      description="Mes quests en cours et passés: brief, récompenses, participants, gagnants et soumissions."
      badge="Build in public"
      imagePath={{ emoji: "🏆" }}
      isMobileShowed
    />
  );
}

