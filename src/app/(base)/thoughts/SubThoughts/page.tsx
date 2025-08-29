import React from "react";
import { HeaderSection } from "./sections/HeaderSection";
import { MoreInfoSection } from "./sections/MoreInfoSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import { CallToAction } from "@/components/shared/pages/shared/call-to-action";

export default function SubThoughts() {
  return (
    <>
      <HeaderSection />
      <ProjectsSection />
      <MoreInfoSection />
      <CallToAction isPage />
    </>
  );
}
