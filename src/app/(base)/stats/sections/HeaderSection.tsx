import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/shared/pages/shared/page-hero";
import { Skeleton } from "@/components/ui/skeleton";

export async function HeaderSection() {
  const t = await getTranslations();

  return (
    <Skeleton name="stats-hero" loading={false}>
      <PageHero
        title={t("stats.page.title")}
        description={t("stats.page.description")}
        imagePath={{ emoji: "📊" }}
        isMobileShowed
      />
    </Skeleton>
  );
}
