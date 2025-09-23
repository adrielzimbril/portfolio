import React from "react";
import { HeaderSection } from "./sections/HeaderSection";
import { MyThoughtsSection } from "./sections/MyThoughtsSection";
import { CallToAction } from "@/components/shared/pages/shared/call-to-action";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { metadata as baseMetadata } from "@/app/metadata";

export async function generateMetadata() {
  //const t = await getTranslations();
  const t = (key: string) => key;

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

export default function MyThoughts() {
  return (
    <>
      <HeaderSection />
      <MyThoughtsSection />
      <CallToAction isPage />
    </>
  );
}
