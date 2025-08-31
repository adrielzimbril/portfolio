"use client";
import React, { useEffect, useState } from "react";
import { ResourceCard } from "@/components/shared/pages/resources/card";
import { LoadMore } from "@/components/shared/pages/shared/load-more";
import { useLoadMore } from "@/hooks/useLoadMore";
import { getJsonDataCached } from "@/utils";
import { ResourcePreview } from "@/types";

export function ProjectSection() {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [dataSource, setDataSource] = useState<ResourcePreview[]>([]);

  useEffect(() => {
    const loadInitialData = async () => {
      const data = (await getJsonDataCached(
        "resources",
        "personal"
      )) as ResourcePreview[];
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
      {data.map((resource) => (
        <ResourceCard key={resource.id} details={resource} />
      ))}
    </LoadMore>
  );
}
