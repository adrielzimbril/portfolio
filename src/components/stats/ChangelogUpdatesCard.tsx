"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/utils/utils";
import { changelog } from "@/data/personal/changelog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Star, Bug, Wrench } from "@aurthle/icons";
import { DEFAULT_COLOR_CODE_NAME, PageType } from "@/types";
import { pickRandomColor } from "@/utils/pick-random-color";
import { getResourcesUrl } from "@/utils";

interface ChangelogUpdatesCardProps {
  count: number;
}

export function ChangelogUpdatesCard({ count }: ChangelogUpdatesCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const typeIcons = {
    milestone: Sparkles,
    feature: Star,
    fix: Bug,
    improvement: Wrench,
  };

  const typeColors = {
    milestone: "text-primary",
    feature: "text-green-500",
    fix: "text-red-500",
    improvement: "text-blue-500",
  };

  const recentItems = changelog
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 8);

  const getTopPosition = (index: number) => {
    const basePosition = -5;
    const spacing = 42;
    return `${basePosition + index * spacing}px`;
  };

  return (
    <Card
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="squircle size-full squircle-b-base squircle-6xl squircle-smooth-xl border-0 overflow-hidden"
    >
      <CardContent className="size-full grid grid-cols-1 px-4 md:px-6 py-4 md:py-6 gap-4 h-full overflow-hidden">
        <div
          className={cn(
            "flex relative flex-col size-full items-center justify-center gap-4 md:gap-8 p-4 squircle squircle-smooth-xl squircle-2xl md:squircle-4xl squircle-sh-white overflow-hidden",
          )}
        >
          <motion.div
            animate={{
              rotate: isHovered ? -20 : -32,
              scale: isHovered ? 1.1 : 1,
              y: isHovered ? -10 : 0,
            }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="pointer-events-none absolute -bottom-6 -right-6 text-[100px] leading-none opacity-20"
          >
            ✨
          </motion.div>

          <div className="border-px absolute left-1/2 top-0 h-full w-2 -translate-x-1/2 transform border-x border-border/10 bg-border/35" />

          <div className="relative flex-1 items-start w-full">
            <motion.div
              animate={{
                y: isHovered ? -120 : 0,
              }}
              transition={{
                type: "spring",
                stiffness: 60,
                damping: 18,
              }}
              className="absolute left-0 right-0 top-0"
            >
              {recentItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="absolute"
                  style={{
                    top: getTopPosition(index),
                    ...(index % 2 === 1
                      ? { left: "calc(50% + 6px)" }
                      : { right: "calc(50% + 6px)" }),
                  }}
                >
                  <span
                    className={cn(
                      "absolute top-[14px] h-px w-[6px] bg-border",
                      index % 2 === 1 ? "left-[-6px]" : "right-[-6px]",
                    )}
                  />
                  <div className="z-10 inline-block w-[100px] space-y-px squircle squircle-smooth-xl squircle-2xl squircle-sh-white squircle-border squircle-border-2 squircle-border-b-base px-2 py-1.5 text-xs overflow-hidden">
                    <div className="flex items-center gap-1">
                      {(() => {
                        const Icon =
                          typeIcons[item.type as keyof typeof typeIcons];
                        return Icon ? (
                          <Badge className={cn("relative")} size="xs" circle>
                            <Icon
                              className={cn(
                                "p-1",
                                typeColors[
                                  item.type as keyof typeof typeColors
                                ],
                              )}
                              size={12}
                              variant="bulk"
                            />
                          </Badge>
                        ) : null;
                      })()}
                      <p className="overflow-hidden text-ellipsis whitespace-nowrap font-semibold text-foreground">
                        {item.version}
                      </p>
                    </div>
                    <time
                      dateTime={item.date}
                      className="text-[9px] text-muted-foreground"
                    >
                      {new Date(item.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-16 bg-linear-to-b from-b-base/85 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-38 bg-linear-to-t from-b-base via-b-white to-transparent" />

          <div className="relative flex flex-col items-start w-full z-20 mt-auto">
            <div className="relative flex flex-row items-center gap-2 md:gap-4">
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
                <Sparkles size={32} variant="bulk" />
              </Badge>
              <div className="flex flex-col items-start gap-1">
                <h6 className="tracking-wide">Changelog</h6>
                <p className="flex gap-1 text-xs text-muted-foreground">
                  <span className="text-xs text-muted-foreground">
                    {count} updates
                  </span>
                </p>
              </div>
            </div>
          </div>

          <Link
            href={getResourcesUrl(PageType.CHANGELOG)}
            className="absolute size-full left-1/2 top-0"
          />
        </div>
      </CardContent>
    </Card>
  );
}
