"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { SectionLayout } from "@/components/shared/sections/layout";
import { motion } from "motion/react";
import { useLoadMore } from "@/hooks/useLoadMore";
import { getJsonDataCached } from "@/utils";
import { PreviewItem } from "@/types";

interface LoadMoreProps {
  children: ReactNode;
  hasMore: boolean;
  loading: boolean;
  onLoadMore: () => void;
  loadedItems: number;
  totalItems: number;
  incrementCount?: number;
  showCounter?: boolean;
}

interface LoadMoreListProps {
  dataPath: string;
  subPath: string;
  renderItem: (item: PreviewItem, index: number) => ReactNode;
  initialCount?: number;
  incrementCount?: number;
  showCounter?: boolean;
}

function LoadingSpinner() {
  return (
    <div className="relative w-5 h-5">
      <div className="absolute inset-0 rounded-full border-2 border-zinc-200" />
      <div className="absolute inset-0 rounded-full border-2 border-zinc-200 border-t-transparent animate-spin" />
    </div>
  );
}

function useLoadMoreData<T>({
  dataPath,
  subPath,
  initialCount = 3,
  incrementCount = 3,
}: {
  dataPath: string;
  subPath: string;
  initialCount?: number;
  incrementCount?: number;
}) {
  const [dataSource, setDataSource] = useState<T[]>([]);

  useEffect(() => {
    const loadInitialData = async () => {
      const data = (await getJsonDataCached(dataPath, subPath)) as T[];
      setDataSource(data);
    };

    loadInitialData();
  }, [dataPath, subPath]);

  const { data, loadMore, loading, hasMore, loadedItems, totalItems } =
    useLoadMore({ dataSource, initialCount, incrementCount });

  return {
    data,
    loadMore,
    loading,
    hasMore,
    loadedItems,
    totalItems,
  };
}

function LoadMoreContainer({
  children,
  hasMore,
  loading,
  onLoadMore,
  loadedItems,
  totalItems,
  showCounter = false,
}: LoadMoreProps) {
  return (
    <SectionLayout className="p-0">
      {children}
      <div className="col-span-2 mt-6">
        {hasMore ? (
          <Button onClick={onLoadMore} disabled={loading} whileTap asPointer>
            {loading ? (
              <span className="flex gap-2 items-center">
                <LoadingSpinner /> Chargement... 🙏
              </span>
            ) : (
              "Voir plus 📂"
            )}
          </Button>
        ) : (
          <>
            <motion.div
              className="content-stretch flex flex-col text-center gap-2 text-zinc-400 items-center justify-center relative shrink-0 max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p>
                <span className="text-zinc-500">
                  Hello, vous avez tout vu !👋
                </span>
                <br />
                N&apos;hésitez pas à me contacter pour discuter de votre
                prochain projet 🦄
              </p>

              {showCounter && (
                <p>
                  Affiché {loadedItems} de {totalItems} éléments
                </p>
              )}
            </motion.div>
          </>
        )}
      </div>
    </SectionLayout>
  );
}

export function LoadMoreSection({
  dataPath,
  subPath,
  renderItem,
  initialCount = 4,
  incrementCount = 4,
  ...loadMoreProps
}: LoadMoreListProps) {
  const { data, loadMore, loading, hasMore, loadedItems, totalItems } =
    useLoadMoreData<PreviewItem>({
      dataPath,
      subPath,
      initialCount,
      incrementCount,
    });

  return (
    <LoadMoreContainer
      hasMore={hasMore}
      loading={loading}
      onLoadMore={loadMore}
      loadedItems={loadedItems}
      totalItems={totalItems}
      {...loadMoreProps}
    >
      {data.map(renderItem)}
    </LoadMoreContainer>
  );
}
