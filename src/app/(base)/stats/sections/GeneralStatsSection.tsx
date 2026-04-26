import { getTranslations, getLocale } from "next-intl/server";
import { SectionLayout } from "@/components/shared/sections/layout";
import { StatCard } from "@/components/shared/pages/stats/StatCard";
import { Eye, Coffee, Calendar } from "@aurthle/icons";
import { Skeleton } from "@/components/ui/skeleton";
import { ConfigValue } from "@/config";

const REVAMP_DATE = new Date(ConfigValue.NEXT_PUBLIC_REVAMP_DATE);

interface GeneralStatsSectionProps {
  totalViews: number;
  totalWords: number;
}

export async function GeneralStatsSection({
  totalViews,
  totalWords,
}: GeneralStatsSectionProps) {
  const t = await getTranslations();
  const locale = await getLocale();

  const coffeeCups = Math.floor(totalWords / 500);
  const daysSinceRevamp = Math.floor(
    (new Date().getTime() - REVAMP_DATE.getTime()) / (1000 * 60 * 60 * 24),
  );

  return (
    <Skeleton name="stats-general" loading={false}>
      <SectionLayout badge={t("stats.sections.general.badge")} isFlex className="py-0!">
        <div className="mt-6 md:w-[80%] grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            label={t("stats.cards.totalViews.label")}
            value={totalViews}
            icon={<Eye size={32} variant="bulk" />}
            decoration="👁️"
            description={t("stats.cards.totalViews.description")}
          />
          <StatCard
            label={t("stats.cards.coffee.label")}
            value={coffeeCups}
            suffix={t("stats.cards.coffee.suffix")}
            icon={<Coffee size={32} variant="bulk" />}
            decoration="☕"
            description={t("stats.cards.coffee.description")}
          />
          <StatCard
            label={t("stats.cards.siteAge.label")}
            value={daysSinceRevamp}
            suffix={t("stats.cards.siteAge.suffix")}
            icon={<Calendar size={32} variant="bulk" />}
            decoration="📅"
            description={t("stats.cards.siteAge.description", {
              date: REVAMP_DATE.toLocaleDateString(locale, {
                month: "short",
                day: "numeric",
                year: "numeric",
              }),
            })}
          />
        </div>
      </SectionLayout>
    </Skeleton>
  );
}
