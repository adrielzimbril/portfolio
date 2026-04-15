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
} from "@aurthle/icons";
import { SectionLayout } from "@/components/shared/sections/layout";
import {
  getAllChangelog,
  getFilteredChangelog,
  getChangelogTypeCounts,
} from "@/integrations/content/lib";
import { MarkdownContentRender } from "@/components/shared/pages/shared/markdown-content-render";
import { cn } from "@/utils/utils";

export function TimelineSection() {
  const [selectedType, setSelectedType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [changelogData, setChangelogData] = React.useState<any[]>([]);
  const [typeCounts, setTypeCounts] = React.useState<Record<string, number>>({
    all: 0,
    milestone: 0,
    feature: 0,
    fix: 0,
    improvement: 0,
  });

  React.useEffect(() => {
    const loadData = async () => {
      const data = await getAllChangelog();
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

  return (
    <>
      {/* Filters Section */}
      <SectionLayout isFlex className="pb-0!">
        <div className="w-full max-w-4xl space-y-6">
          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2 justify-center">
            {(
              ["all", "milestone", "feature", "fix", "improvement"] as const
            ).map((type) => {
              const Icon = typeIcons[type as keyof typeof typeIcons];
              return (
                <Button
                  key={type}
                  variant={selectedType === type ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedType(type)}
                  className="capitalize"
                >
                  {Icon && <Icon size={16} className="mr-2" />}
                  {type}
                  <Badge
                    variant="secondary"
                    className="ml-2 h-5 px-1.5 text-[10px]"
                  >
                    {typeCounts[type]}
                  </Badge>
                </Button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full max-w-md mx-auto">
            <Input
              type="text"
              placeholder="Search releases..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-4"
            />
          </div>
        </div>
      </SectionLayout>

      {/* Timeline Section */}
      <SectionLayout
        title="Timeline"
        description="Track the evolution of this portfolio"
        isFlex
      >
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
                      <div className="flex-1 h-px bg-border/30" />
                      <Badge variant="secondary" className="text-sm">
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
                              new Date(filteredChangelog[0].date).getFullYear(),
                            );

                        return (
                          <div
                            key={entry.version}
                            className="relative flex items-start gap-6 group"
                          >
                            {/* Timeline Dot */}
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-border bg-b-base shrink-0 z-10 transition-colors duration-300 group-hover:border-primary group-hover:bg-primary/10">
                              {Icon && (
                                <Icon
                                  size={16}
                                  className="text-muted-foreground group-hover:text-primary transition-colors"
                                />
                              )}
                            </div>

                            {/* Content Card */}
                            <Card className="squircle squircle-b-base squircle-smooth-xl squircle-6xl flex-1 transition-all duration-300 hover:squircle-border-primary hover:squircle-sh-white overflow-hidden">
                              {entry.cover && (
                                <div className="relative h-64 w-full overflow-hidden">
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
                                  <div className="flex items-center gap-3">
                                    <Calendar
                                      size={16}
                                      className="text-muted-foreground"
                                    />
                                    <time className="text-sm font-medium text-muted-foreground">
                                      {new Date(entry.date).toLocaleDateString(
                                        "en-US",
                                        {
                                          month: "long",
                                          day: "numeric",
                                          year: "numeric",
                                        },
                                      )}
                                    </time>
                                    {isLatest && (
                                      <Badge className="bg-primary text-primary-foreground">
                                        Latest
                                      </Badge>
                                    )}
                                  </div>
                                  <Badge
                                    variant="outline"
                                    className={cn(
                                      "capitalize text-[10px] font-bold tracking-widest px-3 py-1",
                                      entry.type === "milestone" &&
                                        "bg-primary/10 text-primary border-primary/20",
                                      entry.type === "feature" &&
                                        "bg-green-500/10 text-green-500 border-green-500/20",
                                      entry.type === "fix" &&
                                        "bg-red-500/10 text-red-500 border-red-500/20",
                                      entry.type === "improvement" &&
                                        "bg-blue-500/10 text-blue-500 border-blue-500/20",
                                    )}
                                  >
                                    {entry.type}
                                  </Badge>
                                </div>
                                <h3 className="text-2xl font-bold mb-6 text-foreground">
                                  {entry.version}
                                </h3>
                                <MarkdownContentRender content={entry.body} />
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
