"use client";

import React, { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Sparkles, Wrench, Bug, Zap } from "lucide-react";
import { changelog } from "@/data/personal/changelog";
import { cn } from "@/utils/utils";

export default function ChangelogPage() {
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
            entry.changes.some((change) => change.toLowerCase().includes(query))
          );
        }
        return true;
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
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
    <div className="min-h-screen bg-b-base">
      {/* Hero Section */}
      <div className="border-b border-border/30 bg-linear-to-b from-b-sh-white/50 to-b-base">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/30 bg-b-base px-4 py-2 text-sm">
              <span className="text-2xl">📝</span>
              <span className="text-muted-foreground">
                {changelog.length} releases
              </span>
            </div>
            <h1 className="text-4xl font-bold mb-4 text-foreground md:text-5xl">
              Changelog
            </h1>
            <p className="text-lg text-muted-foreground">
              Track the evolution of this portfolio with detailed release notes
              and improvements.
            </p>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="border-b border-border/30 bg-b-base/50 backdrop-blur-sm sticky top-0 z-20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2">
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
              })}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
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
        </div>
      </div>

      {/* Timeline */}
      <div className="container mx-auto px-4 py-12">
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
          <div className="space-y-20">
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
                  <div key={year}>
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
                    <div className="relative space-y-16 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-border/30">
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
                            key={entry.id}
                            className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
                          >
                            {/* Dot */}
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-border bg-b-base shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-colors duration-300 group-hover:border-primary group-hover:bg-primary/10">
                              {Icon && (
                                <Icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                              )}
                            </div>

                            {/* Content */}
                            <Card className="squircle squircle-b-base squircle-smooth-xl squircle-6xl w-[calc(100%-4rem)] md:w-[45%] transition-all duration-300 hover:squircle-border-primary hover:squircle-sh-white">
                              <CardContent className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                  <div className="flex items-center gap-2">
                                    <time className="text-sm font-bold text-muted-foreground">
                                      {new Date(entry.date).toLocaleDateString(
                                        "en-US",
                                        {
                                          month: "long",
                                          day: "numeric",
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
                                      "capitalize text-[10px] font-bold tracking-widest px-2 py-0",
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
      </div>
    </div>
  );
}
