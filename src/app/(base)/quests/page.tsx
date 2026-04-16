import React from "react";
import { HeaderSection } from "@/app/(base)/quests/sections/HeaderSection";
import { CallToAction } from "@/components/shared/pages/shared/call-to-action";
import { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { metadata as baseMetadata } from "@/app/metadata";
import logger from "@/utils/logger";
import { getAllQuests } from "@/integrations/content/lib/quests";
import { MyQuestsSection } from "@/app/(base)/quests/sections/MyQuestsSection";
import { Skeleton } from "@/components/ui/skeleton";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  const metadata: Metadata = {
    ...baseMetadata,
    title: t("quests.title"),
    description: t("quests.description"),
    keywords: t("quests.keywords"),
    openGraph: {
      ...baseMetadata.openGraph,
      title: t("quests.title"),
      description: t("quests.description"),
    },
    twitter: {
      ...baseMetadata.twitter,
      title: t("quests.title"),
      description: t("quests.description"),
    },
  };

  return metadata;
}

export default async function MyQuests() {
  const locale = await getLocale();
  const data = await getAllQuests({ locale }).catch((err) => {
    logger.error(err);
    return [];
  });

  return (
    <>
      <Skeleton name="quests-header" loading={false}>
        <HeaderSection />
      </Skeleton>
      <Skeleton name="quests-listing" loading={false}>
        <MyQuestsSection data={data} />
      </Skeleton>
      <Skeleton name="quests-cta" loading={false}>
        <CallToAction isPage />
      </Skeleton>
    </>
  );
}
