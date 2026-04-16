import React from "react";
import { PhilosophySection } from "@/app/(base)/about/sections/PhilosophySection";
import { CallToAction } from "@/components/shared/pages/shared/call-to-action";
import { HeaderSection } from "@/app/(base)/about/sections/HeaderSection";
import { CraftSection } from "@/app/(base)/about/sections/CraftSection";
import { InteractiveFunFacts } from "@/app/(base)/about/sections/InteractiveFunFactsSection";
import { Skeleton } from "@/components/ui/skeleton";
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
      <Skeleton name="about-header" loading={false}>
        <HeaderSection />
      </Skeleton>
      <Skeleton name="about-craft" loading={false}>
        <CraftSection />
      </Skeleton>
      <Skeleton name="about-facts" loading={false}>
        <InteractiveFunFacts />
      </Skeleton>
      <Skeleton name="about-philosophy" loading={false}>
        <PhilosophySection />
      </Skeleton>
      <Skeleton name="about-cta" loading={false}>
        <CallToAction />
      </Skeleton>
    </>
  );
}
