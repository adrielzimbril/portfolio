"use client";

import { PageHero } from "@/components/shared/pages/shared/page-hero";
import { routes } from "@/data/routes";
import { usePageViews } from "@/hooks/usePageViews";
import { getPathUrl } from "@/utils";
import { useLocale } from "use-intl";

export function TalksHeaderSection() {
  const locale = useLocale();

  usePageViews(
    routes.talks.key,
    undefined,
    { locale, path: getPathUrl(routes.talks.link) },
    false
  );

  return (
    <PageHero
      title="Talks"
      description="Toutes les sessions talks: affiches, role, date et ressources."
      badge="Talks & workshops"
      imagePath={{ emoji: "🎤" }}
      isMobileShowed
    />
  );
}

