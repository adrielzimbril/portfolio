import React from "react";
import { HeroSection } from "./sections/HeaderSection/HeaderSection";
import { ProjectSection } from "./sections/ProjectSection/ProjectSection";
import { CallToAction } from "@/components/shared/pages/shared/call-to-action";

export default function MyHub() {
  return (
    <>
      <HeroSection />
      <ProjectSection />
      <CallToAction isPage />
    </>
  );
}
