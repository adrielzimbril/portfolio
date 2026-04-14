"use client";
import React from "react";
import Image from "next/image";
import { cn } from "@/utils/utils";

export function ToolAvatar({ icon, name }: { icon: string; name: string }) {
  return (
    <div className="group relative size-fit">
      <div
        className={cn(
          "relative flex bg-inherit squircle squircle-mask squircle-background squircle-7xl squircle-border-4 size-36 overflow-hidden transition-all duration-300 squircle-border-b-base-accent",
          "squircle-border-[#8e8eff] group-hover:squircle-border-[#ffd3ad]",
        )}
      >
        <Image
          src={icon}
          alt={name}
          fill
          className={cn(
            "pointer-events-none squircle squircle-mask squircle-background squircle-7xl max-w-[65%] max-h-[65%] m-auto object-cover transition-all ease-in-out duration-300 group-hover:scale-110",
          )}
        />
      </div>
    </div>
  );
}
