import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SectionBase } from "@/components/shared/pages/shared/section-base";
import { Link } from "@/components/ui/link";
import { cn } from "@/utils/utils";

import { ResourceHeaderTag } from "@/types/componentType";
import { PreviewContentType } from "@/types/enum";
import {
  HeaderPreviewCard,
  TextPreviewContent,
  PreviewContent,
} from "@/components/shared/pages/shared/page/header-preview-card";

interface HeaderSectionProps {
  // Preview Content
  previewContent?: PreviewContent;

  // Main Title
  mainTitle?: string;

  // Description
  description?: string;

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

export function HeaderSection({
  previewContent = {
    type: PreviewContentType.TEXT,
    emoji: "😎",
    title: "I made you looked.",
    subtitle: "You can have the rest of the empty space here.",
  } as TextPreviewContent,
  mainTitle,
  description,
  tags,
  ctaButton = {
    text: "Obtenir 🚀",
    href: "#contact",
  },
  sectionClassName,
}: HeaderSectionProps) {
  return (
    <SectionBase
      sectionClassName={cn("p-0 mt-20 mb-10 md:mb-20", sectionClassName)}
      isWide
      cardClassName="w-full"
      cardContentClassName="md:px-12 py-6 md:py-12"
    >
      {/* Header Preview Card */}
      <Card className="w-full squircle squircle-white squircle-smooth-xl squircle-6xl overflow-hidden p-5">
        <CardContent
          className={cn(
            "w-full squircle squircle-stone-100 squircle-smooth-xl squircle-5xl overflow-hidden flex flex-col justify-center",
            previewContent.type === PreviewContentType.TEXT ||
              previewContent.type === PreviewContentType.CUSTOM
              ? "text-center md:px-12 py-16 md:py-20 min-h-[300px]"
              : "p-0"
          )}
        >
          <HeaderPreviewCard content={previewContent} />
        </CardContent>
      </Card>

      <h1 className={cn("h2 w-full relative", !description && "font-normal")}>
        {mainTitle}
      </h1>

      {description && <p className="text-zinc-600">{description}</p>}

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
