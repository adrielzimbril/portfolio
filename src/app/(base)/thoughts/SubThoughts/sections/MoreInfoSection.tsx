"use client";
import { useEffect, useState } from "react";
import { ThoughtCard } from "@/components/shared/pages/thoughts/card";
import { CardPreviewSection } from "@/components/shared/pages/shared/card-preview-section";
import { getAllPosts } from "@/module/content/utils/lib";
import { Post } from "@/module/content/types";
import logger from "@/utils/logger";

export function MoreInfoSection() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function loadPosts() {
      try {
        const data = await getAllPosts({ limit: 2 });
        setPosts(data);
      } catch (err) {
        logger.error(err);
      }
    }

    loadPosts();
  }, []);

  return (
    <CardPreviewSection title="Autres articles.">
      {posts.map((post, index) => (
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
    </CardPreviewSection>
  );
}
