"use client";
import React from "react";
import { ProjectCard } from "@/components/shared/pages/projects/card";
import { CardPreviewSection } from "@/components/shared/pages/shared/card-preview-section";
import { Project } from "@/module/content/types";
import { useTranslations } from "use-intl";

export function MorePreviewSection({ data }: { data: Project[] }) {
  const t = useTranslations();

  return (
    <CardPreviewSection
      title={t("projects.inner-page.more-preview-section.title")}
    >
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
