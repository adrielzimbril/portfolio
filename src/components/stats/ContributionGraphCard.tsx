"use client";

import { motion } from "motion/react";
import { useState, useEffect } from "react";
import type { ContributionData, ContributionDay } from "@/lib/stats/types";
import { usePerformanceMode } from "@/hooks/usePerformanceMode";
import { cn } from "@/utils/utils";

interface ContributionGraphCardProps {
  contributions: ContributionData;
  delay?: number;
  className?: string;
}

const CONTRIBUTION_LEVEL_COLORS = {
  NONE: "squircle-border",
  FIRST_QUARTILE: "squircle-primary/30",
  SECOND_QUARTILE: "squircle-primary/50",
  THIRD_QUARTILE: "squircle-primary/70",
  FOURTH_QUARTILE: "squircle-primary",
} as const;

const levelColorsHover = {
  NONE: "group-hover/cell:squircle-border/80",
  FIRST_QUARTILE: "group-hover/cell:squircle-primary/40",
  SECOND_QUARTILE: "group-hover/cell:squircle-primary/60",
  THIRD_QUARTILE: "group-hover/cell:squircle-primary/80",
  FOURTH_QUARTILE: "group-hover/cell:squircle-primary/90",
};

function formatDate(dateString: string): string {
  const parts = dateString.split("-").map(Number);
  const year = parts[0];
  const month = parts[1];
  const day = parts[2];
  if (year === undefined || month === undefined || day === undefined) {
    return dateString;
  }
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function ContributionGraphCard({
  contributions,
  delay = 0,
  className,
}: ContributionGraphCardProps) {
  const { shouldReduceAnimations } = usePerformanceMode();
  const [isHovered, setIsHovered] = useState(false);
  const [displayCount, setDisplayCount] = useState(0);
  const [tooltip, setTooltip] = useState<{
    day: ContributionDay;
    x: number;
    y: number;
  } | null>(null);

  useEffect(() => {
    if (shouldReduceAnimations) {
      setDisplayCount(contributions.totalContributions);
      return;
    }

    const duration = 1500;
    const startTime = performance.now();
    const startDelay = delay * 1000;

    let rafId: number;

    const animateCount = (currentTime: number) => {
      const elapsed = currentTime - startTime - startDelay;

      if (elapsed < 0) {
        rafId = requestAnimationFrame(animateCount);
        return;
      }

      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayCount(Math.floor(eased * contributions.totalContributions));

      if (progress < 1) {
        rafId = requestAnimationFrame(animateCount);
      }
    };

    rafId = requestAnimationFrame(animateCount);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [contributions.totalContributions, delay, shouldReduceAnimations]);

  const getMonthLabels = () => {
    const months: { label: string; index: number }[] = [];
    let currentMonth = -1;

    contributions.weeks.forEach((week, weekIndex) => {
      const firstDay = week.contributionDays[0];
      if (firstDay) {
        const date = new Date(firstDay.date);
        const month = date.getMonth();
        if (month !== currentMonth) {
          currentMonth = month;
          months.push({
            label: date.toLocaleDateString("en-US", { month: "short" }),
            index: weekIndex,
          });
        }
      }
    });

    return months;
  };

  const monthLabels = getMonthLabels();
  const cardClassName = cn(
    "group relative flex h-full min-h-[220px] flex-col overflow-hidden squircle-border-border squircle-b-base p-6 transition-all duration-300 hover:squircle-border-primary hover:squircle-sh-white",
    "squircle squircle-smooth-xl squircle-6xl",
    className,
  );

  if (shouldReduceAnimations) {
    return (
      <div className={cardClassName}>
        <div className="pointer-events-none absolute inset-0 z-10 squircle-2xl squircle-linear-to-tl from-primary/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="relative z-20 mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <svg
                className="h-5 w-5 text-primary"
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
                      <div key={dayIndex} className="group/cell relative">
                        <div
                          className={cn(
                            "h-[10px] w-[10px] rounded-[2px] transition-colors duration-150",
                            CONTRIBUTION_LEVEL_COLORS[day.contributionLevel],
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
                <div key={weekIndex} className="flex flex-col gap-[3px]">
                  {week.contributionDays.map((day, dayIndex) => (
                    <div
                      key={dayIndex}
                      className="group/cell relative aspect-square"
                    >
                      <div
                        className={cn(
                          "h-full w-full rounded-sm transition-colors duration-150",
                          CONTRIBUTION_LEVEL_COLORS[day.contributionLevel],
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
              className={cn(
                "h-[10px] w-[10px] rounded-[2px]",
                CONTRIBUTION_LEVEL_COLORS[level],
              )}
            />
          ))}
          <span>More</span>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={cardClassName}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setTooltip(null);
      }}
    >
      <div className="pointer-events-none absolute inset-0 z-10 squircle-2xl squircle-linear-to-tl from-primary/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative z-20 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ y: isHovered ? -2 : 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10"
          >
            <svg
              className="h-5 w-5 text-primary"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
            </svg>
          </motion.div>
          <div>
            <h2 className="font-medium text-foreground">Contributions</h2>
            <p className="text-sm text-muted-foreground">This year</p>
          </div>
        </div>
        <motion.div
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="text-right"
        >
          <span className="text-2xl font-semibold tracking-tight text-foreground">
            {displayCount.toLocaleString()}
          </span>
          <p className="text-xs text-muted-foreground">contributions</p>
        </motion.div>
      </div>

      <div className="relative z-20 mt-2 flex-1">
        <div className="overflow-x-auto md:hidden">
          <div className="w-fit">
            <div
              className="mb-1 flex text-[10px] text-muted-foreground"
              style={{ paddingLeft: "28px" }}
            >
              <div className="flex" style={{ gap: "2px" }}>
                {contributions.weeks.map((week, weekIndex) => {
                  const showMonth = monthLabels.some(
                    (m) => m.index === weekIndex,
                  );
                  const monthLabel = showMonth
                    ? monthLabels.find((m) => m.index === weekIndex)?.label
                    : "";
                  return (
                    <div key={weekIndex} className="w-[10px] text-center">
                      {monthLabel && (
                        <span className="whitespace-nowrap">{monthLabel}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex gap-[2px]">
              <div
                className="flex w-6 shrink-0 flex-col text-[9px] text-muted-foreground"
                style={{ gap: "2px" }}
              >
                <div className="h-[10px]" />
                <div className="flex h-[10px] items-center">Mon</div>
                <div className="h-[10px]" />
                <div className="flex h-[10px] items-center">Wed</div>
                <div className="h-[10px]" />
                <div className="flex h-[10px] items-center">Fri</div>
                <div className="h-[10px]" />
              </div>
              <div className="flex" style={{ gap: "2px" }}>
                {contributions.weeks.map((week, weekIndex) => (
                  <motion.div
                    key={weekIndex}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.3,
                      delay: delay + 0.3 + weekIndex * 0.005,
                      ease: "easeOut",
                    }}
                    className="flex flex-col"
                    style={{ gap: "2px" }}
                  >
                    {week.contributionDays.map((day, dayIndex) => (
                      <div
                        key={dayIndex}
                        className="group/cell relative"
                        onMouseEnter={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          setTooltip({
                            day,
                            x: rect.left + rect.width / 2,
                            y: rect.top,
                          });
                        }}
                        onMouseLeave={() => setTooltip(null)}
                      >
                        <div
                          className={`h-[10px] w-[10px] rounded-[2px] transition-colors duration-150 ${CONTRIBUTION_LEVEL_COLORS[day.contributionLevel]} ${levelColorsHover[day.contributionLevel]}`}
                        />
                      </div>
                    ))}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="hidden md:block">
          <div
            className="mb-1 flex text-[10px] text-muted-foreground"
            style={{ paddingLeft: "28px" }}
          >
            <div className="flex flex-1 justify-between">
              {monthLabels.map((month, i) => (
                <span key={i}>{month.label}</span>
              ))}
            </div>
          </div>

          <div className="flex gap-[3px]">
            <div className="flex w-6 shrink-0 flex-col justify-between py-[2px] text-[9px] text-muted-foreground">
              <span></span>
              <span>Mon</span>
              <span></span>
              <span>Wed</span>
              <span></span>
              <span>Fri</span>
              <span></span>
            </div>
            <div
              className="grid flex-1"
              style={{
                gridTemplateColumns: `repeat(${contributions.weeks.length}, 1fr)`,
                gap: "3px",
              }}
            >
              {contributions.weeks.map((week, weekIndex) => (
                <motion.div
                  key={weekIndex}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.3,
                    delay: delay + 0.3 + weekIndex * 0.005,
                    ease: "easeOut",
                  }}
                  className="flex flex-col gap-[3px]"
                >
                  {week.contributionDays.map((day, dayIndex) => (
                    <div
                      key={dayIndex}
                      className="group/cell relative aspect-square"
                      onMouseEnter={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        setTooltip({
                          day,
                          x: rect.left + rect.width / 2,
                          y: rect.top,
                        });
                      }}
                      onMouseLeave={() => setTooltip(null)}
                    >
                      <div
                        className={`h-full w-full rounded-sm transition-colors duration-150 lg:rounded ${CONTRIBUTION_LEVEL_COLORS[day.contributionLevel]} ${levelColorsHover[day.contributionLevel]}`}
                      />
                    </div>
                  ))}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-20 mt-3 flex items-center justify-center gap-1 text-[10px] text-muted-foreground md:justify-end">
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
            className={`h-[10px] w-[10px] rounded-[2px] ${CONTRIBUTION_LEVEL_COLORS[level]}`}
          />
        ))}
        <span>More</span>
      </div>

      {tooltip && (
        <div
          className="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-full rounded-lg bg-foreground px-3 py-2 text-xs text-background shadow-lg"
          style={{ left: tooltip.x, top: tooltip.y - 8 }}
        >
          <div className="font-medium">
            {tooltip.day.contributionCount} contribution
            {tooltip.day.contributionCount !== 1 ? "s" : ""}
          </div>
          <div className="text-muted-foreground">
            {formatDate(tooltip.day.date)}
          </div>
          <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-foreground" />
        </div>
      )}
    </motion.div>
  );
}
