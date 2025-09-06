import React from "react";
import { CallToAction } from "@/components/shared/pages/shared/call-to-action";
import { HeaderSection } from "./sections/HeaderSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import { ResourcesSection } from "./sections/ResourcesSection";
import { QuoteSection } from "./sections/QuoteSection";
import { TestimonialsSectionSimple } from "./sections/TestimonialsSection-simple";
import { TestimonialsSection } from "./sections/TestimonialsSection";

export default function Home() {
  return (
    <>
      <HeaderSection />
      <ResourcesSection />
      <ProjectsSection />
      <QuoteSection />
      <TestimonialsSection />
      <TestimonialsSectionSimple />
      <CallToAction />
    </>
  );
}
