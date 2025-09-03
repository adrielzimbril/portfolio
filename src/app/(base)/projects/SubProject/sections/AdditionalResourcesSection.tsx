"use client";
import React from "react";
import { ProjectCard } from "@/components/shared/pages/projects/card";
import { ProjectPreview } from "@/types";
import { CardPreviewSection } from "@/components/shared/pages/shared/card-preview-section";

export function AdditionalResourcesSection() {
  return (
    <CardPreviewSection
      title="Autres projets."
      dataPath="projects"
      subPath="personal"
      renderItem={(project, index) => (
        <ProjectCard key={index} details={project as ProjectPreview} />
      )}
    />
  );
}
