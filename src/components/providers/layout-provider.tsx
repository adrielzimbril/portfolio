"use client";
import { useEffect, useState, createContext, useContext } from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { AnalyticsScript } from "@/integrations/analytics";
import ReactLenis from "lenis/react";
import { init } from "@squircle/core";

const SquircleContext = createContext<{ isReady: boolean }>({ isReady: false });

export function useSquircleReady() {
  return useContext(SquircleContext);
}

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const run = async () => {
      await init();
      setIsReady(true);
    };
    void run();
  }, []);

  return (
    <SquircleContext.Provider value={{ isReady }}>
      <SpeedInsights />
      <AnalyticsScript />

      <ReactLenis root>{children}</ReactLenis>
    </SquircleContext.Provider>
  );
}
