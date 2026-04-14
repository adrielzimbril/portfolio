"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/utils/utils";
import type { LighthouseScores } from "@/lib/stats/types";

interface LighthouseScoreCardProps {
  scores: LighthouseScores;
  strategy: "mobile" | "desktop";
  className?: string;
}

function getScoreColor(score: number) {
  if (score >= 90) {
    return {
      bar: "bg-emerald-500",
      barBg: "bg-emerald-100",
      text: "text-emerald-600",
    };
  }
  if (score >= 50) {
    return {
      bar: "bg-amber-500",
      barBg: "bg-amber-100",
      text: "text-amber-600",
    };
  }
  return {
    bar: "bg-red-500",
    barBg: "bg-red-100",
    text: "text-red-600",
  };
}

export function LighthouseScoreCard({
  scores,
  strategy,
  className,
}: LighthouseScoreCardProps) {
  const scoreItems = [
    { score: scores.performance, label: "Performance" },
    { score: scores.accessibility, label: "Accessibility" },
    { score: scores.bestPractices, label: "Best Practices" },
    { score: scores.seo, label: "SEO" },
  ];

  return (
    <Card className={cn("w-full", className)}>
      <CardContent className="p-5">
        <div className="mb-4 flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-amber-100 to-orange-100">
            {strategy === "mobile" ? (
              <svg
                className="h-4 w-4 text-amber-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
            ) : (
              <svg
                className="h-4 w-4 text-amber-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            )}
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              {strategy === "mobile" ? "Mobile" : "Desktop"}
            </h3>
            <p className="text-[10px] text-muted-foreground">Lighthouse</p>
          </div>
        </div>

        <div className="grid flex-1 grid-cols-2 gap-x-4 gap-y-3">
          {scoreItems.map((item) => {
            const colors = getScoreColor(item.score);
            return (
              <div key={item.label} className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground">
                    {item.label}
                  </span>
                  <span
                    className={cn(
                      "text-sm font-bold tabular-nums",
                      colors.text,
                    )}
                  >
                    {item.score}
                  </span>
                </div>
                <div
                  className={cn(
                    "h-2 w-full overflow-hidden rounded-full",
                    colors.barBg,
                  )}
                >
                  <div
                    style={{ width: `${item.score}%` }}
                    className={cn("h-full rounded-full", colors.bar)}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
