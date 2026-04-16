import { Card, CardContent } from "@/components/ui/card";
import { CardPreview } from "@/components/shared/pages/shared/preview";
import { CardInfo } from "@/components/shared/pages/quests/details";
import { Skeleton } from "@/components/ui/skeleton";
import { PageType } from "@/types";

export function QuestCard({
  title,
  cover,
  slug,
  tags,
  description,
  features,
  action,
  reactionsPosition,
}: {
  title: string;
  cover?: string;
  slug: string;
  tags: { name: string; meta?: Record<string, any> }[];
  description: string;
  features: string[];
  action?: {
    label: string;
    href: string;
  } | null;
  reactionsPosition?: "top" | "bottom";
}) {
  return (
    <Card className="group relative squircle squircle-b-base-second squircle-6xl squircle-smooth-xl size-full border-0 overflow-hidden">
      <CardContent className="grid grid-cols-1 px-6 md:px-8 py-8 md:py-10 gap-4 size-full grid-rows-[auto_1fr] relative">
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
          action={action}
          hideReactions={true}
        />

        {reactionsPosition && (
          <div className={cn(
            "absolute z-20 pointer-events-auto",
            reactionsPosition === "top" ? "top-4 right-4" : "bottom-6 right-8"
          )}>
            <ReactionBar 
              pageType={PageType.QUESTS} 
              entityId={slug} 
              variant="dock" 
              dockPosition={reactionsPosition} 
              orientation="vertical"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function QuestCardSkeleton() {
  return <Skeleton name="quest-card" className="w-full h-80" />;
}
