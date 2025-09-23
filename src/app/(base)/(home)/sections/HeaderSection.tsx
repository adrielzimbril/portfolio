"use client";
import React from "react";
import { routes } from "@/data/routes";
import { Link } from "@/components/ui/link";
import { SectionBase } from "@/components/shared/pages/shared/section-base";
import { useTranslations, useLocale } from "use-intl";
import { StatusBadge } from "@/components/ui/status-badge";
import { LinkOne } from "@aurthle/icons";
import { getDate, getThisMonth } from "@/utils";

const PlanningBadge = (type: "simple" | "secondary" | "tertiary") => {
  const t = useTranslations();
  const locale = useLocale();

  switch (type) {
    case "simple":
      <StatusBadge
        mode="inline"
        status="available"
        primaryText={t("common.shared.planning-badge.available.title")}
        className="squircle-sh-white/99 text-b-white-invert"
        variant="colored"
        size="md"
      >
        <Link href={routes.contact.link}>
          <span className="flex items-center gap-2 lowercase">
            {t("common.shared.planning-badge.available.description", {
              limit: 1,
              date: t("common.shared.months." + getThisMonth()),
            })}
            <LinkOne variant="bulk" size={20} />
          </span>
        </Link>
      </StatusBadge>;
      break;
    case "secondary":
      <StatusBadge
        mode="inline"
        status="offline"
        primaryText={t("common.shared.planning-badge.unavailable.title")}
        className="squircle-sh-white/99 text-b-white-invert"
        variant="colored"
        size="md"
      >
        <Link href={routes.contact.link}>
          <span className="flex items-center gap-2">
            {t("common.shared.planning-badge.unavailable.description", {
              hasDate: "true",
              date: getDate({
                date: new Date("2025-09-31").toISOString(),
                lang: locale,
                dateStyle: "medium",
              }),
            })}
            <LinkOne variant="bulk" size={18} />
          </span>
        </Link>
      </StatusBadge>;
      break;
    case "tertiary":
      <StatusBadge
        mode="inline"
        status="available"
        primaryText={t("common.shared.planning-badge.available.title")}
        className="squircle-sh-white/99 text-b-white-invert"
        variant="colored"
        size="md"
      >
        <Link href={routes.contact.link}>
          <span className="flex items-center gap-2">
            {t("common.shared.planning-badge.available.description-secondary", {
              showLimit: "true",
              limit: 4,
              showMission: "true",
              hasDate: "true",
              date: getDate({
                date: new Date("2025-09-31").toISOString(),
                lang: locale,
                dateStyle: "medium",
              }),
            })}
            <LinkOne variant="bulk" size={18} />
          </span>
        </Link>
      </StatusBadge>;
      break;
    default:
      <StatusBadge
        mode="inline"
        status="available"
        primaryText={t("common.shared.planning-badge.available.title")}
        className="squircle-sh-white/99 text-b-white-invert"
        variant="colored"
        size="md"
      >
        <Link href={routes.contact.link}>
          <span className="flex items-center gap-2">
            {t("common.shared.planning-badge.available.description-simple", {
              date: t("common.shared.months." + getThisMonth()),
            })}{" "}
            👋🏻
            <LinkOne variant="bulk" size={20} />
          </span>
        </Link>
      </StatusBadge>;
      break;
  }
};

export function HeaderSection() {
  const t = useTranslations();

  return (
    <SectionBase sectionClassName="p-0 mt-16" isWide>
      <StatusBadge
        mode="inline"
        status="available"
        primaryText={t("common.shared.planning-badge.available.title")}
        className="squircle-sh-white/99 text-b-white-invert"
        variant="colored"
        size="md"
      >
        <Link href={routes.contact.link}>
          <span className="flex items-center gap-2">
            {t("common.shared.planning-badge.available.description-simple", {
              date: t("common.shared.months." + getThisMonth()),
            })}{" "}
            👋🏻
            <LinkOne variant="bulk" size={20} />
          </span>
        </Link>
      </StatusBadge>
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
