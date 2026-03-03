"use client";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SectionBase } from "@/components/shared/pages/shared/section-base";
import { Link } from "@/components/ui/link";
import { cn } from "@/utils/utils";
import { PreviewContentType } from "@/types/enum";
import {
  HeaderPreviewCard,
  TextPreviewContent,
  PreviewContent,
} from "@/components/shared/pages/shared/page/header-preview-card";
import { pickRandomColor } from "@/utils";
import { DEFAULT_CATEGORY_COLOR_NAME } from "@/types/default";
import { ProductAvatarsStats } from "@/components/SubscriberBadges";
import { useTranslations } from "use-intl";
import { useIsMobile } from "@/hooks/useIsMobile";

interface HeaderSectionProps {
  // Preview Content
  previewContent?: PreviewContent;

  // Main Title
  mainTitle?: string;

  // Main Slug
  slug: string;

  // Description
  description?: string;

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
  previewContent: initPreviewContent,
  mainTitle,
  slug,
  description,
  tags,
  ctaButton,
  ctaButtonText,
  sectionClassName,
}: HeaderSectionProps) {
  const t = useTranslations();

  const basePreviewContent = {
    type: PreviewContentType.TEXT,
    emoji: t("common.page-sections.preview.emoji"),
    title: t("common.page-sections.preview.title"),
    subtitle: t("common.page-sections.preview.description"),
  } as TextPreviewContent;

  const previewContent = initPreviewContent || basePreviewContent;
  const isMobile = useIsMobile();

  return (
    <SectionBase
      sectionClassName={cn("p-0 mt-16 mb-10 md:mb-20", sectionClassName)}
      isWide
      cardClassName="w-full"
      cardContentClassName="px-4 md:px-12 py-6 md:py-12"
    >
      {/* Header Preview Card */}
      <Card className="w-full squircle squircle-sh-white squircle-smooth-xl squircle-4xl md:squircle-6xl overflow-hidden p-2 md:p-5">
        <CardContent
          className={cn(
            "w-full squircle squircle-b-base squircle-smooth-xl squircle-3xl md:squircle-5xl overflow-hidden flex flex-col justify-center",
            previewContent.type === PreviewContentType.TEXT ||
              previewContent.type === PreviewContentType.CUSTOM
              ? "text-center md:px-12 py-16 md:py-20 min-h-[300px]"
              : "p-0",
          )}
        >
          <HeaderPreviewCard content={previewContent} />
        </CardContent>
      </Card>

      <h1 className={cn("h2 w-full relative", !description && "font-normal")}>
        {mainTitle}
      </h1>

      {description && <p className="text-b-white-invert-sec">{description}</p>}

      {tags && tags.length > 0 && (
        <div className="flex flex-wrap items-start gap-1.5 px-1 py-1 w-full squircle squircle-smooth-xl squircle-2xl md:squircle-7xl squircle-sh-white overflow-hidden">
          {/* {mainTitle && (
            <ProductAvatarsStats
              colorName="squircle-indigo-100"
              slug={slug}
              badgeClassName="text-b-white-unchanged"
            />
          )} */}
          {tags.map((tag, index) => (
            <Badge
              key={index}
              className={pickRandomColor(
                tag.color as DEFAULT_CATEGORY_COLOR_NAME,
              )}
              variant="colored"
              size="sm"
            >
              {tag.name}
            </Badge>
          ))}
        </div>
      )}
      {ctaButton && (
        <div className="relative w-full">
          <Link
            href={ctaButton}
            className="w-full font-bold md:text-2xl md:py-5"
            size={isMobile ? "default" : "lg"}
            likeButton
            asFull
          >
            <span>{ctaButtonText}</span>
          </Link>
        </div>
      )}
    </SectionBase>
  );
}
