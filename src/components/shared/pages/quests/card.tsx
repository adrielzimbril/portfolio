import { Card, CardContent } from "@/components/ui/card";
import { CardPreview } from "@/components/shared/pages/shared/preview";
import { CardInfo } from "@/components/shared/pages/quests/details";
import { PageType, ResourceType } from "@/types";

export function QuestCard({
  title,
  cover,
  slug,
  tags,
  description,
  features,
  //avatars,
  userCount,
  action,
}: {
  title: string;
  cover?: string;
  slug: string;
  tags: { name: string; meta?: Record<string, any> }[];
  description: string;
  features: string[];
  //avatars: string[];
  userCount?: number;
  action?: {
    label: string;
    href: string;
  } | null;
}) {
  return (
    <Card className="squircle squircle-b-base-second squircle-6xl squircle-smooth-xl size-full border-0 overflow-hidden">
      <CardContent className="grid grid-cols-1 px-6 md:px-8 py-8 md:py-10 gap-4">
        <CardPreview
          title={title}
          type={PageType.QUESTS}
          slug={slug}
          cover={cover}
          coverText={{
            emoji: "🏆",
            title: title,
            description: description,
          }}
        />
        <CardInfo
          title={title}
          slug={slug}
          tags={tags}
          description={description}
          features={features}
          //avatars={avatars}
          userCount={userCount}
          action={action}
        />
      </CardContent>
    </Card>
  );
}
