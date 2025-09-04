"use client";
import { useLoadMore } from "@/hooks/useLoadMore";
import { PreviewItem } from "@/types";

export function useLoadMoreItems({
  dataSource,
  initialCount = 4,
  incrementCount = 4,
}: {
  dataSource: PreviewItem[];
  initialCount?: number;
  incrementCount?: number;
}) {
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

import React, { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { SectionLayout } from "@/components/shared/sections/layout";
import { motion } from "motion/react";

interface LoadMoreUIProps {
  children: ReactNode;
  hasMore: boolean;
  loading: boolean;
  onLoadMore: () => void;
  loadedItems: number;
  totalItems: number;
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

export function LoadMoreSection({
  children,
  hasMore,
  loading,
  onLoadMore,
  loadedItems,
  totalItems,
  showCounter = false,
}: LoadMoreUIProps) {
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
