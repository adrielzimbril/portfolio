"use client";
import React from "react";
import { routes } from "@/data/routes";
import { Link } from "@/components/ui/link";
import { SectionBase } from "@/components/shared/pages/shared/section-base";
import { useTranslations, useLocale } from "use-intl";
import { StatusBadge } from "@/components/ui/status-badge";
import { LinkOne } from "@aurthle/icons";
import { getDate, getPathUrl, getThisMonth } from "@/utils";
import { usePageViews } from "@/hooks/usePageViews";

const PlanningBadge = (
  type: "simple" | "secondary" | "tertiary" | "quaternary" | "quinary",
): React.ReactNode => {
  const t = useTranslations();
  const locale = useLocale();
  const now = new Date();
  const lastDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  switch (type) {
    case "simple":
      return (
        <StatusBadge
          mode="inline"
          status="available"
          primaryText={t("common.shared.planning-badge.available.title")}
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
        </StatusBadge>
      );
    case "secondary":
      return (
        <StatusBadge
          mode="inline"
          status="offline"
          primaryText={t("common.shared.planning-badge.unavailable.title")}
          variant="colored"
          size="md"
        >
          <Link href={routes.contact.link}>
            <span className="flex items-center gap-2">
              {t("common.shared.planning-badge.unavailable.description", {
                hasDate: "true",
                date: getDate({
                  date: lastDate.toISOString(),
                  lang: locale,
                  dateStyle: "medium",
                }),
              })}
              <LinkOne variant="bulk" size={18} />
            </span>
          </Link>
        </StatusBadge>
      );
    case "tertiary":
      return (
        <StatusBadge
          mode="inline"
          status="available"
          primaryText={t("common.shared.planning-badge.available.title")}
          variant="colored"
          size="md"
        >
          <Link href={routes.contact.link}>
            <span className="flex items-center gap-2">
              {t(
                "common.shared.planning-badge.available.description-secondary",
                {
                  showLimit: "true",
                  limit: 4,
                  showMission: "true",
                  hasDate: "true",
                  date: getDate({
                    date: lastDate.toISOString(),
                    lang: locale,
                    dateStyle: "medium",
                  }),
                },
              )}
              <LinkOne variant="bulk" size={18} />
            </span>
          </Link>
        </StatusBadge>
      );
    case "quaternary":
      return (
        <StatusBadge
          mode="inline"
          status="available"
          primaryText={t("common.shared.planning-badge.available.title")}
          variant="colored"
          size="md"
        >
          <Link href={routes.contact.link}>
            <span className="flex items-center gap-2">
              {t("common.shared.planning-badge.available.description-simple")}{" "}
              👋🏻
              <LinkOne variant="bulk" size={20} />
            </span>
          </Link>
        </StatusBadge>
      );
    case "quinary":
      return (
        <StatusBadge
          mode="inline"
          status="available"
          primaryText={t("common.shared.planning-badge.available.title")}
          variant="colored"
          size="md"
        >
          <Link href={routes.contact.link}>
            <span className="flex items-center gap-2">
              {t("common.shared.planning-badge.available.description-simple")}{" "}
              👋🏻
              <LinkOne variant="bulk" size={20} />
            </span>
          </Link>
        </StatusBadge>
      );
  }
};

export function HeaderSection() {
  const t = useTranslations();
  const locale = useLocale();

  usePageViews(
    routes.home.key,
    undefined,
    {
      locale: locale,
      path: getPathUrl(routes.home.link),
    },
    false,
  );

  return (
    <SectionBase sectionClassName="p-0 mt-16" isWide>
      {PlanningBadge("quinary")}
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
