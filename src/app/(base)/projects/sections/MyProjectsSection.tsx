"use client";
import { ProjectCard } from "@/components/shared/pages/projects/card";
import { LoadMoreSection } from "@/components/shared/pages/shared/load-more-section-new";
import { useState, useEffect } from "react";
import { useLoadMore } from "@/hooks/useLoadMore";
import { Project } from "@/module/content/types";
import logger from "@/utils/logger";
import { getAllProjects } from "@/module/content/utils/lib";

export function MyProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await getAllProjects();
        logger.info("Projects loaded : ", data);
        setProjects(data);
      } catch (err) {
        logger.error(err);
      }
    }

    loadProjects();
  }, []);

  const { data, loadMore, loading, hasMore, loadedItems, totalItems } =
    useLoadMore({
      dataSource: projects,
      initialCount: 3,
      incrementCount: 4,
    });

  return (
    <LoadMoreSection
      key={projects.length}
      hasMore={hasMore}
      loading={loading}
      onLoadMore={loadMore}
      loadedItems={loadedItems}
      totalItems={totalItems}
    >
      {data.map((project, index) => (
        <ProjectCard
          key={project.slug || index}
          isWide={index === 0}
          title={project.title}
          cover={project.image_thumbnail || ""}
          slug={project.slug}
          tags={project.tags}
          categories={project.categories}
          description={project.excerpt || ""}
        />
      ))}
    </LoadMoreSection>
  );
}
