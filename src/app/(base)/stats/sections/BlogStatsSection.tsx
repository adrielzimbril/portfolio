import { getTranslations } from "next-intl/server";
import { SectionLayout } from "@/components/shared/sections/layout";
import { StatCard } from "@/components/shared/pages/stats/StatCard";
import {
  BookOne,
  TextFolder,
  Timelapse,
  ChatBubbleCircle,
} from "@aurthle/icons";

interface BlogStatsSectionProps {
  totalPosts: number;
  totalWords: number;
  communityMessages: number;
  totalReadingTime: number;
}

export async function BlogStatsSection({
  totalPosts,
  totalWords,
  communityMessages,
  totalReadingTime,
}: BlogStatsSectionProps) {
  const t = await getTranslations();

  return (
    <SectionLayout
      badge={t("stats.sections.blog.badge")}
      isFlex
      className="pb-0!"
    >
      <div className="grid md:w-[90%] grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label={t("stats.cards.totalThoughts.label")}
          value={totalPosts}
          suffix={t("stats.cards.totalThoughts.suffix")}
          icon={<BookOne size={32} variant="bulk" />}
          decorationPattern="💭"
        />
        <StatCard
          label={t("stats.cards.totalWords.label")}
          value={totalWords}
          suffix={t("stats.cards.totalWords.suffix")}
          icon={<TextFolder size={32} variant="bulk" />}
          decorationPattern="📝"
        />
        <StatCard
          label={t("stats.cards.communityMessages.label")}
          value={communityMessages}
          suffix={t("stats.cards.communityMessages.suffix")}
          icon={<ChatBubbleCircle size={32} variant="bulk" />}
          decorationPattern="💬"
        />
        <StatCard
          label={t("stats.cards.readingTime.label")}
          value={totalReadingTime}
          suffix={t("stats.cards.readingTime.suffix")}
          icon={<Timelapse size={32} variant="bulk" />}
          decorationPattern="⏱️"
        />
      </div>
    </SectionLayout>
  );
}
