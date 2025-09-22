"use client";
import React from "react";
import { PageHero } from "@/components/shared/pages/shared/page-hero";
import { routes } from "@/data/routes";
import { useTranslations } from "use-intl";
import { getImageUrl } from "@/utils/base-url";
import { getEmojiHub } from "@aurthle/emoji-hub";

export function HeaderSection() {
  const t = useTranslations();

  return (
    <PageHero
      title={t("hub.page.header-section.title")}
      description={t("hub.page.header-section.description")}
      buttonLink={routes.hub.link}
      buttonText={t("hub.page.header-section.cta")}
      //imagePath={getImageUrl(getEmojiHub("🧑🏻‍🎨", "fluent", "anim"))}
      imagePath={{ emoji: "🧑🏻‍🎨" }}
      actionButton
    />
  );
}
