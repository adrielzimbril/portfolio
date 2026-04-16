import React from "react";
import { HeaderSection } from "@/app/(base)/talks/sections/HeaderSection";
import { CallToAction } from "@/components/shared/pages/shared/call-to-action";
import { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { metadata as baseMetadata } from "@/app/metadata";
import logger from "@/utils/logger";
import { getAllTalks } from "@/integrations/content/lib";
import { MyTalksSection } from "@/app/(base)/talks/sections/MyTalksSection";

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

export default async function MyTalks() {
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
