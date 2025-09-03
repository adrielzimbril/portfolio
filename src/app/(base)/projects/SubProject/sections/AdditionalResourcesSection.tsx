"use client";
import React, { useEffect, useState } from "react";
import { ProjectCard } from "@/components/shared/pages/projects/card";
import {
  ProjectPreview,
  ProjectPreviewCardContainerSectionProps,
} from "@/types";
import { getJsonDataCached } from "@/utils";
import { CardPreviewSection } from "@/components/shared/pages/shared/card-preview-section";

const config: ProjectPreviewCardContainerSectionProps = {
  limit: 2,
};

export function AdditionalResourcesSection() {
  return (
    <>
      <CardPreviewSection
        title="Autres projets."
        dataPath="projects"
        subPath="personal"
        limit={2}
        renderItem={(project, index) => (
          <ProjectCard key={index} details={project as ProjectPreview} />
        )}
      />
    </>
  );
}
