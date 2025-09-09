"use client";
import posthog from "posthog-js";
import { routes } from "@/data/route";
import { SectionLayout } from "@/components/shared/sections/layout";
import { ProjectCard } from "@/components/shared/pages/projects/card";
import { ProjectPreviewCardContainerSectionProps } from "@/types/type";
import { useState, useEffect } from "react";
import { getAllProjects } from "@/module/content/utils/lib";
import logger from "@/utils/logger";
import { Project } from "@/module/content/types";

const config: ProjectPreviewCardContainerSectionProps = {
  allWide: false,
  wideCardsCount: 1,
  limit: 3,
};

export function ProjectsSection() {
  const { allWide, wideCardsCount, limit } = config;
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await getAllProjects({ limit: limit });
        logger.info("Projects loaded", data);
        setProjects(data);
      } catch (err) {
        logger.error(err);
      }
    }

    loadProjects();
  }, []);

  return (
    <SectionLayout
      title="Projets"
      description="Chaque projet est une opportunité de transformer une idée en expérience réelle, avec un design qui séduit et une stratégie qui fonctionne."
      link={routes.projects.link}
      badge="Problem Solver 🦄"
      asFade
    >
      {projects.map((project, index) => {
        const isWide =
          allWide || (wideCardsCount !== undefined && index < wideCardsCount!);

        return (
          <div
            key={index}
            onClick={() =>
              posthog.capture("project-card-clicked", {
                project_slug: project.slug,
                project_title: project.title,
              })
            }
          >
            <ProjectCard
              title={project.title}
              cover={project.image_thumbnail}
              description={project.excerpt || ""}
              slug={project.slug}
              tags={project.tags}
              categories={project.categories}
              isWide={isWide}
            />
          </div>
        );
      })}
    </SectionLayout>
  );
}
