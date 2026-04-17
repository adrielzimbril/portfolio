"use client";

import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  SparklesTwo,
  LightbulbTwoPower,
  Bug,
  Wrench,
  Calendar,
} from "@aurthle/icons";
import { MarkdownContentRender } from "@/components/shared/pages/shared/markdown-content-render";
import { ReactionBar } from "@/components/shared/pages/shared/reactions/ReactionBar";
import { ChangelogItemType, DEFAULT_COLOR_CODE_NAME, PageType } from "@/types";
import { cn } from "@/utils/utils";
import { Changelog } from "@/integrations/content/types";
import { pickRandomColor } from "@/utils";
import { useTranslations } from "use-intl";

interface TimelineEntryProps {
  entry: Changelog;
  isLatest: boolean;
}

const typeIcons = {
  milestone: SparklesTwo,
  feature: LightbulbTwoPower,
  fix: Bug,
  improvement: Wrench,
};

export function TimelineEntry({ entry, isLatest }: TimelineEntryProps) {
  const t = useTranslations("changelog.sections.timeline.entry");
  const Icon = typeIcons[entry.type as keyof typeof typeIcons];

  const getColorForType = (type: ChangelogItemType) => {
    switch (type) {
      case ChangelogItemType.MILESTONE:
        return pickRandomColor(DEFAULT_COLOR_CODE_NAME.PINKISH_ORANGE);
      case ChangelogItemType.FEATURE:
        return pickRandomColor(DEFAULT_COLOR_CODE_NAME.PINKISH_PURPLE);
      case ChangelogItemType.FIX:
        return pickRandomColor(DEFAULT_COLOR_CODE_NAME.PINKISH_PINK);
      case ChangelogItemType.IMPROVEMENT:
        return pickRandomColor(DEFAULT_COLOR_CODE_NAME.PINKISH_BLUE);
      default:
        return "";
    }
  };

  return (
    <div className="relative flex items-start gap-6 group">
      {/* Timeline Dot */}
      <div className="hidden md:flex items-center justify-center shrink-0 z-10">
        <Badge
          className={cn(
            "capitalize text-xs font-medium",
            pickRandomColor(DEFAULT_COLOR_CODE_NAME.VIOLET),
            "size-max text-primary-foreground!",
          )}
          size="lg"
          variant="colored"
          circle
        >
          {Icon && <Icon size={24} variant="bulk" />}
        </Badge>
      </div>

      {/* Content Card */}
      <Card className="squircle squircle-b-base squircle-smooth-xl squircle-6xl flex-1 transition-all duration-300 overflow-hidden">
        {entry.cover && (
          <div className="relative h-72 w-full [corner-shape:squircle] rounded-t-xl md:rounded-t-3xl overflow-hidden">
            <Image
              src={entry.cover}
              alt={entry.version}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-b-base to-transparent" />
          </div>
        )}
        <CardContent className="p-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Badge
                  className={cn(
                    pickRandomColor(DEFAULT_COLOR_CODE_NAME.VIOLET),
                    "px-1 py-0.5",
                    "size-max text-primary-foreground!",
                  )}
                  variant="colored"
                  size="xs"
                  circle
                >
                  <Calendar size={16} variant="bulk" />
                </Badge>

                <time className="text-sm font-medium text-muted-foreground">
                  {new Date(entry.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
              </div>
              {isLatest && (
                <Badge
                  className={cn(
                    pickRandomColor(DEFAULT_COLOR_CODE_NAME.ORANGE),
                  )}
                  variant="colored"
                >
                  {t("latest")}
                </Badge>
              )}
            </div>
            <Badge
              className={cn(
                "capitalize squircle-border-2 squircle-border-sh-white",
                getColorForType(entry.type),
              )}
              variant="colored"
            >
              {entry.type}
            </Badge>
          </div>
          <h3 className="text-2xl font-bold mb-6 text-foreground">
            {entry.version}
          </h3>
          <MarkdownContentRender content={entry.body} />
          <ReactionBar pageType={PageType.CHANGELOG} entityId={entry.version} />
        </CardContent>
      </Card>
    </div>
  );
}
