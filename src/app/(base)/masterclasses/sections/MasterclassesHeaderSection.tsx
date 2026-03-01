"use client";

import { PageHero } from "@/components/shared/pages/shared/page-hero";
import { routes } from "@/data/routes";
import { usePageViews } from "@/hooks/usePageViews";
import { getPathUrl } from "@/utils";
import { useLocale } from "use-intl";

export function MasterclassesHeaderSection() {
  const locale = useLocale();

  usePageViews(
    routes.masterclasses.key,
    undefined,
    { locale, path: getPathUrl(routes.masterclasses.link) },
    false
  );

  return (
    <PageHero
      title="Masterclasses"
      description="Toutes les sessions auxquelles j'ai participé: affiches, rôle, date et ressources."
      badge="Talks & workshops"
      imagePath={{ emoji: "🎤" }}
      isMobileShowed
    />
  );
}

