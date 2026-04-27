"use client";
import { cn } from "@/utils/utils";
import Image from "next/image";
import { useIsMobile } from "@/hooks/useIsMobile";
import { getImageUrl } from "@/utils/base-url";
import { useTranslations } from "use-intl";

export function EmojiPlaceholder({
  src,
  variant = "default",
  isMobileShowed,
  className,
  imgClassName,
  imgContainerClassName,
  unOrdered = false,
}: {
  src:
    | string
    | { emoji: string }
    | { mp4: string; webm: string; poster: string };
  variant?: "default" | "bordered" | "squircle";
  isMobileShowed?: boolean;
  className?: string;
  imgClassName?: string;
  imgContainerClassName?: string;
  unOrdered?: boolean;
}) {
  const t = useTranslations();
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
          "squircle squircle-sh-white squircle-smooth-xl squircle-6xl squircle-border-8 md:squircle-border-12 squircle-border-b-base-accent aspect-square size-full md:size-96 p-12 overflow-hidden",
        !isMobileShowed && isMobile && "hidden",
        className,
      )}
    >
      <div
        className={cn(
          "relative shrink-0 size-48 md:size-80 pointer-events-none",
          (variant === "default" || variant === "bordered") &&
            "size-72 md:size-96",
          variant === "squircle" && "size-72 md:size-96",
          typeof src === "string" && "size-48 md:size-64",
          imgContainerClassName,
        )}
      >
        {/* <div
          className="absolute bg-center bg-cover bg-no-repeat inset-0"
          data-name="image 1001"
          style={{ backgroundImage: `url('${getImageUrl(src)}')` }}
        /> */}
        {typeof src === "object" && "emoji" in src ? (
          // Cas emoji
          <span
            className={cn(
              "relative size-full flex items-center justify-center text-9xl md:text-[10rem] object-cover pointer-events-none",
              variant === "squircle" &&
                "max-h-[92%] max-w-[92%] top-[4%] place-self-center overflow-hidden",
              imgClassName,
            )}
          >
            {src.emoji}
          </span>
        ) : typeof src === "object" && "mp4" in src && "webm" in src ? (
          <video
            className={cn(
              "relative m-auto squircle squircle-mask squircle-sh-white squircle-7xl size-full w-[stretch] object-cover pointer-events-none",
              variant === "squircle" &&
                "max-h-[92%] max-w-[92%] top-[4%] place-self-center overflow-hidden",
              imgClassName,
            )}
            autoPlay
            loop
            muted
            playsInline
            controls={false}
            disablePictureInPicture
            disableRemotePlayback
            controlsList="nodownload"
            width={640}
            height={480}
            poster={getImageUrl(src.poster)}
            key={src.mp4.trim().split(".").slice(0, -1).join(".")}
          >
            <source src={getImageUrl(src.webm)} type="video/webm" />
            <source src={getImageUrl(src.mp4)} type="video/mp4" />
            {t("common.shared.text.browser-does-not-support-video")}
          </video>
        ) : typeof src === "string" ? (
          <Image
            src={getImageUrl(src)}
            className={cn(
              "relative size-full object-cover pointer-events-none",
              variant === "squircle" &&
                "squircle squircle-mask squircle-sh-white squircle-7xl max-h-[92%] max-w-[92%] top-[4%] place-self-center overflow-hidden",
              imgClassName,
            )}
            width={600}
            height={600}
            alt=""
            loading="lazy"
            sizes="(max-width: 768px) 288px, 384px"
          />
        ) : null}
      </div>
    </div>
  );
}
