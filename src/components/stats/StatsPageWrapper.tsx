"use client";

import { MotionConfig } from "motion/react";

interface StatsPageWrapperProps {
  children: React.ReactNode;
}

export function StatsPageWrapper({ children }: StatsPageWrapperProps) {
  return (
    <MotionConfig reducedMotion="user">
      {children}
    </MotionConfig>
  );
}
