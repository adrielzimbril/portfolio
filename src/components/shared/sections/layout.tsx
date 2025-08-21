import { SectionHeader } from "@/components/shared/sections/header";
import { cn } from "@/lib/utils";

export function SectionLayout({
  title,
  description,
  className,
  link,
  badge,
  children,
  asFade,
}: {
  title?: string;
  description?: string;
  className?: string;
  link?: string;
  badge?: string;
  children: React.ReactNode;
  asFade?: boolean;
}) {
  return (
    <section className={cn("relative w-full py-[104px]")}>
      {title && (
        <SectionHeader
          title={title}
          description={description!}
          link={link!}
          badge={badge!}
        />
      )}
      <div
        className={cn(
          "grid grid-cols-1 md:grid-cols-2 gap-6 place-items-center",
          className
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
