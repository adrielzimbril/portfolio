import React from "react";
import { HeaderSection } from "./sections/HeaderSection";
import { CallToAction } from "@/components/shared/pages/shared/call-to-action";
import { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { metadata as baseMetadata } from "@/app/metadata";
import logger from "@/utils/logger";
import { getAllQuests } from "@/module/content/utils/lib/quests";
import { MyQuestsSection } from "./sections/MyQuestsSection";

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
      <HeaderSection />
      <MyQuestsSection data={data} />
      <CallToAction isPage />
    </>
  );
}
