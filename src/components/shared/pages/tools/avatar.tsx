"use client";
import React from "react";
import Image from "next/image";
import { cn } from "@/utils/utils";

export function ToolAvatar({
  icon,
  name,
}: {
  icon: string;
  name: string;
}) {
  return (
    <div className="relative size-fit">
      <div className="relative flex bg-inherit squircle squircle-mask squircle-background squircle-7xl squircle-border-4 size-36 overflow-hidden transition-all duration-300 squircle-border-border group-hover:squircle-border-primary">
        <Image
          src={icon}
          alt={name}
          fill
          className="pointer-events-none squircle squircle-mask squircle-background squircle-7xl max-w-[85%] max-h-[85%] m-auto object-contain transition-all ease-in-out duration-300 group-hover:scale-110"
        />
      </div>
    </div>
  );
}
