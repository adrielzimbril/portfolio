import React from "react";
import { PhilosophySection } from "@/app/(base)/about/sections/PhilosophySection";
import { CallToAction } from "@/components/shared/pages/shared/call-to-action";
import { HeaderSection } from "@/app/(base)/about/sections/HeaderSection";
import { CraftSection } from "@/app/(base)/about/sections/CraftSection";
import { InteractiveFunFacts } from "@/app/(base)/about/sections/InteractiveFunFactsSection";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { metadata as baseMetadata } from "@/app/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  const metadata: Metadata = {
    ...baseMetadata,
    title: t("about.title"),
    description: t("about.description"),
    keywords: t("about.keywords"),
    openGraph: {
      ...baseMetadata.openGraph,
      title: t("about.title"),
      description: t("about.description"),
    },
    twitter: {
      ...baseMetadata.twitter,
      title: t("about.title"),
      description: t("about.description"),
    },
  };

  return metadata;
}

export default function About() {
  return (
    <>
      <HeaderSection />
      <CraftSection />
      <InteractiveFunFacts />
      <PhilosophySection />
      <CallToAction />
    </>
  );
}
