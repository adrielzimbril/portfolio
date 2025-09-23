"use client";
import posthog from "posthog-js";
import { routes } from "@/data/routes";
import { SectionLayout } from "@/components/shared/sections/layout";
import { PreviewCardContainerSectionProps } from "@/types/type";
import { useState, useEffect } from "react";
import { getAllPosts } from "@/module/content/utils/lib/posts";
import { Post } from "@/module/content/types";
import logger from "@/utils/logger";
import { ThoughtCard } from "@/components/shared/pages/thoughts/card";
import { useTranslations } from "use-intl";

const config: PreviewCardContainerSectionProps = {
  limit: 2,
};

export function ThoughtsSection() {
  const t = useTranslations();
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
  }, [limit]);

  return (
    <SectionLayout
      title={t("common.page-sections.thoughts.title")}
      description={t("common.page-sections.thoughts.description")}
      link={routes.thoughts.link}
      badge={t("common.page-sections.thoughts.badge")}
    >
      {posts.map((post, index) => {
        return (
          <div
            key={index}
            onClick={() =>
              posthog.capture("thought_card_clicked", {
                post_slug: post.slug,
                post_title: post.title,
              })
            }
          >
            <ThoughtCard
              title={post.title}
              cover={post.cover}
              slug={post.slug}
              excerpt={post.excerpt || ""}
              tags={post.tags}
              created_at={post.created_at}
            />
          </div>
        );
      })}
    </SectionLayout>
  );
}
