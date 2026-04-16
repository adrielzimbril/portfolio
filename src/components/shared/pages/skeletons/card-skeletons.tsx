import { cn } from "@/utils/utils";
import {
  SkeletonButton,
  SkeletonCardShell,
  SkeletonPreview,
  SkeletonStats,
  SkeletonTagRow,
  SkeletonTextBlock,
} from "@/components/shared/pages/skeletons/shared";

export function ResourceCardSkeleton() {
  return (
    <SkeletonCardShell contentClassName="grid-rows-[auto_1fr]">
      <SkeletonPreview />
      <CardInfoSkeleton withMeta withFeatures />
    </SkeletonCardShell>
  );
}

export function QuestCardSkeleton() {
  return (
    <SkeletonCardShell contentClassName="grid-rows-[auto_1fr]">
      <SkeletonPreview />
      <CardInfoSkeleton withMeta withFeatures withStats />
    </SkeletonCardShell>
  );
}

export function TalkCardSkeleton() {
  return (
    <SkeletonCardShell contentClassName="grid-rows-[auto_1fr]">
      <SkeletonPreview innerClassName="h-56 md:h-72" />
      <CardInfoSkeleton withMeta withStats={false} withParticipants />
    </SkeletonCardShell>
  );
}

export function ThoughtCardSkeleton() {
  return (
    <SkeletonCardShell contentClassName="grid-rows-[auto_1fr]">
      <SkeletonPreview innerClassName="h-56 md:h-72" />
      <CardInfoSkeleton withMeta compactDescription />
    </SkeletonCardShell>
  );
}

export function ProjectCardSkeleton({ isWide = false }: { isWide?: boolean }) {
  return (
    <SkeletonCardShell
      className={cn(
        "flex flex-col items-center justify-center",
        isWide && "md:flex-row md:col-span-2",
      )}
      contentClassName={cn(
        "flex flex-col",
        isWide ? "md:flex-row" : "grid-rows-[auto_1fr]",
      )}
    >
      <SkeletonPreview isWide={isWide} />
      <CardInfoSkeleton withCategories compact={isWide} />
    </SkeletonCardShell>
  );
}

export function InnerStatementCardSkeleton() {
  return (
    <SkeletonCardShell
      className="max-w-[85%] md:max-w-[95%] squircle-b-base squircle-5xl squircle-smooth-lg"
      contentClassName="p-4 gap-2"
    >
      <div className="flex flex-row items-center gap-6 md:gap-8 px-6 py-6 md:px-8 md:py-8 squircle squircle-smooth-xl squircle-4xl squircle-sh-white overflow-hidden">
        <div className="flex items-center justify-center gap-3 p-4 aspect-square bg-b-base rounded-full overflow-hidden">
          <div className="size-14 md:size-16 rounded-full">
            <div className="size-full rounded-full bg-b-base">
              <div className="size-full rounded-full" />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start gap-2 w-full">
          <div className="h-10 w-24 rounded-xl bg-transparent">
            <div className="size-full" />
          </div>
          <SkeletonTextBlock lines={["w-40", "w-56"]} className="space-y-2" />
        </div>
      </div>
    </SkeletonCardShell>
  );
}

function CardInfoSkeleton({
  withMeta = false,
  withFeatures = false,
  withCategories = false,
  withStats = false,
  withParticipants = false,
  compact = false,
  compactDescription = false,
}: {
  withMeta?: boolean;
  withFeatures?: boolean;
  withCategories?: boolean;
  withStats?: boolean;
  withParticipants?: boolean;
  compact?: boolean;
  compactDescription?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-start justify-between gap-4 size-full",
        compact && "flex-1 justify-center",
      )}
    >
      <div className="flex flex-col items-start justify-center gap-4 w-full">
        <SkeletonTagRow count={withMeta ? 3 : 2} />

        <SkeletonTextBlock lines={["w-[82%]", "w-[58%]"]} />

        {withCategories && (
          <SkeletonTagRow count={4} widths={["w-24", "w-32", "w-28", "w-20"]} />
        )}

        <SkeletonTextBlock
          lines={
            compactDescription
              ? ["w-full", "w-[92%]", "w-[68%]"]
              : ["w-full", "w-[92%]", "w-[68%]"]
          }
        />

        {withFeatures && (
          <div className="w-full space-y-2">
            <div className="h-4 w-[84%] rounded-md bg-transparent" />
            <div className="h-4 w-[76%] rounded-md ml-3 bg-transparent" />
            <div className="h-4 w-[72%] rounded-md ml-3 bg-transparent" />
          </div>
        )}

        {(withStats || withParticipants) && <SkeletonStats />}
      </div>

      <SkeletonButton />
    </div>
  );
}
