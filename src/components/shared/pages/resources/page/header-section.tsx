import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SectionBase } from "@/components/shared/pages/shared/section-base";
import { Link } from "@/components/ui/link";
import { cn } from "@/lib/utils";
import Image from "next/image";

// Types pour les props
interface Tag {
  text: string;
  bgColor: string;
}

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
  // Contenu de la carte de prévisualisation
  previewContent?: PreviewContent;

  // Titre principal
  mainTitle?: string;

  // Tags
  tags?: Tag[];

  // Bouton CTA
  ctaButton?: {
    text: string;
    href: string;
    variant?:
      | "default"
      | "destructive"
      | "outline"
      | "secondary"
      | "ghost"
      | "link";
    size?: "sm" | "lg" | "default";
  };

  // Classes CSS optionnelles
  className?: string;
  sectionClassName?: string;
  cardClassName?: string;

  // Configuration de la section
  isWide?: boolean;
  marginTop?: string;
  marginBottom?: string;
}

// Tags par défaut
const defaultTags: Tag[] = [
  {
    text: "SaaS 🦄",
    bgColor: "squircle-[#afffad]",
  },
  {
    text: "Go To Market 🎯",
    bgColor: "squircle-[#ffe9ad]",
  },
  {
    text: "Web Application 📝",
    bgColor: "squircle-[#ade9ff]",
  },
  {
    text: "Design 🎨",
    bgColor: "squircle-[#f9f9f9]",
  },
  {
    text: "Mobile App 📱",
    bgColor: "squircle-[#e2e4ff]",
  },
];

// Fonction pour rendre le contenu de prévisualisation
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
            controls={content.controls !== false} // Par défaut true
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
  tags = defaultTags,
  ctaButton = {
    text: "Obtenir 🚀",
    href: "#contact",
    variant: "default",
    size: "lg",
  },
  className,
  sectionClassName,
  cardClassName,
  isWide = true,
  marginTop = "mt-20",
  marginBottom = "mb-10 md:mb-20",
}: HeaderSectionProps) {
  return (
    <SectionBase
      sectionClassName={cn("p-0", marginTop, marginBottom, sectionClassName)}
      isWide={isWide}
      cardClassName={cn("w-full", cardClassName)}
      cardContentClassName="md:px-12 py-6 md:py-12"
    >
      {/* Header Preview Card */}
      <Card
        className={cn(
          "w-full squircle squircle-white squircle-smooth-xl squircle-6xl overflow-hidden p-5",
          className
        )}
      >
        <CardContent
          className={cn(
            "w-full squircle squircle-stone-100 squircle-smooth-xl squircle-5xl overflow-hidden md:px-12 py-16 md:py-20 min-h-[300px] flex flex-col justify-center"
          )}
        >
          {renderPreviewContent(previewContent)}
        </CardContent>
      </Card>

      {/* Header Title */}
      <h1 className="h2 w-full font-normal relative">{mainTitle}</h1>

      {/* Header Tags */}
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

      {/* Header CTA Button */}
      {ctaButton && (
        <div className="relative w-full">
          <Link
            href={ctaButton.href}
            className="w-full font-bold text-2xl py-5"
            variant={ctaButton.variant || "default"}
            size={ctaButton.size || "lg"}
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
