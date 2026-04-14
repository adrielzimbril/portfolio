"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import { PageHero } from "@/components/shared/pages/shared/page-hero";
import { routes } from "@/data/routes";
import { useTranslations, useLocale } from "use-intl";
import { usePageViews } from "@/hooks/usePageViews";
import { getPathUrl } from "@/utils/base-url";
import { cn } from "@/utils/utils";

export function HeaderSection() {
  const t = useTranslations();
  const locale = useLocale();
  const [isHovered, setIsHovered] = useState(false);

  usePageViews(
    routes.toolbox.key,
    undefined,
    {
      locale: locale,
      path: getPathUrl(routes.toolbox.link),
    },
    false,
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative"
    >
      <motion.div
        animate={{
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <PageHero
          title={t("toolbox.page.header-section.title")}
          description={t("toolbox.page.header-section.description")}
          badge={t("toolbox.page.header-section.badge")}
          imagePath={{ emoji: "🛠️" }}
          isMobileShowed
        />
      </motion.div>

      <motion.div
        className="absolute top-20 right-10 w-64 h-64 squircle-color-primary/10 rounded-full blur-3xl -z-10"
        animate={{
          scale: isHovered ? [1, 1.3, 1] : 1,
          opacity: isHovered ? [0.4, 0.7, 0.4] : 0.2,
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-10 left-10 w-48 h-48 squircle-color-accent/10 rounded-full blur-3xl -z-10"
        animate={{
          scale: isHovered ? [1, 1.2, 1] : 1,
          opacity: isHovered ? [0.4, 0.6, 0.4] : 0.2,
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />
    </motion.div>
  );
}
