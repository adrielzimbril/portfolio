"use client";
import React from "react";
import { PageHero } from "@/components/shared/pages/shared/page-hero";
import { useTranslations } from "use-intl";
import { richTextComponent } from "@/module/content/utils/mdx-components";

export function HeaderSection() {
  const t = useTranslations();

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
