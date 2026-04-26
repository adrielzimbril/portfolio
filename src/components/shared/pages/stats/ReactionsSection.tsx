"use client";
import { motion } from "motion/react";
import { useState } from "react";
import { useTranslations } from "next-intl";
import type { ReactionType } from "@/lib/stats/types";
import { cn } from "@/utils/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const REACTION_CONFIG: Record<
  ReactionType,
  {
    Icon: string;
    labelKey: string;
  }
> = {
  like: {
    Icon: "👍",
    labelKey: "stats.reactions.like",
  },
  heart: {
    Icon: "❤️",
    labelKey: "stats.reactions.heart",
  },
  celebrate: {
    Icon: "🎉",
    labelKey: "stats.reactions.celebrate",
  },
  insightful: {
    Icon: "💡",
    labelKey: "stats.reactions.insightful",
  },
  sceptic: {
    Icon: "🤔",
    labelKey: "stats.reactions.sceptic",
  }
};

interface ReactionCardProps {
  type: ReactionType;
  count: number;
  delay?: number;
}

function ReactionCard({ type, count, delay = 0 }: ReactionCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const t = useTranslations();
  const config = REACTION_CONFIG[type];

  return (
    <Card
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="squircle size-full squircle-b-base squircle-6xl squircle-smooth-xl border-0 overflow-hidden"
    >
      <CardContent className="grid grid-cols-1 p-4 gap-4 h-full">
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
            className="pointer-events-none absolute -bottom-6 -right-6 text-[6rem] leading-none opacity-10"
          >
            {config.Icon}
          </motion.div>

          <div className="relative w-full flex flex-col gap-2">
            <div
              className={cn(
                "relative flex flex-row items-center gap-2 md:gap-4",
              )}
            >
              <Badge
                className={cn(
                  "capitalize text-xs font-medium",
                  "size-max text-primary-foreground",
                )}
                size="lg"
                circle
              >
                <span className="text-2xl">{config.Icon}</span>
              </Badge>
              <div className="flex flex-col items-start gap-2">
                <h6 className="tracking-wide">{t(config.labelKey)}</h6>
                <p className="text-sm text-b-white-invert-thr leading-[120%]">
                  {count.toLocaleString()}
                </p>
              </div>
            </div>
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
