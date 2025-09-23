import { ProjectCard } from "@/components/shared/pages/projects/card";
import { LoadMoreSection } from "@/components/shared/pages/shared/load-more-section";
import { useLoadMore } from "@/hooks/useLoadMore";
import { Project } from "@/module/content/types";

export function MyProjectsSection({ data: projects }: { data: Project[] }) {
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
