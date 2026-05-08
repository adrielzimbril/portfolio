import Image from "next/image";
import { PreviewContentType, ResourceType } from "@/types";
import { getImageUrl } from "@/utils/base-url";
import { cn } from "@/utils/utils";

interface BasePreviewContent {
  type: PreviewContentType;
}

interface TextPreviewContent extends BasePreviewContent {
  type: PreviewContentType.TEXT;
  emoji?: string;
  title?: string;
  subtitle?: string;
}

interface ImagePreviewContent extends BasePreviewContent {
  type: PreviewContentType.IMAGE;
  src: string;
  alt: string;
  caption?: string;
}

interface VideoPreviewContent extends BasePreviewContent {
  type: PreviewContentType.VIDEO;
  src: string;
  poster?: string;
  caption?: string;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
}

interface CustomPreviewContent extends BasePreviewContent {
  type: PreviewContentType.CUSTOM;
  content: React.ReactNode;
}

type PreviewContent =
  | TextPreviewContent
  | ImagePreviewContent
  | VideoPreviewContent
  | CustomPreviewContent;

/**
 * Function to render preview content
 */
export function HeaderPreviewCard({
  content,
  type,
}: {
  content: PreviewContent;
  type?: ResourceType;
}) {
  switch (content.type) {
    case PreviewContentType.TEXT:
      return (
        <div className="relative size-full mx-auto transition-all duration-800 hover:scale-105">
          <div className="relative size-full pointer-events-none">
            <h3 className="h2 w-full relative mb-4">
              {content.emoji && (
                <>
                  <span
                    className={cn(
                      "inline-block h2 px-2 py-5 rounded-full bg-sh-white",
                    )}
                  >
                    {content.emoji}
                  </span>
                  <br />
                </>
              )}
              {content.title}
            </h3>
            {content.subtitle && (
              <p className="relative h4 text-zinc-400">{content.subtitle}</p>
            )}
          </div>
        </div>
      );

    case PreviewContentType.IMAGE:
      return (
        <div className="relative w-full h-full min-h-[170px] md:min-h-[500px] md:h-[500px] flex flex-col items-center justify-center overflow-hidden rounded-2xl md:rounded-[2rem]">
          <Image
            src={getImageUrl(content.src)}
            alt={content.alt}
            width={1200}
            height={630}
            className="size-auto min-w-full min-h-full object-cover hover:scale-105 transition-all duration-800 rounded-2xl md:rounded-[2rem]"
            loading="lazy"
            sizes="100vw"
          />
        </div>
      );

    case PreviewContentType.VIDEO:
      return (
        <div className="relative w-full h-full flex flex-col items-center justify-center">
          <video
            src={getImageUrl(content.src)}
            poster={content.poster}
            autoPlay={content.autoplay}
            loop={content.loop}
            muted={content.muted}
            controls={content.controls !== false}
            className="max-w-full max-h-full rounded-lg"
          />
          {content.caption && (
            <p className="text-zinc-400 text-center mt-4 text-lg">
              {content.caption}
            </p>
          )}
        </div>
      );

    case PreviewContentType.CUSTOM:
      return <div className="relative w-full">{content.content}</div>;

    default:
      return null;
  }
}

export type {
  TextPreviewContent,
  ImagePreviewContent,
  VideoPreviewContent,
  CustomPreviewContent,
  PreviewContent,
};
