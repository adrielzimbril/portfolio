import React from "react";
import { CallToAction } from "@/components/shared/pages/shared/call-to-action";
import { HeaderSection } from "./sections/HeaderSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import { ResourcesSection } from "./sections/ResourcesSection";
import { ThoughtsSection } from "./sections/ThoughtsSection";
import { TestimonialsSection } from "./sections/TestimonialsSection";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { metadata as baseMetadata } from "@/app/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  const metadata: Metadata = {
    ...baseMetadata,
    title: t("home.title"),
    description: t("home.description"),
    keywords: t("home.keywords"),
    openGraph: {
      ...baseMetadata.openGraph,
      title: t("home.title"),
      description: t("home.description"),
    },
    twitter: {
      ...baseMetadata.twitter,
      title: t("home.title"),
      description: t("home.description"),
    },
  };

  return metadata;
}

export default function Home() {
  return (
    <>
      <HeaderSection />
      <ResourcesSection />
      <ProjectsSection />
      <TestimonialsSection />
      <ThoughtsSection />
      <CallToAction />
    </>
  );
}
