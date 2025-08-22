import React from "react";
import { AdditionalResourcesSection } from "./sections/AdditionalResourcesSection/AdditionalResourcesSection";
import { HeaderSection } from "./sections/HeaderSection/HeaderSection";
import { InsightsSection } from "./sections/InsightsSection/InsightsSection";
import { IntroductionSection } from "./sections/IntroductionSection/IntroductionSection";
import { ProblemStatementSection } from "./sections/ProblemStatementSection/ProblemStatementSection";
import { ProjectDetailsSection } from "./sections/ProjectDetailsSection/ProjectDetailsSection";
import { ProjectGallerySection } from "./sections/ProjectGallerySection/ProjectGallerySection";
import { ProjectOverviewSection } from "./sections/ProjectOverviewSection/ProjectOverviewSection";
import { UserResearchSection } from "./sections/UserResearchSection/UserResearchSection";
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
