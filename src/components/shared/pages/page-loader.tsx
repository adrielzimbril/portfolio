"use client";
import React from "react";
import { cn } from "@/utils/utils";
import Image from "next/image";
import { useRealisticLoading } from "./useRealisticLoading";
import { getImageUrl } from "@/utils/base-url";
import { Loader } from "@/components/shared/_layouts/loader";
import { useIsDarkMode } from "@/hooks/useIsDarkMode";
import { LogoName } from "@/components/shared/icons/logo/logo-name";
import { LogoIcon } from "@/components/shared/icons/logo/logo-icon";
import { siteConfig } from "@/data/config";
import { useIsMobile } from "@/hooks/useIsMobile";

interface GenericLoadingPageProps {
  title: string;
  subtitle: string;
  emoji: string;
  isPage?: boolean;
}

function LoadingProgressBar({ isPage }: { isPage: boolean }) {
  const progress = useRealisticLoading();

  return (
    <>
      <div className="w-full bg-b-base-accent rounded-full h-2  max-w-md flex flex-col gap-2">
        {isPage ? (
          <>
            <div
              className="bg-zinc-800 dark:bg-zinc-900 size-full rounded-full transition-all duration-300 ease-in-out"
              style={{ width: `${progress}%` }}
            />
          </>
        ) : (
          <div className="bg-zinc-800 dark:bg-zinc-900 size-full rounded-full animate-loading-progress" />
        )}
      </div>
    </>
  );
}

function FloatingCard({
  delay,
  title,
  position,
}: {
  delay: number;
  title: string;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}) {
  return (
    <div
      className={cn(
        "absolute bg-b-base backdrop-blur-[50px] backdrop-filter rounded-[24px] p-6",
        position === "top-left" && "top-32 left-2 md:top-32 md:left-32",
        position === "top-right" && "top-32 right-2 md:top-32 md:right-32",
        position === "bottom-left" &&
          "bottom-32 left-2 md:bottom-32 md:left-32",
        position === "bottom-right" &&
          "bottom-32 right-2 md:bottom-32 md:right-32",
      )}
    >
      <span className="text-base font-medium text-zinc-400">{title}</span>
    </div>
  );
}

const statsData = [
  { number: "18+", label: "Projects" },
  { number: "5+", label: "Years" },
  { number: "100%", label: "Enthusiast" },
];

const floatingSkills = [
  "SaaS 🦄",
  "Design 🎨",
  "Innovation 💡",
  "Go To Market ✨",
];

export const GenericLoadingPage: React.FC<GenericLoadingPageProps> = ({
  title,
  subtitle,
  emoji,
  isPage = true,
}) => {
  const isMobile = useIsMobile();
  return (
    <div className="flex flex-col mx-auto items-center justify-center relative bg-b-white size-full min-h-dvh">
      {/* Floating background elements */}
      {!isMobile &&
        floatingSkills.map((skill, index) => (
          <FloatingCard
            key={skill}
            delay={index * 0.5}
            position={
              index % 4 === 0
                ? "top-left"
                : index % 4 === 1
                  ? "top-right"
                  : index % 4 === 2
                    ? "bottom-left"
                    : "bottom-right"
            }
            title={skill}
          />
        ))}

      {/* Principal content */}
      <div className="flex flex-col items-center justify-center self-center gap-8 px-4 md:px-8 max-w-xl">
        {/* Header */}
        <header className="absolute top-0 left-0 right-0 h-28 bg-greys-00">
          <nav className="flex items-center justify-center pt-14">
            <div className="flex items-center justify-center align-center w-fit gap-2.5">
              <LogoIcon className={cn("flex-shrink-0 size-14")} />
              <LogoName
                className={cn("h-5! qmd:h-6! w-48! qmd:w-60! flex-shrink-0")}
              />
            </div>
          </nav>
        </header>

        {/* Main loading */}
        <div className="relative">
          {isPage ? (
            <div className="size-24 border-4 border-zinc-100 dark:border-zinc-700 border-t-zinc-800 dark:border-t-zinc-950 rounded-full animate-spin" />
          ) : (
            <div className="size-24 bg-zinc-100 dark:bg-zinc-900 rounded-full animate-pulse" />
          )}
          <div className="absolute inset-0 flex items-center justify-center">
            {isPage ? (
              <div className="w-12 h-12 bg-zinc-900 dark:bg-zinc-950 rounded-full flex items-center justify-center animate-pulse">
                <span className="text-white text-xl">{emoji}</span>
              </div>
            ) : (
              <div className="w-12 h-12 bg-zinc-900 dark:bg-zinc-950 rounded-full flex items-center justify-center">
                <span className="text-white text-xl">{emoji}</span>
              </div>
            )}
          </div>
        </div>

        {/* Loading text */}
        <div className="size-full flex flex-col items-center gap-4 text-center">
          <h1 className="h3 font-normal">{title}</h1>

          <p className="text-xl text-zinc-400 font-normal max-w-md">
            {subtitle}
          </p>
        </div>

        {/* Progress indicators */}
        <div className="flex flex-col items-center gap-4 w-full max-w-md">
          <LoadingProgressBar isPage={isPage} />
        </div>

        <div className="flex items-center gap-2">
          <Loader color="bg-zinc-900 dark:bg-zinc-100" />
        </div>
      </div>

      {/* Stats preview */}
      <div className="content-stretch flex gap-8 items-center justify-center mt-12">
        {statsData.map((stat, index) => (
          <React.Fragment key={stat.label}>
            <div className="content-stretch flex flex-col gap-1 items-center justify-center">
              <div className="relative shrink-0 text-2x">
                <p className="leading-[120%]">{stat.number}</p>
              </div>
              <div className="relative shrink-0 text-base text-b-white-invert-thr">
                <p className="leading-[120%]">{stat.label}</p>
              </div>
            </div>
            {index !== 2 && <div className="bg-[rgba(0,0,0,0.1)] w-px h-12" />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
