import { PageHero } from "@/components/shared/pages/shared/page-hero";
import type { Quest } from "@/module/content/utils/lib/quests";

export function HeaderSection({ quest }: { quest: Quest }) {
  return (
    <PageHero
      title={quest.title}
      description={quest.excerpt}
      badge="Quest detail"
      imagePath={{ emoji: "🎯" }}
      isMobileShowed
    />
  );
}
