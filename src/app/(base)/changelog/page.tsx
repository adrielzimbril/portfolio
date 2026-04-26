import React from "react";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { metadata as baseMetadata } from "@/app/metadata";
import { HeaderSection } from "@/app/(base)/changelog/sections/HeaderSection";
import { TimelineSection } from "@/app/(base)/changelog/sections/TimelineSection";
import { CallToAction } from "@/components/shared/pages/shared/call-to-action";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return {
    ...baseMetadata,
    title: t("changelog.title"),
    description: t("changelog.description"),
    openGraph: {
      ...baseMetadata.openGraph,
      title: t("changelog.title"),
      description: t("changelog.description"),
    },
    twitter: {
      ...baseMetadata.twitter,
      title: t("changelog.title"),
      description: t("changelog.description"),
    },
  };
}

export default async function ChangelogPage() {
  return (
    <>
      <HeaderSection />
      <TimelineSection />
      <CallToAction isPage />
    </>
  );
}
