import { Card, CardContent } from "@/components/ui/card";
import { CardPreview } from "@/components/shared/pages/shared/preview";
import { CardInfo } from "@/components/shared/pages/thoughts/details";
import { Skeleton } from "@/components/ui/skeleton";
import { PageType } from "@/types";
import { ReactionBar } from "@/components/shared/reactions/ReactionBar";
import { cn } from "@/utils/utils";

export function ThoughtCard({
  title,
  cover,
  slug,
  excerpt,
  primaryTag,
  tags,
  reactionsPosition,
}: {
  title: string;
  cover?: string;
  slug: string;
  excerpt: string;
  primaryTag?: string;
  tags: { name: string }[];
  reactionsPosition?: "top" | "bottom";
}) {
  return (
    <Card className="group relative squircle squircle-b-base-second squircle-6xl squircle-smooth-xl size-full border-0">
      <CardContent className="grid grid-cols-1 px-6 md:px-8 py-8 md:py-10 gap-4 size-full grid-rows-[auto_1fr] relative">
        <CardPreview
          title={title}
          type={PageType.THOUGHT}
          slug={slug}
          cover={cover}
          coverText={{
            emoji: "😮‍💨",
            title: title,
            description: excerpt,
          }}
        />
        <CardInfo
          title={title}
          excerpt={excerpt}
          primaryTag={primaryTag}
          tags={tags}
          slug={slug}
          hideReactions={true}
        />
        
        {reactionsPosition && (
          <div className={cn(
            "absolute z-20 pointer-events-auto",
            reactionsPosition === "top" ? "top-4 right-4" : "bottom-6 right-8"
          )}>
            <ReactionBar 
              pageType={PageType.THOUGHT} 
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

export function ThoughtCardSkeleton() {
  return <Skeleton name="thought-card" className="w-full h-80" />;
}
