import { LightbulbIcon } from "lucide-react";
import React from "react";
import { PageHero } from "@/components/shared/pages/shared/page-hero";
import { routes } from "@/data/route";
import { useTranslations } from "next-intl";

export function HeaderSection() {
  const t = useTranslations();

  return (
    <PageHero
      title={t("thoughts.page.header-section.title")}
      description={t("thoughts.page.header-section.description")}
      buttonLink={routes.hub.link}
      buttonText={t("thoughts.page.header-section.cta")}
      imagePath="/image-657.png"
      actionButton
    />
  );
}
