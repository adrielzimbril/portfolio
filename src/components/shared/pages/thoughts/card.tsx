import { Card, CardContent } from "@/components/ui/card";
import { CardPreview } from "@/components/shared/pages/shared/preview";
import { CardInfo } from "@/components/shared/pages/thoughts/details";
import { Post } from "@/module/content/types";
import { PageType } from "@/types";

export function ThoughtCard({
  title,
  cover,
  slug,
  excerpt,
  primaryTag,
  tags,
  created_at,
}: {
  title: string;
  cover?: string;
  slug: string;
  excerpt: string;
  primaryTag?: string;
  tags: { name: string }[];
  created_at: string;
}) {
  return (
    <Card className="squircle squircle-neutral-100 squircle-6xl squircle-smooth-xl h-full border-0 overflow-hidden">
      <CardContent className="h-full grid grid-cols-1 px-6 md:px-8 py-8 md:py-10 gap-4">
        <CardPreview
          title={title}
          type={PageType.THOUGHT}
          slug={slug}
          cover={cover}
        />
        <CardInfo
          title={title}
          excerpt={excerpt}
          primaryTag={primaryTag}
          tags={tags}
          created_at={created_at}
          slug={slug}
        />
      </CardContent>
    </Card>
  );
}
