"use client";
import { SectionLayout } from "@/components/shared/sections/layout";
import { ProjectCard } from "@/components/shared/pages/projects/card";
import { ProjectPreview, ProjectsPreviewSectionProps } from "@/types/type";
import { getJsonDataCached } from "@/utils/get-json-data";
import { useLoadMore } from "@/hooks/useLoadMore";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const config: ProjectsPreviewSectionProps = {
  allWide: false,
  wideCardsCount: 1,
  limit: 4,
};

export function ProjectsSection() {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dataSource, setDataSource] = useState<ProjectPreview[]>([]);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const data = (await getJsonDataCached("projects", "personal", {
          mode: "client",
        })) as ProjectPreview[];
        setDataSource(data);
        setError(null);
      } catch (err) {
        console.error("Error loading initial data:", err);
        setError("Failed to load projects");
      } finally {
        setIsInitialLoading(false);
      }
    };

    loadInitialData();
  }, []);

  const { data, loadMore, loading, hasMore, loadedItems, totalItems } =
    useLoadMore({ dataSource, initialCount: 3, incrementCount: 3 });

  const { allWide, wideCardsCount, limit } = config;

  return (
    <SectionLayout className="p-0">
      {data.map((project, index) => {
        if (limit && index >= limit) return null;
        const isWide =
          allWide || (wideCardsCount !== undefined && index < wideCardsCount!);

        return (
          <ProjectCard key={project.id} details={project} isWide={isWide} />
        );
      })}

      {hasMore && (
        <Button onClick={loadMore} disabled={loading}>
          {loading ? "Loading..." : "Load More"}
        </Button>
      )}

      <p>
        Showing {loadedItems} of {totalItems} projects
      </p>
    </SectionLayout>
  );
}
