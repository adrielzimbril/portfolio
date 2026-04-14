"use client";
import React from "react";
import { motion } from "motion/react";
import { SectionLayout } from "@/components/shared/sections/layout";
import { toolbox } from "@/data/personal/toolbox";
import { useTranslations } from "use-intl";
import { ToolAvatar } from "@/components/shared/pages/tools/avatar";
import { cn } from "@/utils/utils";

export function ToolsSection() {
  const t = useTranslations();

  return (
    <SectionLayout
      className="pb-0!"
      badge={t("toolbox.page.tools-section.badge")}
      isFlex
    >
      <motion.div
        className="relative mb-12 grid auto-rows-auto grid-cols-3 place-items-center justify-center gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-9"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {toolbox.map(
          (item, index) =>
            item.icon && (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.05,
                  ease: "easeOut",
                }}
                whileHover={{
                  scale: 1.15,
                  rotate: [0, -5, 5, 0],
                  transition: {
                    rotate: { duration: 0.3 },
                    scale: { duration: 0.2 },
                  },
                }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <motion.div
                  className={cn(
                    "absolute inset-0 bg-primary/10 rounded-full blur-xl -z-10 opacity-0",
                    "hover:opacity-100 transition-opacity duration-300",
                  )}
                  whileHover={{
                    scale: 1.5,
                    opacity: 0.5,
                  }}
                  transition={{ duration: 0.3 }}
                />
                <ToolAvatar icon={item.icon} name={item.name} />
              </motion.div>
            ),
        )}
      </motion.div>
    </SectionLayout>
  );
}
