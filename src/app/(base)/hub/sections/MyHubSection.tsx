import { ResourceCard } from "@/components/shared/pages/resources/card";
import { LoadMoreSection } from "@/components/shared/pages/shared/load-more-section";
import { useLoadMore } from "@/hooks/useLoadMore";
import { Resource } from "@/module/content/types";

export function MyHubSection({ data: resources }: { data: Resource[] }) {
  const { data, loadMore, loading, hasMore, loadedItems, totalItems } =
    useLoadMore({
      dataSource: resources,
      initialCount: 4,
      incrementCount: 4,
    });

  return (
    <LoadMoreSection
      key={resources.length}
      hasMore={hasMore}
      loading={loading}
      onLoadMore={loadMore}
      loadedItems={loadedItems}
      totalItems={totalItems}
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
          avatars={item.studentsProfilImage}
          userCount={item.studentsNumber}
        />
      ))}
    </LoadMoreSection>
  );
}
