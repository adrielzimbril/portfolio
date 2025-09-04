import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SectionBase } from "@/components/shared/pages/shared/section-base";
import { Calendar, Eye, HourglassFill } from "@aurthle/icons";
import { cn } from "@/utils/utils";
import { PreviewContentType } from "@/types";
import {
  HeaderPreviewCard,
  PreviewContent,
  TextPreviewContent,
} from "@/components/shared/pages/shared/page/header-preview-card";
import { getDate } from "@/utils";

interface HeaderSectionProps {
  // Preview Content
  previewContent?: PreviewContent;

  // Main Title
  mainTitle?: string;

  // Tags
  tags?: { name: string }[];

  // Article details : Date  + Min read + Views
  articleDetails?: {
    date?: string;
    minRead?: string;
    views?: string;
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
  tags,
  articleDetails,
}: HeaderSectionProps) {
  return (
    <SectionBase
      sectionClassName="p-0 mt-20 mb-10 md:mb-20"
      isWide
      cardClassName="w-full"
      cardContentClassName="px-4 md:px-12 py-6 md:py-12"
    >
      {/* Header Preview Card */}
      <Card className="w-full squircle squircle-white squircle-smooth-xl squircle-2xl md:squircle-4xl overflow-hidden p-3 md:p-5">
        <CardContent
          className={cn(
            "w-full squircle squircle-stone-100 squircle-smooth-xl squircle-xl md:squircle-3xl overflow-hidden flex flex-col justify-center",
            previewContent.type === PreviewContentType.TEXT ||
              previewContent.type === PreviewContentType.CUSTOM
              ? "text-center md:px-12 py-16 md:py-20 min-h-[300px]"
              : "p-0"
          )}
        >
          <HeaderPreviewCard content={previewContent} />
        </CardContent>
      </Card>

      <h1 className="h3 w-full font-normals relative">{mainTitle}</h1>

      {articleDetails && Object.keys(articleDetails).length > 0 && (
        <div className="flex flex-wrap items-start gap-1.5 px-1 py-1 w-full overflow-hidden [&_svg]:size-auto">
          {articleDetails.date && (
            <Badge
              className="squircle squircle-violet-100 squircle-smooth-xl squircle-5xl"
              variant="colored"
              size="md"
            >
              <span className="flex items-center gap-2">
                <Calendar className="size-4 text-indigo-400" variant="bulk" />
                {getDate({ date: articleDetails.date, iso: false })}
              </span>
            </Badge>
          )}
          {articleDetails.minRead && (
            <Badge
              className="squircle squircle-violet-100 squircle-smooth-xl squircle-5xl"
              variant="colored"
              size="md"
            >
              <span className="flex items-center gap-2">
                <HourglassFill
                  className="size-4 text-indigo-400"
                  variant="bulk"
                />
                {articleDetails.minRead} min read
              </span>
            </Badge>
          )}
          {articleDetails.views && (
            <Badge
              className="squircle squircle-violet-100 squircle-smooth-xl squircle-5xl"
              variant="colored"
              size="md"
            >
              <span className="flex items-center gap-2">
                <Eye className="size-4 text-indigo-400" variant="bulk" />
                {articleDetails.views} views
              </span>
            </Badge>
          )}
        </div>
      )}

      {tags && tags.length > 0 && (
        <div className="flex flex-wrap items-start gap-1.5 px-1 py-1 w-full squircle squircle-smooth-xl squircle-2xl md:squircle-7xl squircle-white overflow-hidden">
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
