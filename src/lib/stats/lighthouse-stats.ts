import type { LighthouseStats } from "./types";

export async function getLighthouseStats(): Promise<LighthouseStats> {
  // TODO: Implement real Lighthouse score fetching
  // For now, return mock data to match the design
  
  return {
    mobile: {
      performance: 95,
      accessibility: 100,
      bestPractices: 92,
      seo: 100,
      fetchedAt: new Date().toISOString(),
    },
    desktop: {
      performance: 98,
      accessibility: 100,
      bestPractices: 95,
      seo: 100,
      fetchedAt: new Date().toISOString(),
    },
  };
}
