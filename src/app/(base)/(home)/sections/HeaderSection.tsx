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
import { cn } from "@/utils/utils";

const PlanningBadge = (type: "simple" | "secondary" | "tertiary") => {
  const t = useTranslations();
  const locale = useLocale();

  switch (type) {
    case "simple":
      <StatusBadge
        mode="inline"
        status="available"
        primaryText={t("common.shared.planning-badge.available.title")}
        className="squircle-sh-white text-b-white-invert"
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
        className="squircle-sh-white text-b-white-invert"
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
        className="squircle-sh-white text-b-white-invert"
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
        className="squircle-sh-white text-b-white-invert"
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
      <div>
        <div>
          <StatusBadge
            mode="inline"
            status="available"
            primaryText={t("common.shared.planning-badge.available.title")}
            className="squircle-sh-white text-b-white-invert"
            variant="colored"
            size="md"
          >
            <Link href={routes.contact.link}>
              <span className="flex items-center gap-2 lowercase">
                {t(
                  "common.shared.planning-badge.available.description-simple",
                  {
                    date: t("common.shared.months." + getThisMonth()),
                  },
                )}{" "}
                👋🏻
                <div>
                  <LinkOne variant="bulk" size={20} />
                </div>
              </span>
            </Link>
          </StatusBadge>
        </div>

        <h1 className="w-full relative text-6xl md:text-8xl font-bold tracking-tight text-foreground">
          {t("home.page.header-section.title")}
        </h1>

        <p
          className={cn(
            "relative text-2xl md:text-3xl text-muted-foreground",
            "max-w-3xl leading-relaxed",
          )}
        >
          {t("home.page.header-section.description")}
        </p>

        <div className="grid w-full md:flex md:w-auto items-start gap-4 mt-8">
          <div>
            <Link
              href={routes.contact.link}
              variant="default"
              likeButton
              asFull
              whileTap
              className={cn("squircle squircle-smooth-lg squircle-2xl")}
            >
              <span>{t("home.page.header-section.cta")}</span>
            </Link>
          </div>

          <div>
            <Link
              href={routes.projects.link}
              variant="secondary"
              likeButton
              asFull
              whileTap
              className={cn("squircle squircle-smooth-lg squircle-2xl")}
            >
              <span>{t("home.page.header-section.cta-2")}</span>
            </Link>
          </div>
        </div>
      </div>
    </SectionBase>
  );
}
