import { Card, CardContent } from "@/components/ui/card";
import { CardPreview } from "@/components/shared/pages/shared/preview";
import { CardInfo } from "@/components/shared/pages/resources/details";
import { PageType, ResourcePreviewCardInfoProps, ResourceType } from "@/types";

export function ResourceCard({
  title,
  cover,
  slug,
  type,
  tags,
  description,
  features,
  avatars,
  userCount,
}: {
  title: string;
  cover?: string;
  slug: string;
  type: ResourceType;
  tags: { name: string }[];
  description: string;
  features: string[];
  avatars: string[];
  userCount: number;
}) {
  return (
    <Card className="squircle squircle-neutral-100 squircle-6xl squircle-smooth-xl border-0 overflow-hidden">
      <CardContent className="grid grid-cols-1 px-6 md:px-8 py-8 md:py-10 gap-4">
        <CardPreview
          title={title}
          type={PageType.HUB}
          slug={slug}
          cover={cover}
          resourceType={type}
        />
        <CardInfo
          title={title}
          slug={slug}
          resourceType={type}
          tags={tags}
          description={description}
          features={features}
          avatars={avatars}
          userCount={userCount}
        />
      </CardContent>
    </Card>
  );
}
