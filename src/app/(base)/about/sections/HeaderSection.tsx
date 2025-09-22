"use client";
import React from "react";
import { PageHero } from "@/components/shared/pages/shared/page-hero";
import { routes } from "@/data/routes";
import { useTranslations } from "use-intl";
import { getEmojiHub } from "@aurthle/emoji-hub";
import { getImageUrl } from "@/utils";
import { useIsDarkMode } from "@/hooks/useIsDarkMode";

export function HeaderSection() {
  const t = useTranslations();

  const isDarkMode = useIsDarkMode();

  return (
    <PageHero
      title={t("about.page.header-section.title")}
      description={t("about.page.header-section.description")}
      // buttonLink={routes.about.link}
      // buttonText={t("about.page.header-section.cta")}
      //buttonVariant="secondary"
      //imagePath={getEmojiHub("🧑‍💻", "apple")} // getEmojiHub("🤔")
      //imagePath={getEmojiHub("👨🏽‍💻", "fluent", "anim")} // getEmojiHub("🤔")
      //imagePath={{ emoji: "👨🏽‍💻" }}
      //imagePath={getImageUrl("/img/me/memoji/me-love.png")}
      imgClassName="rounded-full"
      imagePath={{
        mp4: getImageUrl(
          isDarkMode
            ? "/img/me/memoji/me-dark-out.mp4"
            : "/img/me/memoji/me-out.mp4"
        ),
        webm: getImageUrl(
          isDarkMode
            ? "/img/me/memoji/me-dark-out.webm"
            : "/img/me/memoji/me-out.webm"
        ),
        poster: getImageUrl("/img/me/memoji/me.png"),
      }}
    />
  );
}