"use client";

import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/utils/utils";
import { useTranslations } from "use-intl";

export function StatsPageHeader() {
  const t = useTranslations();

  return (
    <motion.div
      className="flex flex-col items-center gap-4 py-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Badge
          size="md"
          className="squircle squircle-smooth-md squircle-lg shadow-lg shadow-primary/20"
        >
          Stats
        </Badge>
      </motion.div>

      <motion.h1
        className="text-center text-4xl font-bold md:text-5xl lg:text-6xl text-foreground"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
      >
        {t("stats.title")}
      </motion.h1>

      <motion.p
        className="max-w-2xl text-center text-xl text-muted-foreground"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
      >
        {t("stats.description")}
      </motion.p>

      <motion.div
        className="absolute top-10 left-10 w-32 h-32 squircle-color-primary/10 rounded-full blur-3xl -z-10"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-10 right-10 w-32 h-32 squircle-color-accent/10 rounded-full blur-3xl -z-10"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />
    </motion.div>
  );
}
