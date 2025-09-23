import React from "react";
import { PageHero } from "@/components/shared/pages/shared/page-hero";
import { useTranslations } from "use-intl";

export function HeaderSection() {
  const t = useTranslations();

  return (
    <PageHero
      title={t("thoughts.page.header-section.title")}
      description={t("thoughts.page.header-section.description")}
      //buttonLink={routes.thoughts.link}
      //buttonText={t("thoughts.page.header-section.cta")}
      //imagePath={getImageUrl(getEmojiHub("🧑🏻‍🎨", "fluent", "anim"))}
      imagePath={{ emoji: "😮‍💨" }}
      actionButton
    />
  );
}
