"use client";
import React from "react";
import { AdditionalResourcesSection } from "./sections/AdditionalResourcesSection";
import { HeaderSection } from "./sections/HeaderSection";
import { InsightsSection } from "./sections/InsightsSection";
import { IntroductionSection } from "./sections/IntroductionSection";
import { ProblemStatementSection } from "./sections/ProblemStatementSection";
import { ProjectDetailsSection } from "./sections/ProjectDetailsSection";
import { ProjectGallerySection } from "./sections/ProjectGallerySection";
import { ProjectOverviewSection } from "./sections/ProjectOverviewSection";
import { UserResearchSection } from "./sections/UserResearchSection";
import { CallToAction } from "@/components/shared/pages/shared/call-to-action";

export default function SubProject() {
  return (
    <>
      <HeaderSection />
      <ProjectDetailsSection />
      <ProjectGallerySection />
      <UserResearchSection />
      <ProblemStatementSection />
      <IntroductionSection />
      <InsightsSection />
      <ProjectOverviewSection />
      <AdditionalResourcesSection />
      <CallToAction isPage />
    </>
  );
}
