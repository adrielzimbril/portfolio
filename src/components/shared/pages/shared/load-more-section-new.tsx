"use client";
import React, { ReactNode } from "react";
import { useLoadMore } from "@/hooks/useLoadMore";
import { PreviewItem } from "@/types";
import { Button } from "@/components/ui/button";
import { SectionLayout } from "@/components/shared/sections/layout";
import { motion } from "motion/react";
import { Loader } from "@/components/shared/loader";
import { Link } from "@/components/ui/link";
import { routes } from "@/data/route";

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
                <Loader variant="single" /> <span>Chargement... 🦄</span>
              </span>
            ) : (
              "Voir plus 📂"
            )}
          </Button>
        ) : (
          <>
            <motion.div
              className="content-stretch flex flex-col text-center gap-2 text-zinc-500 items-center justify-center relative shrink-0 max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p>
                <span className="text-foreground">
                  Hello, c'est tout pour l'instant ! 🦄
                </span>
                <br />
                N&apos;hésitez pas à vous abonner à ma{" "}
                <Link href={routes.newsletter.link}>
                  <span className="text-foreground underline">newsletter</span>
                </Link>{" "}
                pour ne rien rater 🦄
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
