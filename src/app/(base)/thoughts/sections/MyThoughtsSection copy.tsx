"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { SectionLayout } from "@/components/shared/sections/layout";
import { motion } from "motion/react";
import { useLoadMore } from "@/hooks/useLoadMore";
import { PreviewItem, ThoughtPreview } from "@/types";
import { getAllPosts } from "@/module/content/utils/lib";
import { ThoughtCard } from "@/components/shared/pages/thoughts/card";
import { Post } from "content-collections";

interface LoadMoreUIProps {
  children: React.ReactNode;
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

function LoadMoreUI({
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
            </motion.div>
          </>
        )}
      </div>
    </SectionLayout>
  );
}

export function MyThoughtsSection() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Charger les données côté client
  useEffect(() => {
    async function loadPosts() {
      try {
        const data = await getAllPosts();
        setPosts(data as Post[]);
      } catch (err) {
        setError("Erreur lors du chargement des posts");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    loadPosts();
  }, []);

  const { data, loadMore, loading, hasMore, loadedItems, totalItems } =
    useLoadMore({
      dataSource: posts,
      initialCount: 4,
      incrementCount: 4,
    });

  if (isLoading) {
    return (
      <SectionLayout className="p-0">
        <div className="flex items-center justify-center py-12">
          <LoadingSpinner />
          <span className="ml-2">Chargement des posts...</span>
        </div>
      </SectionLayout>
    );
  }

  if (error) {
    return (
      <SectionLayout className="p-0">
        <div className="text-center py-12 text-red-500">{error}</div>
      </SectionLayout>
    );
  }

  return (
    <LoadMoreUI
      hasMore={hasMore}
      loading={loading}
      onLoadMore={loadMore}
      loadedItems={loadedItems}
      totalItems={totalItems}
      showCounter={true}
    >
      {data.map((post, index) => (
        <ThoughtCard
          key={post.slug || index}
          title={post.title}
          cover={post.cover}
          slug={post.slug}
          excerpt={post.excerpt || ""}
          tags={post.tags}
          created_at={post.created_at}
        />
      ))}
    </LoadMoreUI>
  );
}
