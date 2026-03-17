"use client";
import { ProjectCard } from "@/components/shared/pages/projects/card";
import { LoadMoreSection } from "@/components/shared/pages/shared/load-more-section";
import { LoadMoreCardsSkeleton } from "@/components/shared/pages/skeletons";
import { useLoadMore } from "@/hooks/useLoadMore";
import { Project } from "@/module/content/types";
interface MyProjectsSectionProps {
  data: Project[];
}

export function MyProjectsSection({
  data: initialProjects,
}: MyProjectsSectionProps) {
  const { data, loadMore, loading, hasMore, loadedItems, totalItems } =
    useLoadMore({
      dataSource: initialProjects,
      initialCount: 3,
      incrementCount: 4,
    });

  return (
    <LoadMoreSection
      key={initialProjects.length}
      hasMore={hasMore}
      loading={loading}
      onLoadMore={loadMore}
      loadedItems={loadedItems}
      totalItems={totalItems}
      loadingFallback={<LoadMoreCardsSkeleton kind="projects" count={2} />}
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
