"use client";

import { motion } from "motion/react";

interface StatsSectionHeaderProps {
  title: string;
  description: string;
  delay?: number;
}

export function StatsSectionHeader({ title, description, delay = 0 }: StatsSectionHeaderProps) {
  return (
    <div className="mb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay, ease: "easeOut" }}
      >
        <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
          {title}
        </h2>
        <p className="mt-2 text-muted-foreground">{description}</p>
      </motion.div>
    </div>
  );
}
