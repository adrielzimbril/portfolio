"use client";
import React from "react";
import { ProjectCard } from "@/components/shared/pages/projects/card";
import { CardPreviewSection } from "@/components/shared/pages/shared/card-preview-section-new";
import { Project } from "@/module/content/types";

export function MorePreviewSection({ data }: { data: Project[] }) {
  return (
    <CardPreviewSection title="Autres projets.">
      {data.map((project, index) => (
        <ProjectCard
          key={index}
          title={project.title}
          cover={project.image_thumbnail}
          description={project.excerpt || ""}
          slug={project.slug}
          tags={project.tags}
          categories={project.categories}
          isWide={false}
        />
      ))}
    </CardPreviewSection>
  );
}
