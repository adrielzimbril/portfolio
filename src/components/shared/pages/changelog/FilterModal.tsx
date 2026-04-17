"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogSeparator,
} from "@/components/ui/dialog";
import { SparklesTwo, LightbulbTwoPower, Bug, Wrench } from "@aurthle/icons";
import { ChangelogItemType, DEFAULT_COLOR_CODE_NAME } from "@/types";
import { cn } from "@/utils/utils";
import { pickRandomColor } from "@/utils";
import { useTranslations } from "use-intl";

interface FilterModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedType: string;
  onTypeChange: (type: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onClearFilters: () => void;
  typeCounts: Record<string, number>;
}

const typeIcons = {
  milestone: SparklesTwo,
  feature: LightbulbTwoPower,
  fix: Bug,
  improvement: Wrench,
};

export function FilterModal({
  isOpen,
  onOpenChange,
  selectedType,
  onTypeChange,
  searchQuery,
  onSearchChange,
  onClearFilters,
  typeCounts,
}: FilterModalProps) {
  const t = useTranslations("changelog.sections.timeline.filter");

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent size="lg" variant="modern" className="flex flex-col gap-6">
        <DialogHeader>
          <DialogTitle>{t("title")}</DialogTitle>
        </DialogHeader>

        <DialogSeparator />

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 justify-center">
          {(Object.values(ChangelogItemType) as (keyof typeof typeIcons)[]).map(
            (type) => {
              const Icon = typeIcons[type as keyof typeof typeIcons];
              return (
                <Button
                  key={type}
                  variant={selectedType === type ? "default" : "outline"}
                  size="xs"
                  onClick={() => onTypeChange(type)}
                  className="capitalize"
                  asIcon
                  asPointer
                >
                  {Icon && (
                    <Badge
                      className={cn(
                        pickRandomColor(DEFAULT_COLOR_CODE_NAME.VIOLET),
                        "size-max text-primary-foreground!",
                        "px-0.5 py-1 text-[.625rem]",
                      )}
                      variant="colored"
                      size="xs"
                      circle
                    >
                      <Icon size={16} variant="bulk" />
                    </Badge>
                  )}
                  {type}
                  <Badge
                    className={cn(
                      pickRandomColor(DEFAULT_COLOR_CODE_NAME.YELLOW),
                      "px-1 py-0.5 text-[.625rem]",
                      "size-max",
                    )}
                    variant="colored"
                    size="xs"
                    circle
                  >
                    {typeCounts[type]}
                  </Badge>
                </Button>
              );
            },
          )}
        </div>

        {/* Search Input */}
        <div className="relative w-full">
          <Input
            type="text"
            placeholder={t("searchPlaceholder")}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-4"
          />
        </div>

        <DialogSeparator />

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={() => {
              onClearFilters();
              onOpenChange(false);
            }}
            asPointer
            whileTap
          >
            {t("clearFilters")}
          </Button>
          <Button onClick={() => onOpenChange(false)} asPointer whileTap>
            {t("applyFilters")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
