"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  SparklesTwo,
  LightbulbTwoPower,
  Bug,
  Wrench,
  Calendar,
  Sparkles,
  FilterOne,
} from "@aurthle/icons";
import { SectionLayout } from "@/components/shared/sections/layout";
import {
  getAllChangelog,
  getFilteredChangelog,
  getChangelogTypeCounts,
} from "@/integrations/content/lib";
import { MarkdownContentRender } from "@/components/shared/pages/shared/markdown-content-render";
import { ReactionBar } from "@/components/shared/reactions/ReactionBar";
import { ChangelogItemType, DEFAULT_COLOR_CODE_NAME, PageType } from "@/types";
import { cn } from "@/utils/utils";
import { Changelog } from "@/integrations/content/types";
import { pickRandomColor } from "@/utils";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogSeparator,
} from "@/components/ui/dialog";

export function TimelineSection() {
  const [selectedType, setSelectedType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [changelogData, setChangelogData] = React.useState<Changelog[]>([]);
  const [typeCounts, setTypeCounts] = React.useState<Record<string, number>>({
    all: 0,
    milestone: 0,
    feature: 0,
    fix: 0,
    improvement: 0,
  });

  React.useEffect(() => {
    const loadData = async () => {
      const data: Changelog[] = await getAllChangelog();
      setChangelogData(data);
      const counts = await getChangelogTypeCounts();
      setTypeCounts(counts);
    };
    loadData();
  }, []);

  const filteredChangelog = useMemo(() => {
    if (!changelogData.length) return [];

    return changelogData.filter((entry) => {
      if (selectedType !== "all" && entry.type !== selectedType) {
        return false;
      }
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const versionMatch = entry.version.toLowerCase().includes(query);
        const bodyMatch = entry.body?.toLowerCase().includes(query) || false;
        return versionMatch || bodyMatch;
      }
      return true;
    });
  }, [changelogData, selectedType, searchQuery]);

  const typeIcons = {
    milestone: SparklesTwo,
    feature: LightbulbTwoPower,
    fix: Bug,
    improvement: Wrench,
  };

  const clearFilters = () => {
    setSelectedType("all");
    setSearchQuery("");
  };

  return (
    <>
      {/* Filter Modal */}
      <Dialog open={isFilterModalOpen} onOpenChange={setIsFilterModalOpen}>
        <DialogContent
          size="lg"
          variant="modern"
          className="flex flex-col gap-6"
        >
          <DialogHeader>
            <DialogTitle>Filter Changelog</DialogTitle>
          </DialogHeader>

          <DialogSeparator />

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2 justify-center">
            {(
              Object.values(ChangelogItemType) as (keyof typeof typeIcons)[]
            ).map((type) => {
              const Icon = typeIcons[type as keyof typeof typeIcons];
              return (
                <Button
                  key={type}
                  variant={selectedType === type ? "default" : "outline"}
                  size="xs"
                  onClick={() => setSelectedType(type)}
                  className="capitalize"
                  asIcon
                  asPointer
                >
                  {Icon && (
                    <Badge
                      className={cn(
                        pickRandomColor(DEFAULT_COLOR_CODE_NAME.VIOLET),
                        "size-max text-primary-foreground!",
                        "px-0.5 py-1 text-[.625rem]",
                      )}
                      variant="colored"
                      size="xs"
                      circle
                    >
                      <Icon size={16} variant="bulk" />
                    </Badge>
                  )}
                  {type}
                  <Badge
                    className={cn(
                      pickRandomColor(DEFAULT_COLOR_CODE_NAME.YELLOW),
                      "px-1 py-0.5 text-[.625rem]",
                      "size-max",
                    )}
                    variant="colored"
                    size="xs"
                    circle
                  >
                    {typeCounts[type]}
                  </Badge>
                </Button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full">
            <Input
              type="text"
              placeholder="Search releases..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-4"
            />
          </div>

          <DialogSeparator />

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => {
                clearFilters();
                setIsFilterModalOpen(false);
              }}
              asPointer
              whileTap
            >
              Clear Filters
            </Button>
            <Button
              onClick={() => setIsFilterModalOpen(false)}
              asPointer
              whileTap
            >
              Apply Filters
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Filter Button */}
      <SectionLayout isFlex className="p-0!">
        <div className="flex justify-center w-full">
          <Button
            onClick={() => setIsFilterModalOpen(true)}
            variant={
              selectedType !== "all" || searchQuery ? "default" : "outline"
            }
            size="lg"
            asIcon
            asPointer
            whileTap
            className="gap-2"
          >
            <FilterOne size={20} variant="bulk" />
            Filters
            {(selectedType !== "all" || searchQuery) && (
              <Badge variant="white" size="xs" circle className="ml-1">
                {Object.keys(filteredChangelog).length}
              </Badge>
            )}
          </Button>
        </div>
      </SectionLayout>

      {/* Timeline Section */}
      <SectionLayout isFlex>
        {filteredChangelog.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-lg text-muted-foreground">
              No releases found matching your criteria.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSelectedType("all");
                setSearchQuery("");
              }}
              className="mt-4"
            >
              Clear filters
            </Button>
          </div>
        ) : (
          <div className="space-y-20 w-full max-w-5xl">
            {(() => {
              // Group by year
              const groupedByYear = filteredChangelog.reduce(
                (acc, entry) => {
                  const year = new Date(entry.date).getFullYear();
                  if (!acc[year]) acc[year] = [];
                  acc[year].push(entry);
                  return acc;
                },
                {} as Record<number, typeof filteredChangelog>,
              );

              return Object.entries(groupedByYear)
                .sort(([a], [b]) => Number(b) - Number(a))
                .map(([year, entries]) => (
                  <div key={year} className="w-full">
                    {/* Year Header */}
                    <div className="flex items-center gap-4 mb-12">
                      <h2 className="text-3xl font-bold text-foreground">
                        {year}
                      </h2>
                      <div className="flex-1 h-px bg-b-base" />
                      <Badge className="text-sm">
                        {entries.length} release
                        {entries.length !== 1 ? "s" : ""}
                      </Badge>
                    </div>

                    {/* Timeline for this year */}
                    <div className="relative space-y-20 w-full">
                      {entries.map((entry, index) => {
                        const Icon =
                          typeIcons[entry.type as keyof typeof typeIcons];
                        const isLatest =
                          index === 0 &&
                          year ===
                            String(
                              new Date(
                                filteredChangelog[0]?.date || Date.now(),
                              ).getFullYear(),
                            );

                        return (
                          <div
                            key={entry.version}
                            className="relative flex items-start gap-6 group"
                          >
                            {/* Timeline Dot */}
                            <div className="hidden md:flex items-center justify-center shrink-0 z-10">
                              <Badge
                                className={cn(
                                  "capitalize text-xs font-medium",
                                  pickRandomColor(
                                    DEFAULT_COLOR_CODE_NAME.VIOLET,
                                  ),
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
                                <div className="relative h-64 w-full [corner-shape:squircle] rounded-t-xl md:rounded-t-3xl overflow-hidden">
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
                                          pickRandomColor(
                                            DEFAULT_COLOR_CODE_NAME.VIOLET,
                                          ),
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
                                        {new Date(
                                          entry.date,
                                        ).toLocaleDateString("en-US", {
                                          month: "long",
                                          day: "numeric",
                                          year: "numeric",
                                        })}
                                      </time>
                                    </div>
                                    {isLatest && (
                                      <Badge
                                        className={cn(
                                          pickRandomColor(
                                            DEFAULT_COLOR_CODE_NAME.ORANGE,
                                          ),
                                        )}
                                        variant="colored"
                                      >
                                        Latest
                                      </Badge>
                                    )}
                                  </div>
                                  <Badge
                                    className={cn(
                                      "capitalize squircle-border-2 squircle-border-sh-white",
                                      entry.type ===
                                        ChangelogItemType.MILESTONE &&
                                        pickRandomColor(
                                          DEFAULT_COLOR_CODE_NAME.PINKISH_ORANGE,
                                        ),
                                      entry.type ===
                                        ChangelogItemType.FEATURE &&
                                        pickRandomColor(
                                          DEFAULT_COLOR_CODE_NAME.PINKISH_PURPLE,
                                        ),
                                      entry.type === ChangelogItemType.FIX &&
                                        pickRandomColor(
                                          DEFAULT_COLOR_CODE_NAME.PINKISH_PINK,
                                        ),
                                      entry.type ===
                                        ChangelogItemType.IMPROVEMENT &&
                                        pickRandomColor(
                                          DEFAULT_COLOR_CODE_NAME.PINKISH_BLUE,
                                        ),
                                      // "size-max text-primary-foreground!",
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
                                <ReactionBar
                                  pageType={PageType.CHANGELOG}
                                  entityId={entry.version}
                                />
                              </CardContent>
                            </Card>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ));
            })()}
          </div>
        )}
      </SectionLayout>
    </>
  );
}
