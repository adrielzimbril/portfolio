import { Card, CardContent } from "@/components/ui/card";
import { CardPreview } from "@/components/shared/pages/talks/preview";
import { CardInfo } from "@/components/shared/pages/talks/details";
import { Skeleton } from "@/components/ui/skeleton";
import { AbsoluteReactionBar } from "@/components/shared/reactions/AbsoluteReactionBar";
import { PageType } from "@/types/enum";

export function TalksCard({
  title,
  cover,
  excerpt,
  date,
  tags = [],
  participantsCount,
  action,
  reactionsPosition,
}: {
  title: string;
  cover?: string;
  excerpt: string;
  date: string;
  tags?: { name: string }[];
  participantsCount: number;
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
          cover={cover}
          coverText={{
            emoji: "🎤",
            title: title,
            description: excerpt,
          }}
        />
        <CardInfo
          title={title}
          excerpt={excerpt}
          date={date}
          tags={tags ?? []}
          participantsCount={participantsCount}
          action={action}
          hideReactions={true}
        />

        <AbsoluteReactionBar 
          pageType={PageType.TALKS} 
          entityId={title} 
          reactionsPosition={reactionsPosition} 
        />
      </CardContent>
    </Card>
  );
}

export function TalkCardSkeleton() {
  return <Skeleton name="talk-card" className="w-full h-80" />;
}
