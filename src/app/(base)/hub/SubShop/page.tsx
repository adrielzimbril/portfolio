import React from "react";
import { CallToAction } from "@/components/shared/pages/shared/call-to-action";
import { ElementHomeWorkContactSubsection } from "./sections/ElementHomeWorkContactSubsection";
import { HeaderSection } from "./sections/HeaderSection";
import { MoreInfoSection } from "./sections/MoreInfoSection";
import { ProjectListSection } from "./sections/ProjectListSection";
import { ProjectsSection } from "./sections/ProjectsSection";

export default function SubShop() {
  return (
    <>
      <HeaderSection />
      <ProjectsSection />
      <ElementHomeWorkContactSubsection />
      <ProjectListSection />
      <MoreInfoSection />
      <CallToAction isPage />
    </>
  );
};
