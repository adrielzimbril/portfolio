"use client";
import { useState, useCallback, useMemo } from "react";
import { sleep } from "@/utils";

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
 *
 * @param {Object} options - The options for the hook
 * @param {T[]} options.dataSource - The array of items to load
 * @param {number} [options.initialCount=3] - The number of items to load initially
 * @param {number} [options.incrementCount=3] - The number of items to load when load more is called
 *
 * @returns {UseLoadMoreReturn<T>} - An object containing the loaded items, loading state, and load more function
 *
 * @template T - The type of items in the data source
 *
 * @example
 * const { data, loadMore, loading, hasMore, loadedItems, totalItems } = useLoadMore({ dataSource: items, initialCount: 3, incrementCount: 3 });
 * // Use the loadMore function
 * loadMore();
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

  // 🧠 Preserve the portion of data to avoid recalculating slice unnecessarily
  const data = useMemo(
    () => dataSource.slice(0, loadedItems),
    [dataSource, loadedItems]
  );

  // 🧠 Preserve the derived values
  const hasMore = useMemo(
    () => loadedItems < dataSource.length,
    [loadedItems, dataSource.length]
  );

  const totalItems = useMemo(() => dataSource.length, [dataSource.length]);

  // ⚡ Callback stable (ideal if we pass loadMore to children components)
  const loadMore = useCallback(() => {
    if (loading || !hasMore) return;

    setLoading(true);

    sleep(800).then(() => {
      setLoadedItems((prev) =>
        Math.min(prev + incrementCount, dataSource.length)
      );
      setLoading(false);
    });
  }, [loading, hasMore, incrementCount, dataSource.length]);

  return {
    data,
    loadMore,
    loading,
    hasMore,
    loadedItems,
    totalItems,
  };
}
