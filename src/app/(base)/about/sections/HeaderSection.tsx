"use client";
import React from "react";
import { PageHero } from "@/components/shared/pages/shared/page-hero";
import { routes } from "@/data/routes";
import { useTranslations, useLocale } from "use-intl";
import { getImageUrl } from "@/utils";
import { useIsDarkMode } from "@/hooks/useIsDarkMode";
import { SectionBase } from "@/components/shared/pages/shared/section-base";
import { usePageViews } from "@/hooks/usePageViews";
import { getPathUrl } from "@/utils";

export function HeaderSection() {
  const t = useTranslations();
  const locale = useLocale();

  usePageViews(
    routes.about.key,
    undefined,
    {
      locale: locale,
      path: getPathUrl(routes.about.link),
    },
    false
  );

  const isDarkMode = useIsDarkMode();

  return (
    <>
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
        isMobileShowed
        imageVariant="squircle"
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
      <SectionBase sectionClassName="" isWide>
        <h3 className="w-full relative h1">
          {t("about.page.header-section.title-secondary")}
        </h3>
        <p className="relative whitespace-pre-line text-2xl">
          {t("about.page.header-section.description-secondary")}
        </p>
      </SectionBase>
    </>
  );
}