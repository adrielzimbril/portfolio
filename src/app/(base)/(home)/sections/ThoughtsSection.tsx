"use client";
import { routes } from "@/data/route";
import { SectionLayout } from "@/components/shared/sections/layout";
import { ResourceCard } from "@/components/shared/pages/resources/card";
import { PreviewCardContainerSectionProps } from "@/types/type";
import { useState, useEffect } from "react";
import { getAllPosts } from "@/module/content/utils/lib/posts";
import { Resource, Post } from "@/module/content/types";
import logger from "@/utils/logger";
import { ThoughtCard } from "@/components/shared/pages/thoughts/card";

const config: PreviewCardContainerSectionProps = {
  limit: 2,
};

export function ThoughtsSection() {
  const { limit } = config;
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function loadPosts() {
      try {
        const data = await getAllPosts({ limit: limit });
        setPosts(data);
      } catch (err) {
        logger.error(err);
      }
    }

    loadPosts();
  }, []);

  return (
    <SectionLayout
      title="Thoughts"
      description="Des guides, modèles et conseils pour maîtriser l'UI/UX, les design systems et Figma, et créer des produits qui donnent envie d'être utilisés."
      link={routes.thoughts.link}
      badge="Ma vision 🤯"
    >
      {posts.map((post, index) => {
        return (
          <ThoughtCard
            key={index}
            title={post.title}
            cover={post.cover}
            slug={post.slug}
            excerpt={post.excerpt || ""}
            tags={post.tags}
            created_at={post.created_at}
          />
        );
      })}
    </SectionLayout>
  );
}
