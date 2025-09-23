"use client";
import { ThoughtCard } from "@/components/shared/pages/thoughts/card";
import { CardPreviewSection } from "@/components/shared/pages/shared/card-preview-section";
import { Post } from "@/module/content/types";

export function MorePreviewSection({ data }: { data: Post[] }) {
  return (
    <CardPreviewSection title="Autres articles.">
      {data.map((post, index) => (
        <ThoughtCard
          key={post.slug || index}
          title={post.title}
          cover={post.cover}
          slug={post.slug}
          excerpt={post.excerpt || ""}
          tags={post.tags}
        />
      ))}
    </CardPreviewSection>
  );
}
