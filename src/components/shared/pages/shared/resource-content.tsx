"use client";
import { LoadMoreSection } from "@/components/shared/pages/shared/load-more-section";
import { useLoadMore } from "@/hooks/useLoadMore";
import { Project, Post, Resource } from "@/module/content/types";
import { PageType, ResourceType } from "@/types";
import { getDate } from "@/utils";
import { useCallback, useMemo, useState, useEffect } from "react";
import { ProjectCard } from "@/components/shared/pages/projects/card";
import { ResourceCard } from "@/components/shared/pages/resources/card";
import { ThoughtCard } from "@/components/shared/pages/thoughts/card";
import logger from "@/utils/logger";

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
  const [loadedCount, setLoadedCount] = useState(3);
  const [loading, setLoading] = useState(false);

  const visibleResources = useMemo(() => {
    return memoizedResources.slice(0, loadedCount);
  }, [memoizedResources, loadedCount]);

  const hasMore = loadedCount < memoizedResources.length;

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    setTimeout(() => {
      setLoadedCount((prev) => Math.min(prev + 4, memoizedResources.length));
      setLoading(false);
    }, 500);
  }, [loading, hasMore, memoizedResources.length]);
  logger.info("ResourceSection", { loadedCount, hasMore, loading });

  if (type === PageType.PROJECT) {
    // const { data, loadMore, loading, hasMore, loadedItems, totalItems } =
    //   useLoadMore<Project>({
    //     dataSource: memoizedResources as Project[],
    //   });
    return (
      <LoadMoreSection
        hasMore={hasMore}
        loading={loading}
        onLoadMore={loadMore}
        loadedItems={loadedCount}
        totalItems={memoizedResources.length}
      >
        {(visibleResources as unknown as Project[]).map((item, index) => (
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
    // const { data, loadMore, loading, hasMore, loadedItems, totalItems } =
    //   useLoadMore<Post>({
    //     dataSource: memoizedResources as Post[],
    //   });
    return (
      <LoadMoreSection
        hasMore={hasMore}
        loading={loading}
        onLoadMore={loadMore}
        loadedItems={loadedCount}
        totalItems={memoizedResources.length}
      >
        {(visibleResources as unknown as Post[]).map((item, index) => (
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
    // const { data, loadMore, loading, hasMore, loadedItems, totalItems } =
    //   useLoadMore<Resource>({
    //     dataSource: memoizedResources as Resource[],
    //   });
    return (
      <LoadMoreSection
        hasMore={hasMore}
        loading={loading}
        onLoadMore={loadMore}
        loadedItems={loadedCount}
        totalItems={memoizedResources.length}
      >
        {(visibleResources as unknown as Resource[]).map((item, index) => {
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
