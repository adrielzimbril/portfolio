"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { cn } from "@/utils/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getResourcesUrl, pickRandomColor } from "@/utils";
import { DEFAULT_COLOR_CODE_NAME, PageType } from "@/types";
import { ChartPresentationOne } from "@aurthle/icons";
import { Link } from "@/components/ui/link";

export interface ThoughtsCategoriesData {
  name: string;
  count: number;
  color?: string;
  icon?: string;
}

interface ThoughtsCategoriesCardProps {
  data: ThoughtsCategoriesData[];
  title: string;
  description: string;
  decorationEmoji: string;
}

export function ThoughtsCategoriesCard({
  data,
  title,
  description,
  decorationEmoji,
}: ThoughtsCategoriesCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const t = useTranslations();
  const config = {
    maxItems: 2,
  };
  const displayData = data.slice(0, config.maxItems);

  return (
    <Card
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="squircle size-full squircle-b-base squircle-6xl squircle-smooth-xl border-0 overflow-hidden"
    >
      <CardContent className="size-full grid grid-cols-1 px-4 md:px-6 py-4 md:py-6 gap-4 h-full overflow-hidden">
        <div
          className={cn(
            "flex relative flex-col size-full items-center justify-center gap-4 md:gap-8 p-4 squircle squircle-smooth-xl squircle-4xl squircle-sh-white overflow-hidden",
          )}
        >
          <motion.div
            animate={{
              rotate: isHovered ? -20 : -32,
              scale: isHovered ? 1.1 : 1,
              y: isHovered ? -10 : 0,
            }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="absolute -bottom-6 -right-6 text-[6rem] leading-none opacity-10"
          >
            {decorationEmoji}
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
                <ChartPresentationOne size={32} variant="bulk" />
              </Badge>
              <div className="flex flex-col items-start gap-2">
                <h6 className="tracking-wide">{title}</h6>
                <p className="text-xs text-muted-foreground">{description}</p>
              </div>
            </div>

            <div className="flex flex-1 flex-col justify-center space-y-1">
              {displayData.map((item, index) => {
                return (
                  <div
                    key={`${item.name}-${index}`}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <span className="truncate text-xs font-medium text-muted-foreground">
                        {item.name}
                      </span>
                    </div>
                    <Badge
                      className={cn(
                        "px-1.5 py-.5 relative font-semibold tabular-nums",
                        pickRandomColor(DEFAULT_COLOR_CODE_NAME.ORANGE),
                      )}
                      size="xs"
                      variant="colored"
                      circle
                    >
                      {item.count.toLocaleString()}
                    </Badge>
                  </div>
                );
              })}
            </div>

            {data.length > config.maxItems && (
              <div className="relative flex mt-2">
                <Link
                  href={getResourcesUrl(PageType.THOUGHT)}
                  className="py-1.5"
                  likeButton
                  size="xs"
                  variant="base"
                >
                  <span className="capitalize text-xs">
                    +{data.length - config.maxItems}{" "}
                    {t("common.button.see-more")}
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
