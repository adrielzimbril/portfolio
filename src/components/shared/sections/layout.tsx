import { SectionHeader } from "@/components/shared/sections/header";
import { cn } from "@/utils/utils";

export function SectionLayout({
  title,
  description,
  className,
  contentClassName,
  link,
  badge,
  children,
  asFade,
  isFlex,
  layoutStart,
  isPage,
}: {
  title?: string;
  description?: string;
  className?: string;
  contentClassName?: string;
  link?: string;
  badge?: string;
  children: React.ReactNode;
  asFade?: boolean;
  isFlex?: boolean;
  layoutStart?: boolean;
  isPage?: boolean;
}) {
  return (
    <section className={cn("relative w-full py-[104px]", className)}>
      {title && (
        <SectionHeader
          title={title}
          description={description!}
          link={link}
          badge={badge}
          layoutStart={layoutStart}
          isPage={isPage}
        />
      )}
      <div
        className={cn(
          "flex flex-col items-center justify-center justify-items-center self-center place-self-center w-full gap-6",
          !isFlex &&
            "md:grid grid-cols-1 md:grid-cols-2 md:max-w-[90%] place-items-center place-self-center",
          contentClassName
        )}
      >
        {children}

        {asFade && (
          <div className="absolute w-full pointer-events-none h-[249px] bottom-0 left-0 bg-[linear-gradient(0deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0)_100%)]" />
        )}
      </div>
    </section>
  );
}
