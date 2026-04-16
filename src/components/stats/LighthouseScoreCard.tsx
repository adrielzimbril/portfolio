"use client";

import { useState } from "react";
import { Display, Mobile } from "@aurthle/icons";
import type { LighthouseScores } from "@/lib/stats/types";
import { usePerformanceMode } from "@/hooks/usePerformanceMode";
import { cn } from "@/utils/utils";
import { RadarBackground } from "./LighthouseScoreCard/RadarBackground";
import { PulseRings } from "./LighthouseScoreCard/PulseRings";
import { ScoreBar } from "./LighthouseScoreCard/ScoreBar";
import {
  getScoreColor,
  getOverallScore,
} from "./LighthouseScoreCard/lighthouse-utils";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { DEFAULT_COLOR_CODE_NAME_LIST } from "@/types";
import { pickRandomColor } from "@/utils";

interface LighthouseScoreCardProps {
  scores: LighthouseScores;
  strategy: "mobile" | "desktop";
  delay?: number;
  className?: string;
}

export function LighthouseScoreCard({
  scores,
  strategy,
  delay = 0,
  className,
}: LighthouseScoreCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const scoreItems = [
    { score: scores.performance, label: "Performance" },
    { score: scores.accessibility, label: "Accessibility" },
    { score: scores.bestPractices, label: "Best Practices" },
    { score: scores.seo, label: "SEO" },
  ];

  const scoreValues = [
    scores.performance,
    scores.accessibility,
    scores.bestPractices,
    scores.seo,
  ];

  const overallScore = getOverallScore(scores);
  const overallColors = getScoreColor(overallScore);

  const DeviceIcon = strategy === "mobile" ? Mobile : Display;

  return (
    <>
      <Card
        className={cn(
          "squircle size-full max-w-[95%] squircle-b-base squircle-4xl md:squircle-6xl squircle-smooth-lg border-0 overflow-hidden mx-auto",
          className,
        )}
      >
        <CardContent className="grid grid-cols-1 size-full p-4 gap-2">
          <div
            className={cn(
              "flex relative flex-col gap-4 md:gap-6 items-start justify-between px-4 py-6 md:px-6 md:py-8 squircle squircle-smooth-md squircle-2xl md:squircle-4xl squircle-sh-white overflow-hidden",
            )}
          >
            <RadarBackground scores={scoreValues} />
            <div className="relative flex flex-row z-20 items-center justify-between w-full mx-auto">
              <div className="flex flex-row items-center justify-between w-fit">
                <Badge
                  className={cn(
                    "capitalize text-xs font-medium",
                    pickRandomColor(
                      DEFAULT_COLOR_CODE_NAME_LIST.PINKISH_ORANGE,
                    ),
                    // overallColors.squircle,
                    "size-max text-primary-foreground!",
                  )}
                  variant="colored"
                  size="lg"
                  circle
                >
                  <DeviceIcon
                    className={cn(
                      overallColors.text,
                      "text-primary-foreground!",
                    )}
                    variant="bold"
                  />
                </Badge>
                <Badge className="capitalize" variant="inverted" size="md">
                  <div className="flex items-center gap-3">
                    <div>
                      <h6 className="text-sm font-semibold text-foreground">
                        {strategy === "mobile" ? "Mobile" : "Desktop"}
                      </h6>
                      <p className="text-xs text-muted-foreground">
                        Lighthouse Score
                      </p>
                    </div>
                  </div>
                </Badge>
              </div>
              <Badge
                className={cn(
                  "capitalize",
                  // overallColors.squircle,
                )}
                // variant="colored"
                size="lg"
                circle
              >
                <span
                  className={cn(
                    "text-xl font-bold tabular-nums",
                    "text-primary-foreground",
                    overallColors.text,
                  )}
                >
                  {overallScore}
                </span>
              </Badge>
            </div>

            <div className="flex flex-col z-20 items-start gap-4 md:gap-6 w-full">
              <div className="relative grid flex-1 grid-cols-2 gap-4 w-full">
                {scoreItems.map((item, i) => (
                  <ScoreBar
                    key={item.label}
                    score={item.score}
                    label={item.label}
                    delay={delay + 0.15 + i * 0.08}
                    isHovered={isHovered}
                  />
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

function PreviewIcon({ icon }: { icon: string }) {
  return (
    <div className="inline-flex items-center justify-center gap-3 p-4 aspect-square bg-b-base rounded-full overflow-hidden">
      {/* <Image
        width={100}
        height={100}
        className="size-12 object-cover pointer-events-none"
        alt={icon}
        //src={getImageUrl(getEmojiHub(icon!, "apple"))}
        src={getImageUrl(getEmojiHub(icon!, "fluent", "anim"))}
        //src={{ emoji: icon }}
      /> */}
      <span className="size-full flex items-center justify-center text-4xl object-cover pointer-events-none">
        {icon}
      </span>
    </div>
  );
}

function PreviewContent({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-start gap-4 md:gap-6 w-full">
      <h4 className="text-3xl leading-[120%]">{title}</h4>

      <p className="text-b-white-invert-thr leading-[120%]">{description}</p>
    </div>
  );
}
