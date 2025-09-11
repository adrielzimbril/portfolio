"use client";
import React from "react";
import { routes } from "@/data/route";
import { Link } from "@/components/ui/link";
import { SectionBase } from "@/components/shared/pages/shared/section-base";
import { useTranslations } from "use-intl";

export function HeaderSection() {
  const t = useTranslations();

  return (
    <SectionBase sectionClassName="p-0 mt-20" isWide>
      <h1 className="w-full relative">{t("home.page.header-section.title")}</h1>
      <p className="relative text-2xl">
        {t("home.page.header-section.description")}
      </p>
      <div className="grid w-full md:flex md:w-auto items-start gap-3">
        <Link
          href={routes.contact.link}
          variant="default"
          likeButton
          asFull
          whileTap
        >
          <span>{t("home.page.header-section.cta")}</span>
        </Link>

        <Link
          href={routes.projects.link}
          variant="secondary"
          likeButton
          asFull
          whileTap
        >
          <span>{t("home.page.header-section.cta-2")}</span>
        </Link>
      </div>
    </SectionBase>
  );
}
