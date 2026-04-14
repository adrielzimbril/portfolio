"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/utils/utils";
import type { ContributionData } from "@/lib/stats/types";

interface ContributionGraphCardProps {
  contributions: ContributionData;
  className?: string;
}

const levelColors = {
  NONE: "bg-gray-200",
  FIRST_QUARTILE: "bg-emerald-200",
  SECOND_QUARTILE: "bg-emerald-400",
  THIRD_QUARTILE: "bg-emerald-500",
  FOURTH_QUARTILE: "bg-emerald-600",
};

export function ContributionGraphCard({
  contributions,
  className,
}: ContributionGraphCardProps) {
  return (
    <Card className={cn("w-full min-h-[220px]", className)}>
      <CardContent className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
              <svg
                className="h-5 w-5 text-emerald-600"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-foreground">Contributions</h3>
              <p className="text-sm text-muted-foreground">This year</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-2xl font-semibold tracking-tight text-foreground">
              {contributions.totalContributions.toLocaleString()}
            </span>
            <p className="text-xs text-muted-foreground">contributions</p>
          </div>
        </div>

        <div className="mt-2 flex-1">
          <div className="overflow-x-auto md:hidden">
            <div className="w-fit">
              <div className="flex gap-[2px]">
                {contributions.weeks.map((week, weekIndex) => (
                  <div
                    key={weekIndex}
                    className="flex flex-col"
                    style={{ gap: "2px" }}
                  >
                    {week.contributionDays.map((day, dayIndex) => (
                      <div
                        key={dayIndex}
                        className="group/cell relative"
                      >
                        <div
                          className={cn(
                            "h-[10px] w-[10px] rounded-[2px] transition-colors duration-150",
                            levelColors[day.contributionLevel]
                          )}
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="flex gap-[3px]">
              {contributions.weeks.map((week, weekIndex) => (
                <div
                  key={weekIndex}
                  className="flex flex-col gap-[3px]"
                >
                  {week.contributionDays.map((day, dayIndex) => (
                    <div
                      key={dayIndex}
                      className="group/cell relative aspect-square"
                    >
                      <div
                        className={cn(
                          "h-full w-full rounded-sm transition-colors duration-150",
                          levelColors[day.contributionLevel]
                        )}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-center gap-1 text-[10px] text-muted-foreground md:justify-end">
          <span>Less</span>
          {(
            [
              "NONE",
              "FIRST_QUARTILE",
              "SECOND_QUARTILE",
              "THIRD_QUARTILE",
              "FOURTH_QUARTILE",
            ] as const
          ).map((level) => (
            <div
              key={level}
              className={cn("h-[10px] w-[10px] rounded-[2px]", levelColors[level])}
            />
          ))}
          <span>More</span>
        </div>
      </CardContent>
    </Card>
  );
}
