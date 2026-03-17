"use client";
import React from "react";
import { PageHero } from "@/components/shared/pages/shared/page-hero";
import { useTranslations, useLocale } from "use-intl";
import { richTextComponent } from "@/module/content/utils/mdx-components";
import { usePageViews } from "@/hooks/usePageViews";
import { routes } from "@/data/routes";
import { getPathUrl } from "@/utils/base-url";

export function HeaderSection() {
  const t = useTranslations();
  const locale = useLocale();
  usePageViews(
    routes.submit.key,
    undefined,
    { locale: locale, path: getPathUrl(routes.submit.link) },
    false
  );

  return (
    <PageHero
      title={t("submit.page.header-section.title")}
      description={t.rich("submit.page.header-section.description", {
        ...richTextComponent,
      })}
      badge={t("submit.page.header-section.badge")}
      imagePath={{ emoji: "🚀" }}
      isMobileShowed
      actionButton
    />
  );
}
