"use client";
import { sleep } from "@/utils";
import { useState, useCallback, useMemo, useEffect } from "react";

interface UseLoadMoreReturn<T> {
  data: T[];
  loading: boolean;
  hasMore: boolean;
  loadMore: () => void;
  totalItems: number;
  loadedItems: number;
}

/**
 * A hook that loads more items from a data source
 */
export function useLoadMore<T>({
  dataSource,
  initialCount = 3,
  incrementCount = 3,
}: {
  dataSource: T[];
  initialCount?: number;
  incrementCount?: number;
}): UseLoadMoreReturn<T> {
  const [loadedItems, setLoadedItems] = useState(initialCount);
  const [loading, setLoading] = useState(false);

  // Reset loadedItems when dataSource changes
  useEffect(() => {
    setLoadedItems(initialCount);
  }, [dataSource, initialCount]);

  // 🧠 Preserve the portion of data to avoid recalculating slice unnecessarily
  const data = useMemo(() => {
    if (!dataSource || dataSource.length === 0) return [];
    return dataSource.slice(0, loadedItems);
  }, [dataSource, loadedItems]);

  // 🧠 Preserve the derived values
  const hasMore = useMemo(() => {
    if (!dataSource || dataSource.length === 0) return false;
    return loadedItems < dataSource.length;
  }, [loadedItems, dataSource]);

  const totalItems = dataSource ? dataSource.length : 0;

  // ⚡ Callback stable (ideal if we pass loadMore to children components)
  const loadMore = useCallback(async () => {
    if (loading || !hasMore || !dataSource) return;

    setLoading(true);

    try {
      await sleep(800).then(() => {
        setLoadedItems((prev) =>
          Math.min(prev + incrementCount, dataSource.length)
        );
      });
    } catch (error) {
      console.error("Error loading more items:", error);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, incrementCount, dataSource]);

  return {
    data,
    loadMore,
    loading,
    hasMore,
    loadedItems,
    totalItems,
  };
}
