"use client";
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
import { getResourceAskUrl, pickRandomColor } from "@/utils";
import { DEFAULT_CATEGORY_COLOR_NAME } from "@/types/default";
import { Button } from "@/components/ui/button";
import { useScrollTo } from "@/hooks/useScrollTo";
import { ResourceType } from "@/types/enum";
import {
  ProductTypeSubscribersBadge,
  ProductTitleRequestsBadge,
  ProductAvatarsStats,
} from "@/components/SubscriberBadges";
import { PreviewIcon } from "@/components/shared/pages/shared/preview";

interface HeaderSectionProps {
  // Preview Content
  previewContent?: PreviewContent;

  // Main Title
  mainTitle?: string;

  // Description
  description?: string;

  // Resource Type
  type?: ResourceType;

  // Tags
  tags?: {
    name: string;
    color: string;
  }[];

  // CTA Button
  ctaButton?: string;
  ctaButtonText: string;

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
  type,
  ctaButton,
  ctaButtonText,
  sectionClassName,
}: HeaderSectionProps) {
  const scrollTo = useScrollTo();
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
          <HeaderPreviewCard content={previewContent} type={type} />
        </CardContent>
      </Card>

      <h1 className={cn("h2 w-full relative", !description && "font-normal")}>
        {mainTitle}
      </h1>

      {description && <p className="text-zinc-600">{description}</p>}

      {tags && tags.length > 0 && (
        <div className="flex flex-wrap items-start gap-1.5 px-1 py-1 w-full squircle squircle-smooth-xl squircle-2xl md:squircle-7xl squircle-white overflow-hidden">
          {mainTitle && type && (
            <ProductAvatarsStats
              colorName="squircle-indigo-100"
              title={mainTitle}
              type={type}
            />
          )}
          {tags.map((tag, index) => (
            <Badge
              key={index}
              className={pickRandomColor(
                tag.color as DEFAULT_CATEGORY_COLOR_NAME
              )}
              variant="colored"
              size="sm"
            >
              {tag.name}
            </Badge>
          ))}
        </div>
      )}
      {ctaButton && (!type ? ctaButton.startsWith("http") : true) ? (
        <div className="relative w-full">
          <Link
            href={type ? getResourceAskUrl(ctaButton) : ctaButton}
            className="w-full font-bold text-2xl py-5"
            size="lg"
            likeButton
            asFull
            data-project-url={type ? getResourceAskUrl(ctaButton) : ctaButton}
          >
            <span>{ctaButtonText}</span>
          </Link>
        </div>
      ) : (
        <div className="relative w-full">
          <Button
            onClick={() => scrollTo("gallery-section")}
            className="w-full font-bold text-2xl py-5"
            size="lg"
            asFull
            asPointer
            data-scroll-to="gallery-section"
          >
            <span>{ctaButtonText}</span>
          </Button>
        </div>
      )}
    </SectionBase>
  );
}
