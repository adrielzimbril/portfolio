import { unstable_cache } from "next/cache";
import type { LighthouseStats, LighthouseScores } from "./types";
import logger from "@/utils/logger";

// Configuration
const SITE_URL = process.env.SITE_URL || "https://www.adrielzimbril.com/";
const PAGESPEED_API_KEY = process.env.PAGESPEED_API_KEY;

function getEmptyLighthouseStats(): LighthouseStats {
  const defaultScores: LighthouseScores = {
    performance: 0,
    accessibility: 0,
    bestPractices: 0,
    seo: 0,
    fetchedAt: new Date().toISOString(),
  };

  return {
    mobile: defaultScores,
    desktop: defaultScores,
  };
}

// Fonction pour récupérer les scores Lighthouse
export async function getLighthouseStats(): Promise<LighthouseStats> {
  return unstable_cache(
    async () => {
      if (!SITE_URL) {
        logger.warn(
          "[Lighthouse Stats] SITE_URL not set, returning empty stats",
        );
        return getEmptyLighthouseStats();
      }

      try {
        const [mobile, desktop] = await Promise.all([
          fetchLighthouseScores("mobile"),
          fetchLighthouseScores("desktop"),
        ]);

        return {
          mobile,
          desktop,
        };
      } catch (error) {
        logger.error(
          "[Lighthouse Stats] Error fetching Lighthouse stats:",
          error,
        );
        return getEmptyLighthouseStats();
      }
    },
    ["lighthouse-stats"],
    {
      revalidate: 86400, // Revalider tous les jours
      tags: ["stats", "lighthouse"],
    },
  )();
}

async function fetchLighthouseScores(
  strategy: "mobile" | "desktop",
): Promise<LighthouseScores> {
  const apiUrl = new URL(
    "https://www.googleapis.com/pagespeedonline/v5/runPagespeed",
  );
  apiUrl.searchParams.set("url", SITE_URL);
  apiUrl.searchParams.set("strategy", strategy);

  // API expects multiple category params, not comma-separated
  const categoryParams = [
    "performance",
    "accessibility",
    "best-practices",
    "seo",
  ];
  categoryParams.forEach((cat) => apiUrl.searchParams.append("category", cat));

  // Add API key if available (increases quota from 25/day to 25,000/day)
  if (PAGESPEED_API_KEY) {
    apiUrl.searchParams.set("key", PAGESPEED_API_KEY);
  }

  const response = await fetch(apiUrl.toString(), {
    next: { revalidate: 86400 },
  });

  if (!response.ok) {
    logger.error(
      `[Lighthouse Stats] Failed to fetch ${strategy} stats:`,
      response.status,
    );
    throw new Error(`Failed to fetch Lighthouse ${strategy} stats`);
  }

  const data = await response.json();
  const lighthouseResult = data.lighthouseResult;
  const categories = lighthouseResult?.categories;

  if (!categories) {
    logger.error(`[Lighthouse Stats] Categories is null for ${strategy}`);
    return {
      performance: 0,
      accessibility: 0,
      bestPractices: 0,
      seo: 0,
      fetchedAt: data.lighthouseResult?.fetchTime ?? new Date().toISOString(),
    };
  }

  return {
    performance: Math.round((categories.performance?.score || 0) * 100),
    accessibility: Math.round((categories.accessibility?.score || 0) * 100),
    bestPractices: Math.round((categories["best-practices"]?.score || 0) * 100),
    seo: Math.round((categories.seo?.score || 0) * 100),
    fetchedAt: data.lighthouseResult?.fetchTime ?? new Date().toISOString(),
  };
}
