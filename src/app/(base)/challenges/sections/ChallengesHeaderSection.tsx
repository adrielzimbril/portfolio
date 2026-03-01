"use client";

import { PageHero } from "@/components/shared/pages/shared/page-hero";
import { routes } from "@/data/routes";
import { usePageViews } from "@/hooks/usePageViews";
import { getPathUrl } from "@/utils";
import { useLocale } from "use-intl";

export function ChallengesHeaderSection() {
  const locale = useLocale();

  usePageViews(
    routes.challenges.key,
    undefined,
    { locale, path: getPathUrl(routes.challenges.link) },
    false
  );

  return (
    <PageHero
      title="Challenges"
      description="Mes challenges en cours et passés: brief, récompenses, participants, gagnants et soumissions."
      badge="Build in public"
      imagePath={{ emoji: "🏆" }}
      isMobileShowed
    />
  );
}

