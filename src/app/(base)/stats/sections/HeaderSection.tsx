import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/shared/pages/shared/page-hero";

export async function HeaderSection() {
  const t = await getTranslations();

  return (
    <PageHero
      title={t("stats.page.title")}
      description={t("stats.page.description")}
      imagePath={{ emoji: "📊" }}
      isMobileShowed
    />
  );
}
