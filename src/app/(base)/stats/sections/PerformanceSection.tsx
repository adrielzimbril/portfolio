import { getTranslations } from "next-intl/server";
import { SectionLayout } from "@/components/shared/sections/layout";
import { LighthouseScoreCard } from "@/components/shared/pages/stats/LighthouseScoreCard";
import type { LighthouseScores } from "@/lib/stats/types";

interface PerformanceSectionProps {
  mobileScores: LighthouseScores;
  desktopScores: LighthouseScores;
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
