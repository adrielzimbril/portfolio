import React from "react";
import { HeaderSection } from "./sections/HeaderSection";
import { CallToAction } from "@/components/shared/pages/shared/call-to-action";
import { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { metadata as baseMetadata } from "@/app/metadata";
import logger from "@/utils/logger";
import { getAllTalks } from "@/module/content/utils/lib";
import { MyTalksSection } from "./sections/TalksListSection";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  const metadata: Metadata = {
    ...baseMetadata,
    title: t("talks.title"),
    description: t("talks.description"),
    keywords: t("talks.keywords"),
    openGraph: {
      ...baseMetadata.openGraph,
      title: t("talks.title"),
      description: t("talks.description"),
    },
    twitter: {
      ...baseMetadata.twitter,
      title: t("talks.title"),
      description: t("talks.description"),
    },
  };

  return metadata;
}

export default function TalksPage() {
  return <TalksPageContent />;
}

async function TalksPageContent() {
  const locale = await getLocale();
  const data = await getAllTalks({ locale }).catch((err) => {
    logger.error(err);
    return [];
  });

  return (
    <>
      <HeaderSection />
      <MyTalksSection data={data} />
      <CallToAction isPage />
    </>
  );
}
