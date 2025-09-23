"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { SectionLayout } from "@/components/shared/sections/layout";
import { motion } from "motion/react";
import { Loader } from "@/components/shared/_layouts/loader";
import { richTextComponent } from "@/module/content/utils/mdx-components";
import { useTranslations } from "use-intl";

interface LoadMoreUIProps {
  children: React.ReactNode;
  hasMore: boolean;
  loading: boolean;
  onLoadMore: () => void;
  loadedItems: number;
  totalItems: number;
  showCounter?: boolean;
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
  const t = useTranslations();
  return (
    <SectionLayout className="p-0">
      {children}
      <div className="col-span-2 mt-6">
        {hasMore ? (
          <Button onClick={onLoadMore} disabled={loading} whileTap asPointer>
            {loading ? (
              <span className="flex gap-2 items-center">
                <Loader variant="pulse" />{" "}
                {/* <span>{t("common.button.loading")} 🦄</span> */}
              </span>
            ) : (
              t("common.button.view-more")
            )}
          </Button>
        ) : (
          <>
            <motion.div
              className="content-stretch flex flex-col text-center gap-2 text-b-white-invert-thr items-center justify-center relative shrink-0 max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p>
                <span className="text-foreground">
                  {t("common.shared.loadMore.greeting")}
                </span>
                <br />
                {t.rich("common.shared.loadMore.end.cta", {
                  ...richTextComponent,
                })}
              </p>

              {showCounter && (
                <p>
                  {t("common.shared.loadMore.counter", {
                    loadedItems,
                    totalItems,
                  })}
                </p>
              )}
            </motion.div>
          </>
        )}
      </div>
    </SectionLayout>
  );
}
