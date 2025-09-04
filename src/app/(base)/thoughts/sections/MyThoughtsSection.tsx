"use client";
import { ThoughtCard } from "@/components/shared/pages/thoughts/card";
import { LoadMoreSection } from "@/components/shared/pages/shared/load-more-section-new";
import { ThoughtPreview } from "@/types";
import { PreviewItem } from "@/types";
import { useLoadMore } from "@/hooks/useLoadMore";

export function MyThoughtsSection({ initialData }: { initialData: unknown[] }) {
  const { data, loadMore, loading, hasMore, loadedItems, totalItems } =
    useLoadMore({
      dataSource: initialData as PreviewItem[],
      initialCount: 4,
      incrementCount: 4,
    });

  return (
    <LoadMoreSection
      key={initialData.length}
      hasMore={hasMore}
      loading={loading}
      onLoadMore={loadMore}
      loadedItems={loadedItems}
      totalItems={totalItems}
    >
      {data.map((item, index) => (
        <ThoughtCard
          key={item.id || index}
          details={item as unknown as ThoughtPreview}
        />
      ))}
    </LoadMoreSection>
  );
}
