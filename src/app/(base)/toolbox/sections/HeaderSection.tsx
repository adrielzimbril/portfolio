"use client";
import React from "react";
import { PageHero } from "@/components/shared/pages/shared/page-hero";
import { routes } from "@/data/routes";
import { useTranslations, useLocale } from "use-intl";
import { usePageViews } from "@/hooks/usePageViews";
import { getPathUrl } from "@/utils/base-url";
import { cn } from "@/utils/utils";

export function HeaderSection() {
  const t = useTranslations();
  const locale = useLocale();

  usePageViews(
    routes.toolbox.key,
    undefined,
    {
      locale: locale,
      path: getPathUrl(routes.toolbox.link),
    },
    false,
  );

  return (
    <div className="relative">
      <PageHero
        title={t("toolbox.page.header-section.title")}
        description={t("toolbox.page.header-section.description")}
        imagePath={{ emoji: "🧑‍⚕️" }}
        isMobileShowed
      />
    </div>
  );
}
