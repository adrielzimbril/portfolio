"use client";
import posthog from "posthog-js";
import { routes } from "@/data/routes";
import { SectionLayout } from "@/components/shared/sections/layout";
import { ProjectCard } from "@/components/shared/pages/projects/card";
import { ProjectPreviewCardContainerSectionProps } from "@/types/type";
import { useState, useEffect } from "react";
import { getAllProjects } from "@/module/content/utils/lib";
import logger from "@/utils/logger";
import { Project } from "@/module/content/types";
import { cn } from "@/utils";
import { useTranslations, useLocale } from "use-intl";

const config: ProjectPreviewCardContainerSectionProps = {
  allWide: false,
  wideCardsCount: 1,
  limit: 3,
};

export function ProjectsSection() {
  const t = useTranslations();
  const locale = useLocale();
  const { allWide, wideCardsCount, limit } = config;
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await getAllProjects({ limit: limit, locale });
        setProjects(data);
      } catch (err) {
        logger.error(err);
      }
    }

    loadProjects();
  }, [limit, locale]);

  return (
    <SectionLayout
      title={t("common.page-sections.projects.title")}
      description={t("common.page-sections.projects.description")}
      link={routes.projects.link}
      badge={t("common.page-sections.projects.badge")}
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
            className={cn(
              "size-full",
              isWide ? "md:flex-row md:col-span-2" : "md:flex-col md:col-span-1"
            )}
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
