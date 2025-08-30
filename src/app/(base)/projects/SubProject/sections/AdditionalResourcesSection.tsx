import React from "react";
import projectData from "@/data/personal/projects.json";
import { SectionLayout } from "@/components/shared/sections/layout";
import { ProjectCard } from "@/components/shared/pages/projects/card";

export function AdditionalResourcesSection() {
  return (
    <>
      <SectionLayout title="More works." layoutStart>
        {projectData.slice(0, 2).map((project, index) => {
          return <ProjectCard key={index} details={project} />;
        })}
      </SectionLayout>
    </>
  );
}
