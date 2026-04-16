"use client";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SectionBase } from "@/components/shared/pages/shared/section-base";
import { Calendar, Eye, HourglassFill } from "@aurthle/icons";
import { cn } from "@/utils/utils";
import { PreviewContentType, PageType } from "@/types";
import {
  HeaderPreviewCard,
  PreviewContent,
  TextPreviewContent,
} from "@/components/shared/pages/shared/page/header-preview-card";
import { formatCount, getDate } from "@/utils";
import { useTranslations } from "use-intl";

interface HeaderSectionProps {
  // Preview Content
  previewContent?: PreviewContent;

  // Main Title
  mainTitle?: string;

  // Tags
  tags?: { name: string }[];

  // Slug
  slug?: string;

  // Thought details : Date  + Min read + Views
  thoughtDetails?: {
    date?: string;
    readingTime?: string;
    views?: number;
  };

  // Optional custom node to display views (e.g., dynamic client badge)
  viewsNode?: React.ReactNode;

  // Optional CSS Classes
  className?: string;
  sectionClassName?: string;
  cardClassName?: string;
}

export function HeaderSection({
  previewContent: initPreviewContent,
  mainTitle,
  tags,
  thoughtDetails,
  slug,
}: HeaderSectionProps) {
  const t = useTranslations();

  const basePreviewContent = {
    type: PreviewContentType.TEXT,
    emoji: t("common.page-sections.preview.emoji"),
    title: t("common.page-sections.preview.title"),
    subtitle: t("common.page-sections.preview.description"),
  } as TextPreviewContent;

  const previewContent = initPreviewContent || basePreviewContent;

  return (
    <SectionBase
      sectionClassName="p-0 mt-16 mb-10 md:mb-20"
      isWide
      cardClassName="w-full"
      cardContentClassName="px-4 md:px-12 py-6 md:py-12"
    >
      {/* Header Preview Card */}
      <Card className="w-full squircle squircle-sh-white squircle-smooth-xl squircle-xl md:squircle-4xl overflow-hidden p-3 md:p-5">
        <CardContent
          className={cn(
            "w-full squircle squircle-b-base squircle-smooth-xl squircle-xl md:squircle-3xl overflow-hidden flex flex-col justify-center",
            previewContent.type === PreviewContentType.TEXT ||
              previewContent.type === PreviewContentType.CUSTOM
              ? "text-center md:px-12 py-16 md:py-20 min-h-[300px]"
              : "p-0",
          )}
        >
          <HeaderPreviewCard content={previewContent} />
        </CardContent>
      </Card>

      <h1 className="h3 w-full font-normals relative">{mainTitle}</h1>

      {thoughtDetails && Object.keys(thoughtDetails).length > 0 && (
        <div className="flex flex-wrap items-center gap-2 px-1 py-1 w-full overflow-hidden [&_svg]:size-auto">
          <div className="flex flex-wrap items-start gap-1.5">
            {thoughtDetails.date && (
              <Badge
                className="squircle squircle-violet-100 squircle-smooth-xl squircle-3xl md:squircle-5xl"
                variant="colored"
                size="md"
              >
                <span className="flex items-center gap-2">
                  <Calendar
                    size={16}
                    className="text-indigo-400"
                    variant="bulk"
                  />
                  {getDate({ date: thoughtDetails.date })}
                </span>
              </Badge>
            )}

            <Badge
              className="squircle squircle-violet-100 squircle-smooth-xl squircle-3xl md:squircle-5xl"
              variant="colored"
              size="md"
            >
              <span className="flex items-center gap-2">
                <HourglassFill
                  size={16}
                  className="text-indigo-400"
                  variant="bulk"
                />
                {thoughtDetails.readingTime}
              </span>
            </Badge>

            <Badge
              className="squircle squircle-violet-100 squircle-smooth-xl squircle-3xl md:squircle-5xl"
              variant="colored"
              size="md"
            >
              <span className="flex items-center gap-2">
                {getDate({ date: thoughtDetails.date })}
              </span>
            </Badge>
          )}

          <Badge
            className="squircle squircle-violet-100 squircle-smooth-xl squircle-3xl md:squircle-5xl"
            variant="colored"
            size="md"
          >
            <span className="flex items-center gap-2">
              <HourglassFill
                size={16}
                className="text-indigo-400"
                variant="bulk"
              />
              {thoughtDetails.readingTime}
            </span>
          </Badge>

          <Badge
            className="squircle squircle-violet-100 squircle-smooth-xl squircle-3xl md:squircle-5xl"
            variant="colored"
            size="md"
          >
            <span className="flex items-center gap-2">
              <Eye size={16} className="text-indigo-400" variant="bulk" />
              {formatCount(thoughtDetails.views ?? 0)}{" "}
              {t("common.stats.views")}
            </span>
          </Badge>
        </div>
      )}

      {tags && tags.length > 0 && (
        <div className="flex flex-wrap items-start gap-1.5 px-1 py-1 w-full squircle squircle-smooth-xl squircle-2xl md:squircle-7xl squircle-sh-white overflow-hidden">
          {tags.map((tag, index) => (
            <Badge key={index} size="sm">
              {tag.name || (tag as unknown as string)}
            </Badge>
          ))}
        </div>
      )}
    </SectionBase>
  );
}
