"use client";
import React from "react";
import { PageHero } from "@/components/shared/pages/shared/page-hero";
import { routes } from "@/data/route";
import { useTranslations } from "use-intl";

export function HeaderSection() {
  const t = useTranslations();

  return (
    <PageHero
      title={t("about.page.header-section.title")}
      description={t("about.page.header-section.description")}
      buttonLink={routes.about.link}
      buttonText={t("about.page.header-section.cta")}
      //buttonVariant="secondary"
      imagePath="/portrait.png"
    />
  );
}
