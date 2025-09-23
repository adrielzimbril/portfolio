import { ThoughtCard } from "@/components/shared/pages/thoughts/card";
import { LoadMoreSection } from "@/components/shared/pages/shared/load-more-section";
import { useLoadMore } from "@/hooks/useLoadMore";
import { Post } from "@/module/content/types";
import { getDate } from "@/utils";

export function MyThoughtsSection({ data: posts }: { data: Post[] }) {
  const { data, loadMore, loading, hasMore, loadedItems, totalItems } =
    useLoadMore({
      dataSource: posts,
      initialCount: 4,
      incrementCount: 4,
    });

  return (
    <LoadMoreSection
      key={posts.length}
      hasMore={hasMore}
      loading={loading}
      onLoadMore={loadMore}
      loadedItems={loadedItems}
      totalItems={totalItems}
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
