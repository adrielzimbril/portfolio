import React from "react";
import { CallToAction } from "@/components/shared/pages/shared/call-to-action";
import { HeaderSection } from "./sections/HeaderSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import { ResourcesSection } from "./sections/ResourcesSection";
import { QuoteSection } from "./sections/QuoteSection";
import { TestimonialsSection } from "./sections/TestimonialsSection-simple";

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
