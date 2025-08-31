"use client";
import { cn } from "@/utils/utils";
import Image from "next/image";
import { useIsMobile } from "@/hooks/useIsMobile";

export function EmojiPlaceholder({
  src,
  variant = "default",
  isMobileHidden,
  className,
  imgClassName,
  imgContainerClassName,
  unOrdered = false,
}: {
  src: string;
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
        variant === "default" && "bg-white rounded-full",
        variant === "bordered" &&
          "size-fit rounded-full md:size-fit aspect-square p-16 border-8 md:border-12 border-zinc-100",
        variant === "squircle" &&
          "bg-white squircle squircle-white squircle-smooth-xl squircle-6xl squircle-border-8 md:squircle-border-12 squircle-border-zinc-100 aspect-square size-full md:size-96 p-12 overflow-hidden",
        isMobileHidden && isMobile && "hidden",
        className
      )}
    >
      <div
        className={cn(
          "relative shrink-0 size-11 md:size-24",
          (variant === "default" || variant === "bordered") &&
            "size-11 md:size-20",
          variant === "squircle" && "size-11 md:size-22",
          imgContainerClassName
        )}
      >
        {/* <div
          className="absolute bg-center bg-cover bg-no-repeat inset-0"
          data-name="image 1001"
          style={{ backgroundImage: `url('${src}')` }}
        /> */}
        <Image
          src={src}
          className={cn(
            "size-full object-cover pointer-events-none",
            imgClassName
          )}
          width={100}
          height={100}
          alt=""
        />
      </div>
    </div>
  );
}
