"use client";
import { ProjectCard } from "@/components/shared/pages/projects/card";
import { LoadMore } from "@/components/shared/pages/shared/load-more";
import { ProjectPreview } from "@/types";

export function ProjectsSection() {
  return (
    <LoadMore
      dataPath="projects"
      subPath="personal"
      initialCount={3}
      renderItem={(item, index) => {
        const isWide = index === 0;
        return (
          <ProjectCard
            key={item.id}
            details={item as ProjectPreview}
            isWide={isWide}
          />
        );
      }}
    />
  );
}
