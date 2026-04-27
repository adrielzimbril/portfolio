"use client";
import { ThoughtCard } from "@/components/shared/pages/thoughts/card";
import { CardPreviewSection } from "@/components/shared/pages/shared/card-preview-section";
import { Post } from "@/integrations/content/types";
import { useTranslations } from "next-intl";

export function MorePreviewSection({ data }: { data: Post[] }) {
  const t = useTranslations();
  return (
    <CardPreviewSection
      title={t("thoughts.inner-page.more-preview-section.title")}
    >
      {data.map((post, index) => (
        <ThoughtCard
          key={post.slug || index}
          title={post.title}
          cover={post.cover}
          slug={post.slug}
          excerpt={post.excerpt || ""}
          tags={post.tags}
          hideReactions
        />
      ))}
    </CardPreviewSection>
  );
}
