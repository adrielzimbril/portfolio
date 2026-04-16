"use client";
import { ThoughtCard } from "@/components/shared/pages/thoughts/card";
import { LoadMoreSection } from "@/components/shared/pages/shared/load-more-section";
import { Skeleton } from "@/components/ui/skeleton";
import { useLoadMore } from "@/hooks/useLoadMore";
import { Post } from "@/integrations/content/types";
import { getDate } from "@/utils";

interface MyThoughtsSectionProps {
  data: Post[];
}

export function MyThoughtsSection({
  data: initialPosts,
}: MyThoughtsSectionProps) {
  const { data, loadMore, loading, hasMore, loadedItems, totalItems } =
    useLoadMore({
      dataSource: initialPosts,
      initialCount: 4,
      incrementCount: 4,
    });

  return (
    <LoadMoreSection
      key={initialPosts.length}
      hasMore={hasMore}
      loading={loading}
      onLoadMore={loadMore}
      loadedItems={loadedItems}
      totalItems={totalItems}
      loadingFallback={<Skeleton name="thoughts-load-more" className="w-full h-40" />}
    >
      {data.map((post, index) => (
        <ThoughtCard
          key={post.slug || index}
          title={post.title}
          cover={post.cover}
          slug={post.slug}
          excerpt={post.excerpt || ""}
          primaryTag={getDate({ date: post.created_at })}
          tags={post.tags}
        />
      ))}
    </LoadMoreSection>
  );
}
