import React from "react";
import { CallToAction } from "@/components/shared/pages/shared/call-to-action";
import { HeaderSection } from "./sections/HeaderSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import { ResourcesSection } from "./sections/ResourcesSection";
import { ThoughtsSection } from "./sections/ThoughtsSection";
import { TestimonialsSection } from "./sections/TestimonialsSection";
import { getPathUrl } from "@/utils";
import { routes } from "@/data/route";

export async function generateMetadata() {
  const metadata = {
    title: "Home",
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
