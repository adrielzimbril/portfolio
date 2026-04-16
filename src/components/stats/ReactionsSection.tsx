"use client";

import { motion } from "motion/react";
import { useState } from "react";
import type { ReactionType } from "@/lib/stats/types";
import { cn } from "@/utils/utils";
import { pickRandomColor } from "@/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DEFAULT_COLOR_CODE_NAME_LIST } from "@/types";
import {
  pickRandomColorCode,
} from "@/utils/pick-random-color";

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

interface ReactionCardProps {
  type: ReactionType;
  count: number;
  delay?: number;
}

function ReactionCard({ type, count, delay = 0 }: ReactionCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const config = REACTION_CONFIG[type];

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
            {config.Icon}
          </motion.div>

          <div className="relative w-full flex flex-col gap-2 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.3,
                delay,
              }}
              whileHover={{ scale: 1.2 }}
              className="text-4xl mb-2"
            >
              {config.Icon}
            </motion.div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: delay + 0.1 }}
              className="text-2xl font-bold tabular-nums text-foreground"
            >
              {count.toLocaleString()}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: delay + 0.2 }}
              className="text-xs text-muted-foreground"
            >
              {config.label}
            </motion.span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface ReactionsSectionProps {
  reactions: Record<ReactionType, number>;
  delay?: number;
}

export function ReactionsSection({
  reactions,
  delay = 0,
}: ReactionsSectionProps) {
  const total = Object.values(reactions).reduce((sum, count) => sum + count, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {(Object.keys(REACTION_CONFIG) as ReactionType[]).map((type, index) => (
        <ReactionCard
          key={type}
          type={type}
          count={reactions[type] || 0}
          delay={delay + index * 0.1}
        />
      ))}
    </div>
  );
}
