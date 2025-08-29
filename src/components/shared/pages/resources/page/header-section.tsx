import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SectionBase } from "@/components/shared/pages/shared/section-base";
import { Link } from "@/components/ui/link";
import { cn } from "@/lib/utils";
import Image from "next/image";

import { ResourceHeaderTag } from "@/types/componentType";

/**
 * Preview Content Types
 */
type PreviewContentType = "text" | "image" | "video" | "custom";

interface BasePreviewContent {
  type: PreviewContentType;
}

interface TextPreviewContent extends BasePreviewContent {
  type: "text";
  emoji?: string;
  title?: string;
  subtitle?: string;
}

interface ImagePreviewContent extends BasePreviewContent {
  type: "image";
  src: string;
  alt: string;
  caption?: string;
}

interface VideoPreviewContent extends BasePreviewContent {
  type: "video";
  src: string;
  poster?: string;
  caption?: string;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
}

interface CustomPreviewContent extends BasePreviewContent {
  type: "custom";
  content: React.ReactNode;
}

type PreviewContent =
  | TextPreviewContent
  | ImagePreviewContent
  | VideoPreviewContent
  | CustomPreviewContent;

interface HeaderSectionProps {
  // Preview Content
  previewContent?: PreviewContent;

  // Main Title
  mainTitle?: string;

  // Tags
  tags?: ResourceHeaderTag[];

  // CTA Button
  ctaButton?: {
    text: string;
    href: string;
  };

  // Optional CSS Classes
  className?: string;
  sectionClassName?: string;
  cardClassName?: string;
}

// Function to render preview content
const renderPreviewContent = (content: PreviewContent) => {
  switch (content.type) {
    case "text":
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

    case "image":
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

    case "video":
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

    case "custom":
      return content.content;

    default:
      return null;
  }
};

export function HeaderSection({
  previewContent = {
    type: "text",
    emoji: "😎",
    title: "I made you looked.",
    subtitle: "You can have the rest of the empty space here.",
  } as TextPreviewContent,
  mainTitle = "Design System × Product Thinking",
  tags,
  ctaButton = {
    text: "Obtenir 🚀",
    href: "#contact",
  },
}: HeaderSectionProps) {
  return (
    <SectionBase
      sectionClassName="p-0 mt-20 mb-10 md:mb-20"
      isWide
      cardClassName="w-full"
      cardContentClassName="md:px-12 py-6 md:py-12"
    >
      {/* Header Preview Card */}
      <Card className="w-full squircle squircle-white squircle-smooth-xl squircle-6xl overflow-hidden p-5">
        <CardContent
          className={cn(
            "w-full squircle squircle-stone-100 squircle-smooth-xl squircle-5xl overflow-hidden flex flex-col justify-center",
            previewContent.type === "text" || previewContent.type === "custom"
              ? "md:px-12 py-16 md:py-20 min-h-[300px]"
              : "p-0"
          )}
        >
          {renderPreviewContent(previewContent)}
        </CardContent>
      </Card>

      <h1 className="h2 w-full font-normal relative">{mainTitle}</h1>

      {tags && tags.length > 0 && (
        <div className="flex flex-wrap items-start gap-1.5 px-1 py-1 w-full squircle squircle-smooth-xl squircle-7xl squircle-white overflow-hidden">
          {tags.map((tag, index) => (
            <Badge
              key={index}
              className={tag.bgColor}
              variant="colored"
              size="sm"
            >
              {tag.text}
            </Badge>
          ))}
        </div>
      )}

      {ctaButton && (
        <div className="relative w-full">
          <Link
            href={ctaButton.href}
            className="w-full font-bold text-2xl py-5"
            size="lg"
            likeButton
            asFull
          >
            <span>{ctaButton.text}</span>
          </Link>
        </div>
      )}
    </SectionBase>
  );
}
