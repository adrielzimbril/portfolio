import { getTranslations } from "next-intl/server";
import { SectionLayout } from "@/components/shared/sections/layout";
import { LighthouseScoreCard } from "@/components/shared/pages/stats/LighthouseScoreCard";

interface PerformanceSectionProps {
  mobileScores: {
    performance: number;
    accessibility: number;
    bestPractices: number;
    seo: number;
  };
  desktopScores: {
    performance: number;
    accessibility: number;
    bestPractices: number;
    seo: number;
  };
}

export async function PerformanceSection({
  mobileScores,
  desktopScores,
}: PerformanceSectionProps) {
  const t = await getTranslations();

  return (
    <SectionLayout badge={t("stats.sections.performance.badge")}>
      <LighthouseScoreCard scores={mobileScores} strategy="mobile" />
      <LighthouseScoreCard scores={desktopScores} strategy="desktop" />
    </SectionLayout>
  );
}
