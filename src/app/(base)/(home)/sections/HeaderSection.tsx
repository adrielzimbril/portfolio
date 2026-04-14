"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
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
  const [isHovered, setIsHovered] = useState(false);

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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
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
                <motion.div
                  animate={{ x: isHovered ? 5 : 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <LinkOne variant="bulk" size={20} />
                </motion.div>
              </span>
            </Link>
          </StatusBadge>
        </motion.div>

        <motion.h1
          className="w-full relative text-6xl md:text-8xl font-bold tracking-tight text-foreground"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        >
          {t("home.page.header-section.title")}
        </motion.h1>

        <motion.p
          className={cn(
            "relative text-2xl md:text-3xl text-muted-foreground",
            "max-w-3xl leading-relaxed",
          )}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
        >
          {t("home.page.header-section.description")}
        </motion.p>

        <motion.div
          className="grid w-full md:flex md:w-auto items-start gap-4 mt-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Link
              href={routes.contact.link}
              variant="default"
              likeButton
              asFull
              whileTap
              className={cn(
                "squircle squircle-smooth-lg squircle-2xl",
                "shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30",
              )}
            >
              <span>{t("home.page.header-section.cta")}</span>
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Link
              href={routes.projects.link}
              variant="secondary"
              likeButton
              asFull
              whileTap
              className={cn(
                "squircle squircle-smooth-lg squircle-2xl",
                "shadow-lg hover:shadow-xl",
              )}
            >
              <span>{t("home.page.header-section.cta-2")}</span>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute -top-20 -right-20 w-96 h-96 squircle-color-primary/10 rounded-full blur-3xl -z-10"
          animate={{
            scale: isHovered ? [1, 1.2, 1] : 1,
            opacity: isHovered ? [0.5, 0.8, 0.5] : 0.3,
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-20 -left-20 w-80 h-80 squircle-color-accent/10 rounded-full blur-3xl -z-10"
          animate={{
            scale: isHovered ? [1, 1.15, 1] : 1,
            opacity: isHovered ? [0.5, 0.7, 0.5] : 0.3,
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
      </motion.div>
    </SectionBase>
  );
}
