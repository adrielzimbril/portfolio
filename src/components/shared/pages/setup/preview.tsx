"use client";
import Image from "next/image";
import { cn } from "@/utils/utils";
import { getImageUrl } from "@/utils/base-url";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useTranslations } from "use-intl";
import { PreviewContent } from "@/components/shared/pages/shared/preview";
import { Link } from "@/components/ui/link";

interface PreviewProps {
  title?: string;
  cover?: string;
  coverText?: { emoji: string; title: string; description: string };
  isWide?: boolean;
  purchaseUrl?: string;
}

export function CardPreview({
  title,
  cover,
  coverText,
  isWide,
  purchaseUrl,
}: PreviewProps) {
  const t = useTranslations();
  return (
    <div
      className={cn(
        "flex relative flex-col flex-1 min-h-32 md:min-h-60 items-center justify-center squircle squircle-smooth-xl squircle-xl md:squircle-3xl squircle-sh-white overflow-hidden",
        isWide && "md:min-h-80",
        cover ? "p-2 h-48 md:h-80" : "p-4",
      )}
    >
      {cover ? (
        <div className="flex flex-col items-start gap-3 w-full mx-auto overflow-hidden squircle-xl md:squircle-3xl rounded-2xl">
          {purchaseUrl ? (
            <Link href={purchaseUrl} className="w-full">
              <Image
                width={1200}
                height={630}
                className="size-full h-48 md:h-72 object-cover transition-all duration-800 ease hover:scale-105"
                alt={title ?? ""}
                src={getImageUrl(cover)}
                loading="lazy"
                sizes={
                  isWide
                    ? "(max-width: 768px) 100vw, 66vw"
                    : "(max-width: 768px) 100vw, 33vw"
                }
              />
            </Link>
          ) : (
            <Dialog>
              <DialogTrigger asChild>
                <button
                  type="button"
                  className="w-full text-left"
                  aria-label={`View ${title}`}
                >
                  <Image
                    width={1200}
                    height={630}
                    className="size-full h-48 md:h-72 object-cover transition-all duration-800 ease hover:scale-105"
                    alt={title ?? ""}
                    src={getImageUrl(cover)}
                    loading="lazy"
                    sizes={
                      isWide
                        ? "(max-width: 768px) 100vw, 66vw"
                        : "(max-width: 768px) 100vw, 33vw"
                    }
                  />
                </button>
              </DialogTrigger>
              <DialogContent
                size="full"
                className="max-w-6xl p-2 sm:p-3"
                variant="glass"
              >
                <div className="w-full h-full max-h-[85vh] overflow-hidden rounded-xl pointer-events-none">
                  <Image
                    width={1920}
                    height={1080}
                    className="w-full h-full max-h-[85vh] object-contain pointer-events-none"
                    alt={title ?? ""}
                    src={getImageUrl(cover)}
                    loading="lazy"
                    sizes="100vw"
                  />
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      ) : (
        <div className="flex w-full">
          <PreviewContent
            emoji={coverText?.emoji ?? "🛠️"}
            title={coverText?.title ?? title ?? ""}
            description={coverText?.description ?? ""}
          />
        </div>
      )}
    </div>
  );
}
