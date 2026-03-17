import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/utils/utils";

export function SkeletonTagRow({
  count = 3,
  centered = false,
  widths,
  className,
}: {
  count?: number;
  centered?: boolean;
  widths?: string[];
  className?: string;
}) {
  const defaultWidths = widths ?? ["w-24", "w-20", "w-16", "w-28", "w-18"];

  return (
    <div
      className={cn(
        "flex flex-wrap items-start gap-1.5 px-1 py-1 w-full squircle squircle-smooth-xl squircle-2xl md:squircle-7xl squircle-sh-white overflow-hidden",
        centered && "justify-center",
        className,
      )}
    >
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton
          key={index}
          className={cn("h-8 rounded-full", defaultWidths[index % defaultWidths.length])}
        />
      ))}
    </div>
  );
}

export function SkeletonTextBlock({
  lines,
  className,
}: {
  lines: string[];
  className?: string;
}) {
  return (
    <div className={cn("w-full space-y-3", className)}>
      {lines.map((width, index) => (
        <Skeleton key={index} className={cn("h-6 rounded-lg", width)} />
      ))}
    </div>
  );
}

export function SkeletonButton({
  className,
}: {
  className?: string;
}) {
  return <Skeleton className={cn("h-10 w-28 rounded-full", className)} />;
}

export function SkeletonStats({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 px-1 py-0.5 squircle squircle-7xl squircle-sh-white/99",
        className,
      )}
    >
      <div className="inline-flex items-start -space-x-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="w-6 h-6 rounded-full border border-white" />
        ))}
      </div>
      <Skeleton className="h-4 w-24 rounded-md ml-2" />
    </div>
  );
}

export function SkeletonSectionHeader() {
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

export function SkeletonCardShell({
  children,
  className,
  contentClassName,
}: {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
}) {
  return (
    <Card
      className={cn(
        "squircle squircle-b-base-second squircle-6xl squircle-smooth-xl size-full border-0 overflow-hidden",
        className,
      )}
    >
      <CardContent
        className={cn(
          "grid grid-cols-1 px-6 md:px-8 py-8 md:py-10 gap-4 size-full",
          contentClassName,
        )}
      >
        {children}
      </CardContent>
    </Card>
  );
}

export function SkeletonPreview({
  className,
  innerClassName,
  isWide = false,
}: {
  className?: string;
  innerClassName?: string;
  isWide?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex relative flex-col flex-1 min-h-32 md:min-h-60 items-center justify-center squircle squircle-smooth-xl squircle-xl md:squircle-3xl squircle-sh-white overflow-hidden p-2 h-48 md:h-80",
        isWide && "md:min-h-80",
        className,
      )}
    >
      <div className="flex flex-col items-start gap-3 w-full mx-auto overflow-hidden squircle-xl md:squircle-3xl rounded-2xl size-full">
        <Skeleton
          className={cn(
            "size-full h-48 md:h-72 rounded-2xl md:rounded-[1.75rem]",
            innerClassName,
          )}
        />
      </div>
    </div>
  );
}

export function SkeletonMetaCard({
  className,
}: {
  className?: string;
}) {
  return (
    <Card className={cn("w-full squircle squircle-sh-white squircle-smooth-xl", className)}>
      <CardContent className="p-4 md:p-6">
        <div className="flex flex-col gap-3">
          <Skeleton className="h-5 w-28 rounded-lg" />
          <Skeleton className="h-9 w-32 rounded-xl" />
          <Skeleton className="h-5 w-40 rounded-lg" />
        </div>
      </CardContent>
    </Card>
  );
}
