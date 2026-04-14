"use client";
import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/utils/utils";
import { pickRandomColor } from "@/utils/pick-random-color";
import { DEFAULT_COLOR_CODE_NAME_LIST } from "@/types/default";
import { Checked, LoveTime } from "@aurthle/icons";

export function ConnectionAvatar({
  image,
  name,
  met,
}: {
  image: string;
  name: string;
  met: string | null;
}) {
  return (
    <div className="relative size-fit">
      <div
        className={cn(
          "relative flex bg-inherit squircle squircle-mask squircle-background squircle-7xl squircle-border-4 size-36 overflow-hidden transition-all duration-300",
          met
            ? "squircle-border-[#8e8eff]"
            : "squircle-border-b-base-accent group-hover:squircle-border-[#ffd3ad]",
        )}
      >
        <Image
          src={image}
          alt={name}
          fill
          className={cn(
            "pointer-events-none squircle squircle-mask squircle-background squircle-7xl max-w-[85%] max-h-[85%] m-auto object-cover transition-all ease-in-out duration-300 group-hover:scale-110",
            !met && "grayscale group-hover:grayscale-0",
          )}
        />
      </div>
      <div className="absolute top-0 right-0 ">
        <Badge
          className={cn(
            pickRandomColor(
              met
                ? DEFAULT_COLOR_CODE_NAME_LIST.VIOLET
                : DEFAULT_COLOR_CODE_NAME_LIST.ORANGE,
            ),
            " p-1.5 rounded-full",
          )}
          variant="secondary"
        >
          {met ? (
            <Checked
              className="text-primary-foreground"
              size={24}
              variant="outline"
            />
          ) : (
            <LoveTime size={24} variant="outline" />
          )}
        </Badge>
      </div>
    </div>
  );
}
