"use client";

import { motion } from "motion/react";
import { useState } from "react";
import type { ThoughtMetric } from "@/lib/stats/types";
import { cn } from "@/utils/utils";
import { truncateText } from "@/utils/format-text";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getResourcesUrl, pickRandomColor } from "@/utils";
import {
  DEFAULT_COLOR_CODE_NAME,
  PageType,
  TopThoughtsListType,
} from "@/types";
import { Link } from "@/components/ui/link";

interface TopThoughtsListProps {
  title: string;
  description: string;
  type: TopThoughtsListType;
  thoughts: ThoughtMetric[];
  icon: React.ReactNode;
  decoration: string;
  delay?: number;
  className?: string;
}

export function TopThoughtsList({
  title,
  description,
  type,
  thoughts,
  icon,
  decoration,
}: TopThoughtsListProps) {
  const [isHovered, setIsHovered] = useState(false);
  const config = {
    truncate: {
      type: "char" as const,
      maxLength: 40,
    },
    maxItems: 4,
  };
  const displayThoughts = thoughts.slice(0, config.maxItems);

  return (
    <Card
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="squircle size-full squircle-b-base squircle-6xl squircle-smooth-xl border-0 overflow-hidden"
    >
      <CardContent className="grid grid-cols-1 px-4 md:px-6 py-4 md:py-6 gap-4 h-full">
        <div
          className={cn(
            "flex relative flex-col size-full items-center justify-start gap-4 md:gap-8 p-4 squircle squircle-smooth-xl squircle-2xl md:squircle-4xl squircle-sh-white overflow-hidden",
          )}
        >
          <motion.div
            animate={{
              rotate: isHovered ? -20 : -32,
              scale: isHovered ? 1.1 : 1,
              y: isHovered ? -10 : 0,
            }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="absolute -bottom-6 -right-6 text-[100px] leading-none opacity-10"
          >
            {decoration}
          </motion.div>

          <div className="relative w-full flex flex-col gap-2">
            <div
              className={cn(
                "relative flex flex-row items-center gap-2 md:gap-4 mb-4",
              )}
            >
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
                {icon}
              </Badge>
              <div className="flex flex-col items-start gap-2">
                <h6 className="tracking-wide">{title}</h6>
                <p className="text-xs text-muted-foreground">{description}</p>
              </div>
            </div>

            <div className="flex flex-1 flex-col justify-center space-y-2">
              {displayThoughts.map((thought, index) => {
                return (
                  <div key={thought.slug} className="group/item">
                    <div className="flex items-center gap-3">
                      <Badge
                        className={cn("capitalize text-xs font-medium")}
                        size="sm"
                        variant="primary"
                        circle
                      >
                        {index + 1}
                      </Badge>
                      <Link
                        href={getResourcesUrl(PageType.THOUGHT, thought.slug)}
                        className="flex flex-row w-full items-center justify-between gap-3"
                      >
                        <span className="flex-1 truncate text-sm leading-relaxed">
                          {truncateText(thought.title, config.truncate)}
                        </span>
                      </Link>
                      <Badge
                        className={cn(
                          "capitalize text-xs font-medium",
                          pickRandomColor(
                            type === TopThoughtsListType.VIEWED
                              ? DEFAULT_COLOR_CODE_NAME.VIOLET
                              : DEFAULT_COLOR_CODE_NAME.ORANGE,
                          ),
                          type === TopThoughtsListType.VIEWED &&
                            "size-max text-primary-foreground",
                        )}
                        variant="colored"
                        size="sm"
                      >
                        {thought.count}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>

            {thoughts.length > 5 && (
              <div className="relative flex mt-2">
                <Link
                  href={getResourcesUrl(PageType.THOUGHT)}
                  className="py-1.5"
                  likeButton
                  size="xs"
                  variant="base"
                >
                  <span className="capitalize text-xs">
                    +{thoughts.length - config.maxItems} more
                  </span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
