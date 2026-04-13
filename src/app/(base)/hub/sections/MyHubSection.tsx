"use client";
import { ResourceCard } from "@/components/shared/pages/resources/card";
import { LoadMoreSection } from "@/components/shared/pages/shared/load-more-section";
import { LoadMoreCardsSkeleton } from "@/components/shared/pages/skeletons";
import { useLoadMore } from "@/hooks/useLoadMore";
import { Resource } from "@/integrations/content/types";

interface MyHubSectionProps {
  data: Resource[];
}

export function MyHubSection({ data: initialResources }: MyHubSectionProps) {
  const { data, loadMore, loading, hasMore, loadedItems, totalItems } =
    useLoadMore({
      dataSource: initialResources,
      initialCount: 4,
      incrementCount: 4,
    });

  return (
    <LoadMoreSection
      hasMore={hasMore}
      loading={loading}
      onLoadMore={loadMore}
      loadedItems={loadedItems}
      totalItems={totalItems}
      loadingFallback={<LoadMoreCardsSkeleton kind="resources" count={2} />}
    >
      {data.map((item, index) => (
        <ResourceCard
          key={index}
          title={item.title}
          slug={item.slug}
          cover={item.cover}
          type={item.type}
          tags={item.tags}
          description={item.excerpt}
          features={item.features ?? []}
          avatars={item.studentsProfileImage}
          userCount={item.studentsNumber}
        />
      ))}
    </LoadMoreSection>
  );
}
