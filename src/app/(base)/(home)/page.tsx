import React from "react";
import { CallToAction } from "@/components/shared/pages/shared/call-to-action";
import { HeaderSection } from "./sections/HeaderSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import { ResourcesSection } from "./sections/ResourcesSection";
import { TestimonialsSection } from "./sections/TestimonialsSection";

export default function Home() {
  return (
    <>
      <HeaderSection />
      <ResourcesSection />
      <ProjectsSection />
      <TestimonialsSection />
      <CallToAction />
    </>
  );
}
