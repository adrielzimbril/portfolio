"use client";
import { track } from "@vercel/analytics";
import { Analytics } from "@vercel/analytics/next";

export function AnalyticsScript() {
  return <Analytics />;
}

export function useAnalytics() {
  const trackEvent = (
    event: string,
    data?: Record<string, string | number | boolean | null>,
  ) => {
    track(event, data);
  };

  return {
    trackEvent,
  };
}
