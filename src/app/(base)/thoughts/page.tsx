import React from "react";
import { HeaderSection } from "./sections/HeaderSection";
import { CallToAction } from "@/components/shared/pages/shared/call-to-action";
import { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { metadata as baseMetadata } from "@/app/metadata";
import logger from "@/utils/logger";
import { getAllPosts } from "@/module/content/utils/lib";
import { MyThoughtsSection } from "./sections/MyThoughtsSection";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  const metadata: Metadata = {
    ...baseMetadata,
    title: t("thoughts.title"),
    description: t("thoughts.description"),
    keywords: t("thoughts.keywords"),
    openGraph: {
      ...baseMetadata.openGraph,
      title: t("thoughts.title"),
      description: t("thoughts.description"),
    },
    twitter: {
      ...baseMetadata.twitter,
      title: t("thoughts.title"),
      description: t("thoughts.description"),
    },
  };

  return metadata;
}

export default async function MyThoughts() {
  const locale = await getLocale();
  const data = await getAllPosts({ locale }).catch((err) => {
    logger.error(err);
    return [];
  });

  return (
    <>
      <HeaderSection />
      <MyThoughtsSection data={data} />
      {/* <ResourceWrapper initialData={data} type={PageType.THOUGHT} /> */}
      <CallToAction isPage />
    </>
  );
}
