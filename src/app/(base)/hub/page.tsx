import React from "react";
import { HeaderSection } from "./sections/HeaderSection";
import { CallToAction } from "@/components/shared/pages/shared/call-to-action";
import { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { metadata as baseMetadata } from "@/app/metadata";
import logger from "@/utils/logger";
import { getAllResources } from "@/module/content/utils/lib/resources";
import { MyHubSection } from "./sections/MyHubSection";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  const metadata: Metadata = {
    ...baseMetadata,
    title: t("hub.title"),
    description: t("hub.description"),
    keywords: t("hub.keywords"),
    openGraph: {
      ...baseMetadata.openGraph,
      title: t("hub.title"),
      description: t("hub.description"),
    },
    twitter: {
      ...baseMetadata.twitter,
      title: t("hub.title"),
      description: t("hub.description"),
    },
  };

  return metadata;
}

export default async function MyHub() {
  const locale = await getLocale();
  const data = await getAllResources({ locale }).catch((err) => {
    logger.error(err);
    return [];
  });

  return (
    <>
      <HeaderSection />
      <MyHubSection data={data} />
      {/* <ResourceWrapper initialData={data} type={PageType.HUB} /> */}
      <CallToAction isPage />
    </>
  );
}
