import React from "react";
import { SectionLayout } from "@/components/shared/sections/layout";
import { ProjectCard } from "@/components/shared/pages/projects/card";
import { ProjectPreview, ProjectsPreviewSectionProps } from "@/types";
import { getJsonDataCached } from "@/utils";

const config: ProjectsPreviewSectionProps = {
  limit: 2,
};

export async function AdditionalResourcesSection() {
  const { limit } = config;
  const projectData = (await getJsonDataCached(
    "projects",
    "personal"
  )) as ProjectPreview[];

  return (
    <>
      <SectionLayout title="More works." layoutStart>
        {projectData.slice(0, limit!).map((project, index) => {
          return <ProjectCard key={index} details={project} />;
        })}
      </SectionLayout>
    </>
  );
}
