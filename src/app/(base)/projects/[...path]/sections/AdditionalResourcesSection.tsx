"use client";
import React from "react";
import { ProjectCard } from "@/components/shared/pages/projects/card";
import { CardPreviewSection } from "@/components/shared/pages/shared/card-preview-section-new";
import { useState, useEffect } from "react";
import { getAllProjects } from "@/module/content/utils/lib";
import { Project } from "@/module/content/types";
import logger from "@/utils/logger";

export function AdditionalResourcesSection() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await getAllProjects({ limit: 2 });
        setProjects(data);
      } catch (err) {
        logger.error(err);
      }
    }

    loadProjects();
  }, []);
  return (
    <CardPreviewSection title="Autres projets.">
      {projects.map((project, index) => (
        <ProjectCard
          key={index}
          title={project.title}
          cover={project.image_thumbnail}
          description={project.excerpt}
          slug={project.slug}
          tags={project.tags}
          categories={project.categories}
          isWide={project.isWide}
        />
      ))}
    </CardPreviewSection>
  );
}
