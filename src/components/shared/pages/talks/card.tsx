import { Card, CardContent } from "@/components/ui/card";
import { CardPreview } from "@/components/shared/pages/talks/page/preview";
import { CardInfo } from "@/components/shared/pages/talks/details";
import { PageType } from "@/types";

export function TalksCard({
  title,
  cover,
  excerpt,
  primaryTag,
  tags = [],
  action,
}: {
  title: string;
  cover?: string;
  excerpt: string;
  primaryTag?: string;
  tags?: { name: string }[];
  action?: {
    label: string;
    href: string;
  } | null;
}) {
  return (
    <Card className="squircle squircle-b-base-second squircle-6xl squircle-smooth-xl h-full border-0 overflow-hidden">
      <CardContent className="h-full grid grid-cols-1 px-6 md:px-8 py-8 md:py-10 gap-4">
        <CardPreview title={title} cover={cover} />
        <CardInfo
          title={title}
          excerpt={excerpt}
          primaryTag={primaryTag}
          tags={tags}
          action={action}
        />
      </CardContent>
    </Card>
  );
}
