import { Card, CardContent } from "@/components/ui/card";
import { SectionLayout } from "@/components/shared/sections/layout";
import { cn } from "@/lib/utils";

export function SectionBase({
  children,
  isCallToAction,
  isWide,
  className,
  sectionClassName,
  sectionContentClassName,
}: {
  children: React.ReactNode;
  isCallToAction?: boolean;
  isWide?: boolean;
  className?: string;
  sectionClassName?: string;
  sectionContentClassName?: string;
}) {
  return (
    <SectionLayout
      isFlex
      className={sectionClassName}
      contentClassName={sectionContentClassName}
    >
      <Card
        className={cn(
          "squircle squircle-stone-100  squircle-smooth-xl",
          isCallToAction ? "squircle-7xl" : "squircle-6xl",
          className
        )}
      >
        <CardContent className={cn("md:px-12 py-16 md:py-20")}>
          <div
            className={cn(
              "flex flex-col items-center justify-between gap-6 max-w-full",
              isWide ? "items-start justify-center" : "md:flex-row",
              !isCallToAction && !isWide && "md:gap-16"
            )}
          >
            {children}
          </div>
        </CardContent>
      </Card>
    </SectionLayout>
  );
}
