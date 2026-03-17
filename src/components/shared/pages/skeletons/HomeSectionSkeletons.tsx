import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/utils/utils";

export function DefaultSectionSkeleton({
  count = 2,
}: {
  count?: number;
}) {
  return (
    <section className="relative w-full py-14 md:py-[104px]">
      <SectionHeaderSkeleton />
      <div className="flex flex-col items-center justify-center justify-items-center self-center w-full gap-6 md:grid grid-cols-1 md:grid-cols-2 md:max-w-[90%] place-items-center place-self-center">
        {Array.from({ length: count }).map((_, index) => (
          <DefaultCardSkeleton key={index} />
        ))}
      </div>
    </section>
  );
}

export function ProjectsSectionSkeleton() {
  return (
    <section className="relative w-full py-14 md:py-[104px]">
      <SectionHeaderSkeleton />
      <div className="flex flex-col items-center justify-center justify-items-center self-center w-full gap-6 md:grid grid-cols-1 md:grid-cols-2 md:max-w-[90%] place-items-center place-self-center">
        <ProjectCardSkeleton isWide />
        <ProjectCardSkeleton />
        <ProjectCardSkeleton />
      </div>
    </section>
  );
}

function SectionHeaderSkeleton() {
  return (
    <div className="max-w-2xl flex flex-col items-center justify-center text-center gap-4 mb-12 mx-auto">
      <Skeleton className="h-9 w-28 rounded-full squircle squircle-7xl" />
      <Skeleton className="h-14 w-[min(36rem,90vw)] rounded-3xl" />
      <Skeleton className="h-8 w-[min(32rem,80vw)] rounded-2xl" />
      <Skeleton className="h-8 w-[min(24rem,60vw)] rounded-2xl" />
      <Skeleton className="h-10 w-28 rounded-full mt-2" />
    </div>
  );
}

function DefaultCardSkeleton() {
  return (
    <Card className="squircle squircle-b-base-second squircle-6xl squircle-smooth-xl size-full border-0 overflow-hidden">
      <CardContent className="grid grid-cols-1 px-6 md:px-8 py-8 md:py-10 gap-4 size-full grid-rows-[auto_1fr]">
        <PreviewSkeleton />
        <InfoSkeleton withMeta withFeatures />
      </CardContent>
    </Card>
  );
}

function ProjectCardSkeleton({ isWide = false }: { isWide?: boolean }) {
  return (
    <Card
      className={cn(
        "flex flex-col items-center justify-center squircle squircle-b-base-second squircle-6xl squircle-smooth-xl border-0 overflow-hidden size-full",
        isWide && "md:flex-row md:col-span-2",
      )}
    >
      <CardContent
        className={cn(
          "flex flex-col px-6 md:px-8 py-8 md:py-10 gap-4 size-full",
          isWide ? "md:flex-row" : "grid-rows-[auto_1fr]",
        )}
      >
        <PreviewSkeleton isWide={isWide} />
        <InfoSkeleton withCategories compact={isWide} />
      </CardContent>
    </Card>
  );
}

function PreviewSkeleton({ isWide = false }: { isWide?: boolean }) {
  return (
    <div
      className={cn(
        "flex relative flex-col flex-1 min-h-32 md:min-h-60 items-center justify-center squircle squircle-smooth-xl squircle-xl md:squircle-3xl squircle-sh-white overflow-hidden p-2 h-48 md:h-80",
        isWide && "md:min-h-80",
      )}
    >
      <div className="flex flex-col items-start gap-3 w-full mx-auto overflow-hidden squircle-xl md:squircle-3xl rounded-2xl size-full">
        <Skeleton className="size-full h-48 md:h-72 rounded-2xl md:rounded-[1.75rem]" />
      </div>
    </div>
  );
}

function InfoSkeleton({
  withMeta = false,
  withFeatures = false,
  withCategories = false,
  compact = false,
}: {
  withMeta?: boolean;
  withFeatures?: boolean;
  withCategories?: boolean;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-start justify-between gap-4 size-full",
        compact && "flex-1 justify-center",
      )}
    >
      <div className="flex flex-col items-start justify-center gap-4 w-full">
        {withMeta ? (
          <TagRowSkeleton count={3} />
        ) : (
          <TagRowSkeleton count={2} />
        )}

        <div className="w-full space-y-3">
          <Skeleton className="h-8 w-[82%] rounded-xl" />
          <Skeleton className="h-8 w-[58%] rounded-xl" />
        </div>

        {withCategories && <TagRowSkeleton count={4} />}

        <div className="w-full space-y-3">
          <Skeleton className="h-6 w-full rounded-lg" />
          <Skeleton className="h-6 w-[92%] rounded-lg" />
          <Skeleton className="h-6 w-[68%] rounded-lg" />
        </div>

        {withFeatures && (
          <div className="w-full space-y-2">
            <Skeleton className="h-4 w-[84%] rounded-md" />
            <Skeleton className="h-4 w-[76%] rounded-md ml-3" />
            <Skeleton className="h-4 w-[72%] rounded-md ml-3" />
          </div>
        )}

        {withMeta && <StatsSkeleton />}
      </div>

      <ActionSkeleton />
    </div>
  );
}

function TagRowSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="flex flex-wrap items-start gap-1.5 px-1 py-1 w-full squircle squircle-smooth-xl squircle-2xl md:squircle-7xl squircle-sh-white overflow-hidden">
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton
          key={index}
          className={cn(
            "h-8 rounded-full",
            index === 0 && "w-24",
            index === 1 && "w-20",
            index > 1 && "w-16",
          )}
        />
      ))}
    </div>
  );
}

function StatsSkeleton() {
  return (
    <div className="inline-flex items-center gap-1.5 px-1 py-0.5 squircle squircle-7xl squircle-sh-white/99">
      <div className="inline-flex items-start -space-x-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="w-6 h-6 rounded-full border border-white" />
        ))}
      </div>
      <Skeleton className="h-4 w-24 rounded-md ml-2" />
    </div>
  );
}

function ActionSkeleton() {
  return <Skeleton className="h-10 w-28 rounded-full" />;
}
