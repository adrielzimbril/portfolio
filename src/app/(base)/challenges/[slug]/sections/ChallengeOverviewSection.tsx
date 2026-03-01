import { PageHero } from "@/components/shared/pages/shared/page-hero";
import type { Challenge } from "@/module/content/utils/lib/challenges";

export function ChallengeOverviewSection({
  challenge,
}: {
  challenge: Challenge;
}) {
  return (
    <>
      <PageHero
        title={challenge.title}
        description={challenge.excerpt}
        badge="Challenge detail"
        imagePath={{ emoji: "🎯" }}
        isMobileShowed
      />
    </>
  );
}
