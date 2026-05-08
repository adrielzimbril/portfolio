"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { SectionLayout } from "@/components/shared/sections/layout";

interface LoadMoreUIProps {
  children: React.ReactNode;
  hasMore: boolean;
  loading: boolean;
  onLoadMore: () => void;
  loadedItems: number;
  totalItems: number;
  showCounter?: boolean;
  loadingFallback?: React.ReactNode;
}

function LoadingDots() {
  return (
    <span className="flex gap-1 items-center">
      <span
        className="w-2 h-2 bg-current rounded-full animate-bounce"
        style={{ animationDelay: "0ms" }}
      />
      <span
        className="w-2 h-2 bg-current rounded-full animate-bounce"
        style={{ animationDelay: "150ms" }}
      />
      <span
        className="w-2 h-2 bg-current rounded-full animate-bounce"
        style={{ animationDelay: "300ms" }}
      />
    </span>
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
  loadingFallback,
}: LoadMoreUIProps) {
  return (
    <SectionLayout className="p-0">
      {children}
      {loading && loadingFallback ? loadingFallback : null}
      <div className="col-span-2 mt-6">
        {hasMore ? (
          <Button onClick={onLoadMore} disabled={loading} whileTap asPointer>
            {loading ? (
              <span className="flex gap-2 items-center">
                <LoadingDots />
              </span>
            ) : (
              "Voir plus"
            )}
          </Button>
        ) : (
          <>
            <div className="content-stretch flex flex-col text-center gap-2 text-b-white-invert-thr items-center justify-center relative shrink-0 max-w-md">
              <p>
                <span className="text-foreground">C&apos;est tout !</span>
                <br />
                Vous avez vu tous les éléments disponibles.
              </p>

              {showCounter && (
                <p>
                  {loadedItems} / {totalItems} éléments affichés
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </SectionLayout>
  );
}
