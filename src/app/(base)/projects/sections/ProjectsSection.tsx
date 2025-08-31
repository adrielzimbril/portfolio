"use client";
import { SectionLayout } from "@/components/shared/sections/layout";
import { ProjectCard } from "@/components/shared/pages/projects/card";
import { ProjectPreview, ProjectsPreviewSectionProps } from "@/types/type";
import { getJsonDataCached } from "@/utils/get-json-data";
import { useLoadMore } from "@/hooks/useLoadMore";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { LoadMore } from "@/components/shared/pages/shared/load-more";

const config: ProjectsPreviewSectionProps = {
  allWide: false,
  wideCardsCount: 1,
};

export function ProjectsSection() {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [dataSource, setDataSource] = useState<ProjectPreview[]>([]);

  useEffect(() => {
    const loadInitialData = async () => {
      const data = (await getJsonDataCached(
        "projects",
        "personal"
      )) as ProjectPreview[];
      setDataSource(data);
      setIsInitialLoading(false);
    };

    loadInitialData();
  }, []);

  const { data, loadMore, loading, hasMore, loadedItems, totalItems } =
    useLoadMore({ dataSource, initialCount: 3, incrementCount: 3 });

  const { allWide, wideCardsCount, limit } = config;

  return (
    <LoadMore
      hasMore={hasMore}
      loading={loading}
      onLoadMore={loadMore}
      loadedItems={loadedItems}
      totalItems={totalItems}
    >
      {data.map((project, index) => {
        if (limit && index >= limit) return null;
        const isWide =
          allWide || (wideCardsCount !== undefined && index < wideCardsCount!);
        return (
          <ProjectCard key={project.id} details={project} isWide={isWide} />
        );
      })}
    </LoadMore>
  );
}
