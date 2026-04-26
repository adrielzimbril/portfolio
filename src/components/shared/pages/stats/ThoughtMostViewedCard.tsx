"use client";
import { motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import {
  cn,
  formatCount,
  getImageUrl,
  getResourcesUrl,
  pickRandomColor,
} from "@/utils";
import { DEFAULT_COLOR_CODE_NAME, PageType } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, LinkDiagonalOne } from "@aurthle/icons";
import { Link } from "@/components/ui/link";
import { useTranslations } from "use-intl";

interface ThoughtMostViewedCardProps {
  title: string;
  slug: string;
  coverImage?: string;
  views: number;
  delay?: number;
}

export function ThoughtMostViewedCard({
  title,
  slug,
  coverImage,
  views,
  delay = 0,
}: ThoughtMostViewedCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const t = useTranslations();

  return (
    <Card
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="squircle size-full md:col-span-8 squircle-b-base squircle-6xl squircle-smooth-xl border-0 overflow-hidden"
    >
      <CardContent className="grid grid-cols-1 px-4 md:px-6 py-4 md:py-6 gap-4 h-full">
        <div
          className={cn(
            "flex relative flex-col size-full items-center justify-start p-4 squircle squircle-smooth-xl squircle-2xl md:squircle-4xl squircle-sh-white overflow-hidden",
          )}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div
            animate={{
              rotate: isHovered ? -8 : -18,
              scale: isHovered ? 1.1 : 1,
              y: isHovered ? -10 : 0,
            }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="absolute -bottom-4 -right-14 text-[12rem] leading-none opacity-10"
          >
            📋
          </motion.div>

          <Link
            href={getResourcesUrl(PageType.THOUGHT, slug)}
            className="block w-full"
          >
            <div className="relative h-[280px] shrink-0">
              <motion.div
                animate={{
                  rotate: isHovered ? -1 : -5,
                  x: isHovered ? -3 : -8,
                  y: isHovered ? 3 : 5,
                }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="absolute inset-4 rounded-lg bg-b-base"
              />

              <motion.div
                animate={{
                  rotate: isHovered ? 0.5 : 1.5,
                  y: isHovered ? -4 : 0,
                }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="absolute inset-4 flex flex-col overflow-hidden rounded-lg border-2 border-b-base bg-sh-white"
              >
                <div className="flex shrink-0 items-center gap-1.5 border-b border-b-base bg-sh-white px-3 py-2">
                  <div className="h-2 w-2 rounded-full bg-red-300" />
                  <div className="h-2 w-2 rounded-full bg-yellow-300" />
                  <div className="h-2 w-2 rounded-full bg-green-300" />
                  <div className="ml-2 h-2 flex-1 rounded bg-border-primary/30" />
                </div>

                <div className="relative h-[100px] w-full shrink-0 overflow-hidden">
                  {coverImage ? (
                    <Image
                      src={getImageUrl(coverImage)}
                      alt={title}
                      fill
                      className="object-cover object-top"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-b-base">
                      <span className="text-sm">{t("stats.cards.mostViewed.noImage")}</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-2">
                    <p className="line-clamp-2 text-[8px] font-bold leading-tight text-white">
                      {title}
                    </p>
                  </div>
                </div>

                <div className="flex-1 space-y-2 overflow-hidden bg-sh-white p-2.5">
                  <div className="space-y-1">
                    <div className="h-[5px] w-full rounded-sm bg-b-base" />
                    <div className="h-[5px] w-full rounded-sm bg-b-base" />
                    <div className="h-[5px] w-[92%] rounded-sm bg-b-base" />
                    <div className="h-[5px] w-[85%] rounded-sm bg-b-base" />
                  </div>
                  <div className="space-y-1">
                    <div className="h-[5px] w-full rounded-sm bg-b-base/90" />
                    <div className="h-[5px] w-full rounded-sm bg-b-base/90" />
                    <div className="h-[5px] w-[78%] rounded-sm bg-b-base/90" />
                  </div>
                  <div className="rounded bg-b-base p-1.5">
                    <div className="space-y-1">
                      <div className="h-[4px] w-[60%] rounded-sm bg-sh-white" />
                      <div className="h-[4px] w-[75%] rounded-sm bg-sh-white" />
                      <div className="h-[4px] w-[45%] rounded-sm bg-sh-white" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="h-[5px] w-full rounded-sm bg-b-base/90" />
                    <div className="h-[5px] w-[88%] rounded-sm bg-b-base/90" />
                  </div>
                </div>
              </motion.div>

              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-32 bg-linear-to-t from-sh-white via-sh-white/80 to-transparent transition-colors group-hover:from-white group-hover:via-white/80" />
            </div>
          </Link>
          <div className="relative z-20 flex flex-col items-start justify-between gap-4 md:gap-6 size-full">
            <div className="flex flex-col items-start justify-center gap-4">
              <Badge className={cn("relative font-medium")} size="xl">
                {t("stats.cards.mostViewed.badge")}
              </Badge>
              <Link
                href={getResourcesUrl(PageType.THOUGHT, slug)}
                className="flex flex-col items-start justify-center gap-4"
              >
                <h6 className="hidden h4 font-medium">{t("stats.cards.mostViewed.badge")}</h6>
                <p className="w-full relative text-xl line-clamp-3 leading-[120%] font-medium text-b-white-invert-sec">
                  {title}
                </p>
              </Link>
            </div>

            <div className="flex w-full items-center justify-between gap-2">
              <div className="flex items-center justify-between gap-3">
                <Badge
                  className={cn(
                    pickRandomColor(DEFAULT_COLOR_CODE_NAME.VIOLET),
                    "size-max text-primary-foreground",
                  )}
                  contentClassName={cn("font-bold tabular-nums tracking-tight")}
                  variant="colored"
                  size="md"
                >
                  <span className="flex items-center gap-1">
                    <Eye size={16} variant="bulk" />
                    {/* {views} */}
                    {formatCount(views)} {t("common.stats.views")}
                  </span>
                </Badge>
              </div>
              <Link
                href={getResourcesUrl(PageType.HUB, slug)}
                likeButton
                whileTap
                size="xs"
                asIcon
              >
                <span className="flex items-center gap-1">
                  {t("common.button.read")}
                  <LinkDiagonalOne size={16} />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
