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
import { cn } from "@/utils/utils";
import { DEFAULT_COLOR_CODE_NAME } from "@/types";
import { pickRandomColor } from "@/utils";

interface FilterModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onClearFilters: () => void;
  categoryCounts: Record<string, number>;
  categories: string[];
}

export function FilterModal({
  isOpen,
  onOpenChange,
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  onClearFilters,
  categoryCounts,
  categories,
}: FilterModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent size="lg" variant="modern" className="flex flex-col gap-6">
        <DialogHeader>
          <DialogTitle>Filtrer les abonnements</DialogTitle>
        </DialogHeader>

        <DialogSeparator />

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="xs"
              onClick={() => onCategoryChange(category)}
              className="capitalize"
              asIcon
              asPointer
            >
              {category}
              <Badge
                className={cn(
                  pickRandomColor(DEFAULT_COLOR_CODE_NAME.YELLOW),
                  "px-1 py-0.5 text-[.625rem]",
                  "size-max content-center place-content-center",
                )}
                variant="colored"
                size="xs"
                circle
              >
                {categoryCounts[category] || 0}
              </Badge>
            </Button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full">
          <Input
            type="text"
            placeholder="Rechercher un abonnement..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-4"
          />
        </div>

        <DialogSeparator />

        <DialogFooter className="gap-2 sm:justify-center">
          {selectedCategory && selectedCategory.length > 0 && (
            <Button
              variant="outline"
              onClick={() => {
                onClearFilters();
                onOpenChange(false);
              }}
              asPointer
              whileTap
            >
              Effacer les filtres
            </Button>
          )}
          <Button onClick={() => onOpenChange(false)} asPointer whileTap>
            Appliquer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
