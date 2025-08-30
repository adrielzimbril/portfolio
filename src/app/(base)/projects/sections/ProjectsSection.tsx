import React from "react";
import { SectionLayout } from "@/components/shared/sections/layout";
import { ProjectCard } from "@/components/shared/pages/projects/card";
import { ProjectPreview, ProjectsPreviewSectionProps } from "@/types/type";
import { getJsonDataCached } from "@/lib/get-json-data";

const config: ProjectsPreviewSectionProps = {
  allWide: false,
  wideCardsCount: 1,
  limit: 4,
};

export function ProjectsSection() {
  const { allWide, wideCardsCount, limit } = config;
  const projectData = getJsonDataCached(
    "projects",
    "personal"
  ) as ProjectPreview[];

  return (
    <SectionLayout className="p-0">
      {projectData.map((project, index) => {
        if (limit && index >= limit) return null;
        const isWide =
          allWide || (wideCardsCount !== undefined && index < wideCardsCount!);

        return (
          <ProjectCard key={project.id} details={project} isWide={isWide} />
        );
      })}
    </SectionLayout>
  );
}
