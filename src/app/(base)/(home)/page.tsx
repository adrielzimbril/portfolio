import React from "react";
import { ContactSection } from "./sections/ContactSection";
import { HeaderSection } from "./sections/HeaderSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import { ResourcesSection } from "./sections/ResourcesSection";
import InteractiveFunFacts from "./sections/InteractiveFunFactsSection";
import { Toaster } from "sonner";

export default function Home() {
  return (
    <>
      <HeaderSection />
      <InteractiveFunFacts />
      <ResourcesSection />
      <ProjectsSection />
      <ContactSection />
      <Toaster />
    </>
  );
}
