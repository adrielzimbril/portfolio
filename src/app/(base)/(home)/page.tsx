import React from "react";
import { CallToAction } from "@/components/shared/pages/shared/call-to-action";
import { HeaderSection } from "./sections/HeaderSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import { ResourcesSection } from "./sections/ResourcesSection";
import { ThoughtsSection } from "./sections/ThoughtsSection";
import { TestimonialsSection } from "./sections/TestimonialsSection";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations();
  const metadata = {
    title: t("home.title"),
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
