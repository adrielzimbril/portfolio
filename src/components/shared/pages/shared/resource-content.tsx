"use client";
import { LoadMoreSection } from "@/components/shared/pages/shared/load-more-section";
import { useLoadMore } from "@/hooks/useLoadMore";
import { Project, Post, Resource } from "@/module/content/types";
import { PageType, ResourceType } from "@/types";
import { getDate } from "@/utils";
import { useMemo } from "react";
import { ProjectCard } from "@/components/shared/pages/projects/card";
import { ResourceCard } from "@/components/shared/pages/resources/card";
import { ThoughtCard } from "@/components/shared/pages/thoughts/card";

interface ResourceSectionProps {
  data: Project[] | Post[] | Resource[];
  type: PageType;
}

export function ResourceSection({
  data: initialResources,
  type,
}: ResourceSectionProps) {
  // Memoize the projects to avoid re-creating the hook
  const memoizedResources = useMemo(() => initialResources, [initialResources]);

  if (type === PageType.PROJECT) {
    const { data, loadMore, loading, hasMore, loadedItems, totalItems } =
      useLoadMore<Project>({
        dataSource: memoizedResources as Project[],
      });
    return (
      <LoadMoreSection
        hasMore={hasMore}
        loading={loading}
        onLoadMore={loadMore}
        loadedItems={loadedItems}
        totalItems={totalItems}
      >
        {data.map((item, index) => (
          <ProjectCard
            key={item.slug || index}
            isWide={index === 0}
            title={item.title}
            cover={item.image_thumbnail || ""}
            slug={item.slug}
            tags={item.tags}
            categories={item.categories}
            description={item.excerpt || ""}
          />
        ))}
      </LoadMoreSection>
    );
  } else if (type === PageType.THOUGHT) {
    const { data, loadMore, loading, hasMore, loadedItems, totalItems } =
      useLoadMore<Post>({
        dataSource: memoizedResources as Post[],
      });
    return (
      <LoadMoreSection
        hasMore={hasMore}
        loading={loading}
        onLoadMore={loadMore}
        loadedItems={loadedItems}
        totalItems={totalItems}
      >
        {data.map((item, index) => (
          <ThoughtCard
            key={item.slug || index}
            title={item.title}
            cover={item.cover}
            slug={item.slug}
            excerpt={item.excerpt || ""}
            primaryTag={getDate({ date: item.created_at })}
            tags={item.tags}
          />
        ))}
      </LoadMoreSection>
    );
  } else if (type === PageType.HUB) {
    const { data, loadMore, loading, hasMore, loadedItems, totalItems } =
      useLoadMore<Resource>({
        dataSource: memoizedResources as Resource[],
      });
    return (
      <LoadMoreSection
        hasMore={hasMore}
        loading={loading}
        onLoadMore={loadMore}
        loadedItems={loadedItems}
        totalItems={totalItems}
      >
        {data.map((item, index) => {
          return (
            <ResourceCard
              key={index}
              title={item.title}
              slug={item.slug}
              cover={item.cover}
              type={item.type}
              tags={item.tags}
              description={item.excerpt}
              features={item.features ?? []}
              avatars={item.studentsProfilImage}
              userCount={item.studentsNumber}
            />
          );
        })}
      </LoadMoreSection>
    );
  }
}
