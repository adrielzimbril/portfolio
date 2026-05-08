"use client";
import { useEffect, useState } from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { AnalyticsScript } from "@/integrations/analytics";
import ReactLenis from "lenis/react";
import { init } from "@squircle/core";

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const run = async () => {
      await init();
    };
    void run();
  }, []);

  return (
    <>
      <SpeedInsights />
      <AnalyticsScript />

      <ReactLenis root>{children}</ReactLenis>
    </>
  );
}
