import { Card, CardContent } from "@/components/ui/card";
import { CardPreview } from "@/components/shared/pages/shared/preview";
import { CardInfo } from "@/components/shared/pages/resources/details";
import { Skeleton } from "@/components/ui/skeleton";
import { PageType, ResourceType } from "@/types";
import { ReactionBar } from "@/components/shared/reactions/ReactionBar";
import { cn } from "@/utils/utils";

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
  reactionsPosition,
}: {
  title: string;
  cover?: string;
  slug: string;
  type: ResourceType;
  tags: { name: string }[];
  description: string;
  features: string[];
  avatars: string[];
  userCount?: number;
  reactionsPosition?: "top" | "bottom";
}) {
  return (
    <Card className="group relative squircle squircle-b-base-second squircle-6xl squircle-smooth-xl size-full border-0">
      <CardContent className="relative grid grid-cols-1 px-6 md:px-8 py-8 md:py-10 gap-4 size-full grid-rows-[auto_1fr]">
        <CardPreview
          title={title}
          type={PageType.HUB}
          slug={slug}
          cover={cover}
          resourceType={type}
          coverText={{
            emoji: "🧑🏻‍🎨",
            title: title,
            description: description,
          }}
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

        {reactionsPosition && (
          <div className={cn(
            "absolute z-20 pointer-events-auto",
            reactionsPosition === "top" ? "top-4 right-4" : "bottom-6 right-8"
          )}>
            <ReactionBar 
              pageType={PageType.HUB} 
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

export function ResourceCardSkeleton() {
  return <Skeleton name="resource-card" className="w-full h-80" />;
}
