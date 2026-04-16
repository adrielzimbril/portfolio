"use client";
import { ResourceCard } from "@/components/shared/pages/resources/card";
import { LoadMoreSection } from "@/components/shared/pages/shared/load-more-section";
import { Skeleton } from "@/components/ui/skeleton";
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
      loadingFallback={<Skeleton name="hub-load-more" className="w-full h-40" />}
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
          reactionsPosition="top"
        />
      ))}
    </LoadMoreSection>
  );
}
