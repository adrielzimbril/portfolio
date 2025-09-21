"use client";
import { cn } from "@/utils/utils";
import Image from "next/image";
import { useIsMobile } from "@/hooks/useIsMobile";
import { getImageUrl } from "@/utils/base-url";

export function EmojiPlaceholder({
  src,
  variant = "default",
  isMobileHidden,
  className,
  imgClassName,
  imgContainerClassName,
  unOrdered = false,
}: {
  src: string | { emoji: string };
  variant?: "default" | "bordered" | "squircle";
  isMobileHidden?: boolean;
  className?: string;
  imgClassName?: string;
  imgContainerClassName?: string;
  unOrdered?: boolean;
}) {
  const isMobile = useIsMobile();
  return (
    <div
      className={cn(
        "relative flex items-center justify-center size-full pointer-events-none",
        !unOrdered && "md:order-2",
        (variant === "default" || variant === "bordered") &&
          "size-fit md:size-[90%] aspect-square",
        variant === "default" && "bg-b-white rounded-full",
        variant === "bordered" &&
          "size-fit rounded-full md:size-fit aspect-square p-16 border-8 md:border-12 border-b-base-accent",
        variant === "squircle" &&
          "squircle squircle-b-white squircle-smooth-xl squircle-6xl squircle-border-8 md:squircle-border-12 squircle-border-b-base-accent aspect-square size-full md:size-96 p-12 overflow-hidden",
        isMobileHidden && isMobile && "hidden",
        className
      )}
    >
      <div
        className={cn(
          "relative shrink-0 size-11 md:size-24",
          (variant === "default" || variant === "bordered") &&
            "size-11 md:size-48",
          variant === "squircle" && "size-11 md:size-22",
          imgContainerClassName
        )}
      >
        {/* <div
          className="absolute bg-center bg-cover bg-no-repeat inset-0"
          data-name="image 1001"
          style={{ backgroundImage: `url('${getImageUrl(src)}')` }}
        /> */}
        {typeof src === "object" && src.emoji ? (
          <span
            className={cn(
              "size-full flex items-center justify-center text-5xl md:text-[10rem] object-cover pointer-events-none",
              imgClassName
            )}
          >
            {src.emoji}
          </span>
        ) : (
          typeof src === "string" && (
            <Image
              src={getImageUrl(src)}
              className={cn(
                "size-full object-cover pointer-events-none",
                imgClassName
              )}
              width={600}
              height={600}
              alt=""
            />
          )
        )}
      </div>
    </div>
  );
}
