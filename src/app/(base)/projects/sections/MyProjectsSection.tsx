"use client";
import { ProjectCard } from "@/components/shared/pages/projects/card";
import { LoadMoreSection } from "@/components/shared/pages/shared/load-more-section";
import { ProjectPreview } from "@/types";

export function MyProjectsSection() {
  return (
    <LoadMoreSection
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
