"use client";
import React from "react";
import { motion } from "motion/react";
import { SectionLayout } from "@/components/shared/sections/layout";
import { setup } from "@/data/personal/setup";
import { useTranslations } from "use-intl";
import { SetupCard } from "@/components/shared/pages/tools/setup/card";
import { cn } from "@/utils/utils";

export function SetupSection() {
  const t = useTranslations();

  return (
    <SectionLayout badge={t("toolbox.page.setup-section.badge")} isFlex>
      <motion.div
        className="grid grid-cols-1 grid-rows-2 gap-4 md:grid-cols-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {setup.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              ease: "easeOut",
            }}
            whileHover={{
              y: -8,
              scale: 1.02,
              transition: { duration: 0.3 },
            }}
          >
            <motion.div
              className={cn(
                "relative h-full",
                "squircle squircle-smooth-xl squircle-3xl",
              )}
              whileHover={{
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              }}
              transition={{ duration: 0.3 }}
            >
              <SetupCard
                title={item.name}
                cover={item.imageUrl}
                description={item.description}
                category={item.category}
                tags={item.tags}
                purchaseUrl={item.purchaseUrl}
              />
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </SectionLayout>
  );
}
