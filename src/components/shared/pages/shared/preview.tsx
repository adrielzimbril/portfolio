import Image from "next/image";
import { cn } from "@/utils/utils";
import { ResourceType } from "@/types/enum";
import { getImageUrl } from "@/utils/base-url";
import {
  BookOne,
  ClapperboardPlay,
  MoonZoomView,
  VideoLibrary,
} from "@aurthle/icons";

interface PreviewProps {
  title?: string;
  cover?: string;
  coverText?: { emoji: string; title: string; description: string };
  iconType?: ResourceType;
  icon?: string;
  iconAlt?: string;
  isWide?: boolean;
  resourceType?: ResourceType;
}

export function CardPreview({
  title,
  cover,
  coverText,
  iconType,
  icon = "bold-duotone---school---book.svg",
  iconAlt,
  isWide,
  resourceType,
}: PreviewProps) {
  return (
    <div
      className={cn(
        "flex relative flex-col flex-1 min-h-32 md:min-h-60 items-center justify-center squircle squircle-smooth-xl squircle-xl md:squircle-3xl squircle-white overflow-hidden",
        isWide && "md:min-h-80",
        cover ? "p-2 h-48 md:h-80" : "p-4"
      )}
    >
      {cover ? (
        <div className="flex flex-col items-start gap-3 w-full mx-auto overflow-hidden squircle-xl md:squircle-3xl rounded-2xl">
          <Image
            width={1200}
            height={630}
            className="size-full h-48 md:h-72 object-cover transition-all duration-800 ease hover:scale-105"
            alt={iconAlt ?? ""}
            src={getImageUrl(cover!)}
          />
        </div>
      ) : (
        <PreviewContent
          emoji={coverText?.emoji ?? "😎"}
          title={coverText?.title ?? "I made you looked."}
          description={
            coverText?.description ??
            "You can have the rest of the empty space here."
          }
        />
      )}
      {resourceType && (
        <PreviewIcon
          icon={icon}
          iconAlt={iconAlt}
          title={title}
          resourceType={resourceType}
        />
      )}
    </div>
  );
}

function PreviewContent({
  emoji,
  title,
  description,
}: {
  emoji: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-start gap-3 w-full max-w-[90%] mx-auto">
      <>
        <h4 className="text-3xl tracking-wide leading-[120%]">
          {emoji}
          <br />
          {title}
        </h4>

        <p className="font-medium text-zinc-500 text-2xl leading-[120%]">
          {description}
        </p>
      </>
    </div>
  );
}

function PreviewIcon({ icon, iconAlt, title, resourceType }: PreviewProps) {
  return (
    <div className="inline-flex items-center justify-center gap-3 p-2.5 absolute top-2 right-2 bg-zinc-100 rounded-full overflow-hidden">
      {resourceType === ResourceType.COURSE ? (
        <BookOne size={24} variant="bulk" />
      ) : resourceType === ResourceType.EBOOK ? (
        <ClapperboardPlay size={24} variant="bulk" />
      ) : (
        <VideoLibrary size={24} variant="bulk" />
      )}
    </div>
  );
}
