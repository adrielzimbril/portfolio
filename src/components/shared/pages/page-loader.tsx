"use client";
import React from "react";
import { cn } from "@/utils/utils";
import { motion } from "motion/react";
import { useRealisticLoading } from "@/components/shared/pages/useRealisticLoading";
import { Loader } from "@/components/shared/_layouts/loader";
import { LogoName } from "@/components/shared/icons/logo/logo-name";
import { LogoIcon } from "@/components/shared/icons/logo/logo-icon";
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
    <motion.div
      className={cn(
        "absolute bg-b-base backdrop-blur-[50px] backdrop-filter rounded-[24px] p-6",
        position === "top-left" && "top-32 left-2 md:top-32 md:left-32",
        position === "top-right" && "top-32 right-2 md:top-32 md:right-32",
        position === "bottom-left" &&
          "bottom-32 left-2 md:bottom-32 md:left-32",
        position === "bottom-right" &&
          "bottom-32 right-2 md:bottom-32 md:right-32",
      )}
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={{
        opacity: [0, 1, 1, 0],
        y: [20, -10, -20, -40],
        scale: [0.8, 1, 1, 0.8],
      }}
      transition={{
        duration: 2,
        delay,
        repeat: Infinity,
        repeatDelay: 2,
      }}
    >
      <span className="text-base font-medium text-zinc-400">{title}</span>
    </motion.div>
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

      {/* Principal content with sequential animations */}
      <motion.div className="flex flex-col items-center justify-center self-center gap-8 px-4 md:px-8 max-w-xl">
        {/* Header with animation */}
        <motion.header
          className="absolute top-0 left-0 right-0 h-28 bg-greys-00"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <nav className="flex items-center justify-center pt-14">
            <motion.div
              className="flex items-center justify-center align-center w-fit gap-2.5"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{
                delay: 0.3,
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <LogoIcon className={cn("shrink-0 size-14")} />
              <LogoName
                className={cn("h-5! qmd:h-6! w-48! qmd:w-60! shrink-0")}
              />
            </motion.div>
          </nav>
        </motion.header>

        {/* Main loading animation */}
        <motion.div
          className="relative"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {isPage ? (
            <motion.div
              className="size-24 border-4 border-zinc-100 dark:border-zinc-700 border-t-zinc-800 dark:border-t-zinc-950 rounded-full"
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                ease: "linear",
                repeat: Infinity,
              }}
            />
          ) : (
            <motion.div
              className="size-24 bg-zinc-100 dark:bg-zinc-900 rounded-full"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                repeat: Infinity,
              }}
            />
          )}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8, duration: 0.4, ease: "backOut" }}
          >
            {isPage ? (
              <motion.div
                className="w-12 h-12 bg-zinc-900 dark:bg-zinc-950 rounded-full flex items-center justify-center"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
              >
                <span className="text-white text-xl">{emoji}</span>
              </motion.div>
            ) : (
              <div className="w-12 h-12 bg-zinc-900 dark:bg-zinc-950 rounded-full flex items-center justify-center">
                <span className="text-white text-xl">{emoji}</span>
              </div>
            )}
          </motion.div>
        </motion.div>

        {/* Loading text with animations */}
        <motion.div
          className="size-full flex flex-col items-center gap-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <motion.h1
            className="h3 font-normal"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            {title}
          </motion.h1>

          <motion.p
            className="text-xl text-zinc-400 font-normal max-w-md"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            {subtitle}
          </motion.p>
        </motion.div>

        {/* Progress indicators with animations */}
        <motion.div
          className="flex flex-col items-center gap-4 w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          <LoadingProgressBar isPage={isPage} />
        </motion.div>

        <div className="flex items-center gap-2">
          <Loader color="bg-zinc-900 dark:bg-zinc-100" />
        </div>
      </motion.div>

      {/* Stats preview with animation */}
      <motion.div className="content-stretch flex gap-8 items-center justify-center mt-12">
        {statsData.map((stat, index) => (
          <React.Fragment key={stat.label}>
            <motion.div
              className="content-stretch flex flex-col gap-1 items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 2.2 + index * 0.1,
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <div className="relative shrink-0 text-2x">
                <p className="leading-[120%]">{stat.number}</p>
              </div>
              <div className="relative shrink-0 text-base text-b-white-invert-thr">
                <p className="leading-[120%]">{stat.label}</p>
              </div>
            </motion.div>
            {/* Check if motion is not the after last add the separator */}
            {index !== 2 && (
              <motion.div
                className="bg-[rgba(0,0,0,0.1)] w-px h-12"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: 2.3, duration: 0.3 }}
              />
            )}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};
