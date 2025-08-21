import React from "react";
import { HeaderSection } from "./sections/HeaderSection/HeaderSection";
import { ProjectSection } from "./sections/ProjectSection/ProjectSection";
import { CallToAction } from "@/components/shared/pages/shared/call-to-action";

export default function MyHub() {
  return (
    <>
      <HeaderSection />
      <ProjectSection />
      <CallToAction isPage />
    </>
  );
}
