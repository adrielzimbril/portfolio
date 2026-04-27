"use client";
export function AnalyticsScript() {
  return null;
}

export function useAnalytics() {
  const trackEvent = () => {};

  return {
    trackEvent,
  };
}
