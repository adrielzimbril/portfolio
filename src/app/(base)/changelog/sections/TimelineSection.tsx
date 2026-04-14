"use client";

import React, { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Sparkles, Wrench, Bug, Zap } from "lucide-react";
import { SectionLayout } from "@/components/shared/sections/layout";
import { changelog } from "@/data/personal/changelog";
import { cn } from "@/utils/utils";

export function TimelineSection() {
  const [selectedType, setSelectedType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const typeIcons = {
    milestone: Sparkles,
    feature: Zap,
    fix: Bug,
    improvement: Wrench,
  };

  const filteredChangelog = useMemo(() => {
    return changelog
      .filter((entry) => {
        if (selectedType !== "all" && entry.type !== selectedType) {
          return false;
        }
        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          return (
            entry.version.toLowerCase().includes(query) ||
            entry.changes.some((change) =>
              change.toLowerCase().includes(query)
            )
          );
        }
        return true;
      })
      .sort(
        (a, b) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()
      );
  }, [selectedType, searchQuery]);

  const typeCounts = useMemo(() => {
    return {
      all: changelog.length,
      milestone: changelog.filter((e) => e.type === "milestone").length,
      feature: changelog.filter((e) => e.type === "feature").length,
      fix: changelog.filter((e) => e.type === "fix").length,
      improvement: changelog.filter((e) => e.type === "improvement").length,
    };
  }, []);

  return (
    <>
      {/* Filters Section */}
      <SectionLayout isFlex className="pb-0!">
        <div className="w-full max-w-4xl space-y-6">
          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2 justify-center">
            {(["all", "milestone", "feature", "fix", "improvement"] as const).map(
              (type) => {
                const Icon = typeIcons[type as keyof typeof typeIcons];
                return (
                  <Button
                    key={type}
                    variant={selectedType === type ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedType(type)}
                    className="capitalize"
                  >
                    {Icon && <Icon className="mr-2 h-4 w-4" />}
                    {type}
                    <Badge
                      variant="secondary"
                      className="ml-2 h-5 px-1.5 text-[10px]"
                    >
                      {typeCounts[type]}
                    </Badge>
                  </Button>
                );
              }
            )}
          </div>

          {/* Search Input */}
          <div className="relative w-full max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search releases..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
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
          <div className="space-y-20 w-full max-w-4xl">
            {(() => {
              // Group by year
              const groupedByYear = filteredChangelog.reduce((acc, entry) => {
                const year = new Date(entry.date).getFullYear();
                if (!acc[year]) acc[year] = [];
                acc[year].push(entry);
                return acc;
              }, {} as Record<number, typeof filteredChangelog>);

              return Object.entries(groupedByYear)
                .sort(([a], [b]) => Number(b) - Number(a))
                .map(([year, entries]) => (
                  <div key={year} className="w-full">
                    {/* Year Header */}
                    <div className="flex items-center gap-4 mb-12">
                      <h2 className="text-3xl font-bold text-foreground">{year}</h2>
                      <div className="flex-1 h-px bg-border/30" />
                      <Badge variant="secondary" className="text-sm">
                        {entries.length} release{entries.length !== 1 ? "s" : ""}
                      </Badge>
                    </div>

                    {/* Timeline for this year */}
                    <div className="relative space-y-16 w-full">
                      {entries.map((entry, index) => {
                        const Icon = typeIcons[entry.type as keyof typeof typeIcons];
                        const isLatest = index === 0 && year === String(new Date(filteredChangelog[0].date).getFullYear());

                        return (
                          <div
                            key={entry.id}
                            className="relative flex items-start gap-6 group"
                          >
                            {/* Timeline Dot */}
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-border bg-b-base shrink-0 z-10 transition-colors duration-300 group-hover:border-primary group-hover:bg-primary/10">
                              {Icon && (
                                <Icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                              )}
                            </div>

                            {/* Content Card */}
                            <Card className="squircle squircle-b-base squircle-smooth-xl squircle-6xl flex-1 transition-all duration-300 hover:squircle-border-primary hover:squircle-sh-white">
                              <CardContent className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                  <div className="flex items-center gap-2">
                                    <time className="text-sm font-bold text-muted-foreground">
                                      {new Date(entry.date).toLocaleDateString("en-US", {
                                        month: "long",
                                        day: "numeric",
                                      })}
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
                                      "capitalize text-[10px] font-bold tracking-widest px-2 py-0",
                                      entry.type === "milestone" &&
                                        "bg-primary/10 text-primary border-primary/20",
                                      entry.type === "feature" &&
                                        "bg-green-500/10 text-green-500 border-green-500/20",
                                      entry.type === "fix" &&
                                        "bg-red-500/10 text-red-500 border-red-500/20",
                                      entry.type === "improvement" &&
                                        "bg-blue-500/10 text-blue-500 border-blue-500/20"
                                    )}
                                  >
                                    {entry.type}
                                  </Badge>
                                </div>
                                <h3 className="text-xl font-bold mb-4 text-foreground">
                                  {entry.version}
                                </h3>
                                <ul className="space-y-3">
                                  {entry.changes.map((change, i) => (
                                    <li
                                      key={i}
                                      className="text-sm text-muted-foreground flex items-start gap-2"
                                    >
                                      <span className="mt-1.5 size-1.5 rounded-full bg-primary/50 shrink-0" />
                                      {change}
                                    </li>
                                  ))}
                                </ul>
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
