"use client";
import React, { useEffect, useState } from "react";
import { ThoughtCard } from "@/components/shared/pages/thoughts/card";
import { LoadMore } from "@/components/shared/pages/shared/load-more";
import { useLoadMore } from "@/hooks/useLoadMore";
import { getJsonDataCached } from "@/utils";
import { ThoughtPreview } from "@/types";

export function MyThoughtsSection() {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [dataSource, setDataSource] = useState<ThoughtPreview[]>([]);

  useEffect(() => {
    const loadInitialData = async () => {
      const data = (await getJsonDataCached(
        "thoughts",
        "personal"
      )) as ThoughtPreview[];
      setDataSource(data);
      setIsInitialLoading(false);
    };

    loadInitialData();
  }, []);

  const { data, loadMore, loading, hasMore, loadedItems, totalItems } =
    useLoadMore({ dataSource, initialCount: 3, incrementCount: 3 });
  return (
    <LoadMore
      hasMore={hasMore}
      loading={loading}
      onLoadMore={loadMore}
      loadedItems={loadedItems}
      totalItems={totalItems}
    >
      {data.map((thought) => (
        <ThoughtCard key={thought.id} details={thought} />
      ))}
    </LoadMore>
  );
}
