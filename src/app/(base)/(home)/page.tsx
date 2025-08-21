import React from "react";
import { ContactSection } from "./sections/ContactSection";
import { HeaderSection } from "./sections/HeaderSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import { ResourcesSection } from "./sections/ResourcesSection";
import { AboutSection } from "./sections/AboutSection";
import InteractiveFunFacts from "./sections/AboutSectionSecond";
import InteractiveFunFactsTerio from "./sections/AboutSectionTerio";
import { Toaster } from "sonner";

export default function Home() {
  return (
    <div className="flex flex-col w-full max-w-[1440px] mx-auto items-start relative bg-white">
      {/* <NavbarSection /> */}
      <HeaderSection />
      {/* <AboutSection /> */}
      <InteractiveFunFacts />
      {/* <InteractiveFunFactsTerio /> */}
      <ResourcesSection />
      <ProjectsSection />
      <ContactSection />
      <Toaster />
    </div>
  );
}
