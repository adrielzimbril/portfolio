import React, { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { SectionLayout } from "@/components/shared/sections/layout";
import { motion } from "motion/react";

interface LoadMoreProps {
  children: ReactNode;
  hasMore: boolean;
  loading: boolean;
  onLoadMore: () => void;
  loadedItems: number;
  totalItems: number;

  // Optional Props for customization
  containerClassName?: string;
  showCounter?: boolean;
}

export function LoadingSpinner() {
  return (
    <div className="relative w-5 h-5">
      <div className="absolute inset-0 rounded-full border-2 border-zinc-200" />
      <div className="absolute inset-0 rounded-full border-2 border-zinc-200 border-t-transparent animate-spin" />
    </div>
  );
}

export function LoadMore({
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
