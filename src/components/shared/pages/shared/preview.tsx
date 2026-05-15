"use client";
import Image from "next/image";
import { cn, getExternalUrl, getImageUrl } from "@/utils";
import { Link } from "@/components/ui/link";

interface PreviewProps {
  title?: string;
  cover?: string;
  slug?: string;
  coverText?: { emoji: string; title: string; description: string };
  isWide?: boolean;
  priority?: boolean;
}

export function CardPreview({
  title,
  cover,
  slug,
  coverText,
  isWide,
  priority,
}: PreviewProps) {
  return (
    <div
      className={cn(
        "flex relative flex-col flex-1 items-center justify-center squircle squircle-smooth-xl squircle-xl md:squircle-3xl squircle-sh-white overflow-hidden",
        cover ? "p-2 h-37.5" : "p-4 min-h-37.5",
      )}
    >
      <Link href={getExternalUrl(slug!)} className="flex size-full">
        {cover ? (
          <div className="relative flex items-center justify-center w-full mx-auto overflow-hidden squircle-xl md:squircle-3xl rounded-2xl bg-black/5 dark:bg-white/5">
            <Image
              className="rounded-2xl overflow-hidden object-contain p-4 transition-all duration-500 ease-out hover:scale-105"
              alt={title ?? ""}
              src={getImageUrl(cover!)}
              fill
              priority={priority}
              sizes={
                isWide
                  ? "(max-width: 768px) 100vw, 66vw"
                  : "(max-width: 768px) 100vw, 33vw"
              }
            />
          </div>
        ) : (
          <PreviewContent
            emoji={coverText?.emoji ?? "🚀"}
            title={coverText?.title ?? "Titre"}
            description={coverText?.description ?? "Description"}
          />
        )}
      </Link>
    </div>
  );
}
export function PreviewContent({
  emoji,
  title,
  description,
}: {
  emoji: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col size-full h-[9.375rem] max-w-[90%] mx-auto transition-all duration-800 ease hover:scale-105">
      <div className="flex flex-col items-start place-content-center gap-3 size-full pointer-events-none">
        <h4 className="text-3xl tracking-wide leading-[120%]">
          {emoji && (
            <>
              <span
                className={cn(
                  "inline-block text-5xl px-2 py-4 rounded-full bg-[#f9f9f9]",
                )}
              >
                {emoji}
              </span>
              <br />
            </>
          )}
          {title}
        </h4>

        <p className="font-medium text-b-white-invert-thr text-xl line-clamp-3 leading-[120%]">
          {description}
        </p>
      </div>
    </div>
  );
}
