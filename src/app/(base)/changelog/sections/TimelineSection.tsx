"use client";

import React, { useState, useMemo } from "react";
import { SectionLayout } from "@/components/shared/sections/layout";
import {
  getAllChangelog,
  getChangelogTypeCounts,
} from "@/integrations/content/lib";
import { Changelog } from "@/integrations/content/types";
import { FilterModal } from "@/components/shared/pages/changelog/FilterModal";
import { FilterButton } from "@/components/shared/pages/changelog/FilterButton";
import { TimelineEntry } from "@/components/shared/pages/changelog/TimelineEntry";
import { TimelineYearHeader } from "@/components/shared/pages/changelog/TimelineYearHeader";
import { EmptyState } from "@/components/shared/pages/changelog/EmptyState";

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

  const clearFilters = () => {
    setSelectedType("all");
    setSearchQuery("");
  };

  const hasActiveFilters = selectedType !== "all" || searchQuery;

  return (
    <>
      {/* Filter Modal */}
      <FilterModal
        isOpen={isFilterModalOpen}
        onOpenChange={setIsFilterModalOpen}
        selectedType={selectedType}
        onTypeChange={setSelectedType}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onClearFilters={clearFilters}
        typeCounts={typeCounts}
      />

      {/* Filter Button */}
      <SectionLayout isFlex className="p-0!">
        <div className="flex justify-center w-full">
          <FilterButton
            onClick={() => setIsFilterModalOpen(true)}
            hasActiveFilters={Boolean(hasActiveFilters)}
            resultCount={filteredChangelog.length}
          />
        </div>
      </SectionLayout>

      {/* Timeline Section */}
      <SectionLayout isFlex>
        {filteredChangelog.length === 0 ? (
          <EmptyState onClearFilters={clearFilters} />
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
                    <TimelineYearHeader
                      year={Number(year)}
                      count={entries.length}
                    />

                    {/* Timeline for this year */}
                    <div className="relative space-y-20 w-full">
                      {entries.map((entry, index) => {
                        const isLatest =
                          index === 0 &&
                          year ===
                            String(
                              new Date(
                                filteredChangelog[0]?.date || Date.now(),
                              ).getFullYear(),
                            );

                        return (
                          <TimelineEntry
                            key={entry.version}
                            entry={entry}
                            isLatest={isLatest}
                          />
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
