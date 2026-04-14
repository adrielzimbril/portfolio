import { SectionHeader } from "@/components/shared/sections/header";
import { cn } from "@/utils/utils";

export function SectionLayout({
  id,
  title,
  description,
  className,
  contentClassName,
  link,
  badge,
  children,
  isFlex,
  layoutStart,
  isPage,
}: {
  id?: string;
  title?: string;
  description?: string;
  className?: string;
  contentClassName?: string;
  link?: string;
  badge?: string;
  children: React.ReactNode;
  isFlex?: boolean;
  layoutStart?: boolean;
  isPage?: boolean;
}) {
  return (
    <section
      className={cn("relative w-full py-14 md:py-[104px]", className)}
      id={id}
    >
      {(title || badge) && (
        <SectionHeader
          title={title}
          description={description}
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
          contentClassName,
        )}
      >
        {children}
      </div>
    </section>
  );
}
