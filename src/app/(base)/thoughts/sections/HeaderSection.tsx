"use client";
import React from "react";
import { PageHero } from "@/components/shared/pages/shared/page-hero";
import { useTranslations, useLocale } from "use-intl";
import { usePageViews } from "@/hooks/usePageViews";
import { routes } from "@/data/routes";
import { getPathUrl } from "@/utils/base-url";
import { cn } from "@/utils/utils";

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
    <div className="relative">
      <PageHero
        title={t("thoughts.page.header-section.title")}
        description={t("thoughts.page.header-section.description")}
        isMobileShowed
        imagePath={{ emoji: "😮‍💨" }}
        actionButton
      />
    </div>
  );
}
