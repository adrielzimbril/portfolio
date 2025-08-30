import Image from "next/image";
import { PreviewContentType } from "@/types";

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
export function HeaderPreviewCard({ content }: { content: PreviewContent }) {
  switch (content.type) {
    case PreviewContentType.TEXT:
      return (
        <>
          <h3 className="h2 w-full relative mb-4">
            {content.emoji && (
              <>
                {content.emoji}
                <br />
              </>
            )}
            {content.title}
          </h3>
          {content.subtitle && (
            <p className="relative text-4xl text-zinc-400">
              {content.subtitle}
            </p>
          )}
        </>
      );

    case PreviewContentType.IMAGE:
      return (
        <div className="w-full h-full flex flex-col items-center justify-center">
          <Image
            src={content.src}
            alt={content.alt}
            width={600}
            height={400}
            className="w-full h-full object-contain rounded-lg"
          />
        </div>
      );

    case PreviewContentType.VIDEO:
      return (
        <div className="w-full h-full flex flex-col items-center justify-center">
          <video
            src={content.src}
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
      return content.content;

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
