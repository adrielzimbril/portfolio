"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { HeartOne } from "@aurthle/icons";
import type { ReactionType } from "@/lib/stats/types";
import { cn } from "@/utils/utils";
import { pickRandomColor } from "@/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DEFAULT_COLOR_CODE_NAME_LIST } from "@/types";
import { pickRandomColorCode } from "@/utils/pick-random-color";

interface ReactionMiniCardsProps {
  reactions: Record<ReactionType, number>;
  delay?: number;
}

const REACTION_CONFIG: Record<
  ReactionType,
  {
    Icon: string;
    label: string;
    color: DEFAULT_COLOR_CODE_NAME_LIST;
  }
> = {
  like: {
    Icon: "👍",
    label: "Likes",
    color: DEFAULT_COLOR_CODE_NAME_LIST.BLUE,
  },
  heart: {
    Icon: "❤️",
    label: "Hearts",
    color: DEFAULT_COLOR_CODE_NAME_LIST.RED,
  },
  celebrate: {
    Icon: "🎉",
    label: "Celebrates",
    color: DEFAULT_COLOR_CODE_NAME_LIST.YELLOW,
  },
  insightful: {
    Icon: "💡",
    label: "Insightful",
    color: DEFAULT_COLOR_CODE_NAME_LIST.AMBER,
  },
  sceptic: {
    Icon: "🤔",
    label: "Sceptical",
    color: DEFAULT_COLOR_CODE_NAME_LIST.INDIGO,
  },
};

export function ReactionMiniCards({
  reactions,
  delay = 0,
}: ReactionMiniCardsProps) {
  const [isHovered, setIsHovered] = useState(false);
  const total = Object.values(reactions).reduce((sum, count) => sum + count, 0);

  return (
    <Card
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="squircle size-full squircle-b-base squircle-6xl squircle-smooth-xl border-0 overflow-hidden"
    >
      <CardContent className="grid grid-cols-1 px-4 md:px-6 py-4 md:py-6 gap-4 h-full">
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
            className="absolute -bottom-6 -right-6 text-[100px] leading-none opacity-10"
          >
            ❤️
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
                  pickRandomColor(DEFAULT_COLOR_CODE_NAME_LIST.VIOLET),
                  "size-max text-primary-foreground!",
                )}
                size="lg"
                variant="colored"
                circle
              >
                <HeartOne size={32} variant="bulk" />
              </Badge>
              <div className="flex flex-col items-start gap-2">
                <h6 className="tracking-wide">Reactions</h6>
                <p className="text-xs text-muted-foreground">
                  {total.toLocaleString()} total
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {(Object.keys(REACTION_CONFIG) as ReactionType[]).map(
                (type, index) => {
                  const count = reactions[type] || 0;
                  const config = REACTION_CONFIG[type];

                  return (
                    <motion.div
                      key={type}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.3,
                        delay: delay + index * 0.08,
                      }}
                      whileHover={{ scale: 1.05 }}
                      className="group relative flex flex-col items-center justify-center p-3 rounded-xl border border-border/20 bg-b-base/50 hover:bg-b-base/80 transition-colors"
                    >
                      <motion.span
                        className="text-2xl mb-1"
                        animate={{
                          scale: isHovered ? 1.2 : 1,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          damping: 15,
                        }}
                      >
                        {config.Icon}
                      </motion.span>
                      <span className="text-xs font-medium text-foreground">
                        {count.toLocaleString()}
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        {config.label}
                      </span>
                    </motion.div>
                  );
                },
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
