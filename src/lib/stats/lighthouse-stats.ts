import { unstable_cache } from "next/cache";
import type { LighthouseStats, LighthouseScores } from "./types";

// Configuration - TODO: Adapter avec votre URL
const SITE_URL = process.env.SITE_URL || "https://www.adrielzimbril.com/";
const PAGESPEED_API_KEY = process.env.PAGESPEED_API_KEY;

// Fonction pour récupérer les scores Lighthouse
export async function getLighthouseStats(): Promise<LighthouseStats> {
  return unstable_cache(
    async () => {
      if (!SITE_URL) {
        console.warn("SITE_URL not set, returning default Lighthouse stats");
        return getDefaultLighthouseStats();
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
        console.error("Error fetching Lighthouse stats:", error);
        return getDefaultLighthouseStats();
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
  const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(SITE_URL)}&strategy=${strategy}`;

  const urlWithKey = PAGESPEED_API_KEY
    ? `${apiUrl}&key=${PAGESPEED_API_KEY}`
    : apiUrl;

  const response = await fetch(urlWithKey, {
    next: { revalidate: 86400 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch Lighthouse ${strategy} stats`);
  }

  const data = await response.json();
  const lighthouseResult = data.lighthouseResult;
  const categories = lighthouseResult.categories;

  return {
    performance: Math.round(categories.performance.score * 100),
    accessibility: Math.round(categories.accessibility.score * 100),
    bestPractices: Math.round(categories["best-practices"].score * 100),
    seo: Math.round(categories.seo.score * 100),
  };
}

function getDefaultLighthouseStats(): LighthouseStats {
  const defaultScores: LighthouseScores = {
    performance: 0,
    accessibility: 0,
    bestPractices: 0,
    seo: 0,
  };

  return {
    mobile: defaultScores,
    desktop: defaultScores,
  };
}
