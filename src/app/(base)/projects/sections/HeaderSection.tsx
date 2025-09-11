import React from "react";
import { PageHero } from "@/components/shared/pages/shared/page-hero";
import { routes } from "@/data/route";
import { useTranslations } from "next-intl";

export function HeaderSection() {
  const t = useTranslations();

  return (
    <PageHero
      title={t("projects.page.header-section.title")}
      description={t("projects.page.header-section.description")}
      buttonLink={routes.hub.link}
      buttonText={t("projects.page.header-section.cta")}
      imagePath="/image-657.png"
      actionButton
    />
  );
}
