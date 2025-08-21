import React from "react";
import { SectionLayout } from "@/components/shared/sections/layout";
import { ProjectCard } from "@/components/shared/pages/projects/card";
import projectData from "@/data/personal/projects.json";

interface ProjectsSectionProps {
  /**
   * Number of cards to display in wide format on desktop
   * The others will be in vertical format (preview on top, info on bottom)
   * @default 0 - All cards in vertical format
   */
  wideCardsCount: number;

  /**
   * Force all cards to be wide on desktop
   * @default false
   */
  allWide?: boolean;
}

const config: ProjectsSectionProps = {
  allWide: false,
  wideCardsCount: 1,
};

export function ProjectsSection() {
  const { allWide, wideCardsCount } = config;
  return (
    <SectionLayout className="p-0">
      {projectData.map((project, index) => {
        const isWide = allWide || index < wideCardsCount;

        return (
          <ProjectCard key={project.id} details={project} isWide={isWide} />
        );
      })}
    </SectionLayout>
  );
}
