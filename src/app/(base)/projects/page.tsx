import React from "react";
import { ProjectsSection } from "./sections/ProjectsSection";
import { CallToAction } from "@/components/shared/pages/shared/call-to-action";
import { HeaderSection } from "./sections/HeaderSection";

export default function MyProject() {
  return (
    <>
      <HeaderSection />
      <ProjectsSection />
      <CallToAction isPage />
    </>
  );
}
