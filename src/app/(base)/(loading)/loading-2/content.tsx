"use client";
import React, { useEffect, useState } from "react";
import svgPaths from "../loading-1/svg-bgtumon3tx";
import imgIcon from "../loading-1/576887334bdcab59385ed7ed507c00d867dd7f03.png";
import { Loader2 } from "lucide-react";
import { cn } from "@/utils/utils";
import { motion } from "motion/react";
import Image from "next/image";
import { useRealisticLoading } from "./useRealisticLoading";
import { getImageUrl } from "@/utils/base-url";

interface GenericLoadingPageProps {
  title?: string;
  subtitle?: string;
  emoji?: string;
  isPage?: boolean;
}

function LoadingIcon() {
  return (
    <motion.div
      className="bg-[#f9f9f9] relative rounded-2xl shrink-0 size-20"
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
      <Image
        className="block max-w-none size-full"
        height="80"
        src={imgIcon}
        width="80"
        alt=""
      />
    </motion.div>
  );
}

function LoadingAdriel() {
  return (
    <motion.div
      className="h-[25px] relative shrink-0 w-[110px]"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 89 20"
      >
        <g id="Adriel">
          <path d={svgPaths.p127baef2} fill="var(--fill-0, black)" id="A" />
          <path d={svgPaths.p189b7900} fill="var(--fill-0, black)" id="d" />
          <path d={svgPaths.p32b71ce0} fill="var(--fill-0, black)" id="r" />
          <path d={svgPaths.pb616900} fill="var(--fill-0, black)" id="i" />
          <path d={svgPaths.p1b7d5600} fill="var(--fill-0, black)" id="e" />
          <path d={svgPaths.p18ec27b2} fill="var(--fill-0, black)" id="l" />
        </g>
      </svg>
    </motion.div>
  );
}

function LoadingZimbrilu() {
  return (
    <motion.div
      className="h-[25px] relative shrink-0 w-[122px]"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.7, duration: 0.6 }}
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 98 20"
      >
        <g id="Zimbril">
          <path d={svgPaths.pb138a00} fill="var(--fill-0, black)" id="Z" />
          <path d={svgPaths.p3db2a800} fill="var(--fill-0, black)" id="i" />
          <path d={svgPaths.pae82b00} fill="var(--fill-0, black)" id="m" />
          <path d={svgPaths.p91fbf00} fill="var(--fill-0, black)" id="b" />
          <path d={svgPaths.p306c2600} fill="var(--fill-0, black)" id="r" />
          <path d={svgPaths.p25f9cf80} fill="var(--fill-0, black)" id="i_2" />
          <path d={svgPaths.p29e08500} fill="var(--fill-0, black)" id="l" />
        </g>
      </svg>
    </motion.div>
  );
}

function LoadingProgressBar({ isPage }: { isPage: boolean }) {
  const progress = useRealisticLoading();

  return (
    <>
      <div className="w-full bg-b-base-accent rounded-full h-2 overflow-hidden max-w-md flex flex-col gap-2">
        {isPage ? (
          <>
            <div
              className="bg-stone-800 size-full rounded-full transition-all duration-300 ease-in-out"
              style={{ width: `${progress}%` }}
            />
          </>
        ) : (
          <div className="bg-stone-800 size-full rounded-full animate-loading-progress" />
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
          "bottom-32 right-2 md:bottom-32 md:right-32"
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

function LoadingDots() {
  return (
    <motion.div
      className="flex gap-2 items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5 }}
    >
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-3 h-3 bg-[#2a2a2a] rounded-full"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: i * 0.2 + 1.5,
          }}
        />
      ))}
    </motion.div>
  );
}

const statsData = [
  { number: "12+", label: "Projects" },
  { number: "3+", label: "Years" },
  { number: "100%", label: "Enthusiast" },
];

const floatingSkills = ["SaaS 🦄", "Design 🎨", "Innovation 💡", "Web App 📱"];

export const GenericLoadingPage: React.FC<GenericLoadingPageProps> = ({
  title = "Your ideas into products that your users adore",
  subtitle = "Problem Solver & Your SaaS Product designer ❣️",
  emoji = "🦄",
  isPage = true,
}) => {
  return (
    <div className="flex flex-col mx-auto items-center justify-center relative bg-b-white size-full min-h-dvh">
      {/* Floating background elements */}
      <FloatingCard delay={0} position="top-left" title="SaaS 🦄" />

      <FloatingCard delay={1} position="top-right" title="Design 🎨" />

      <FloatingCard delay={2} position="bottom-left" title="Innovation 💡" />

      <FloatingCard delay={1.5} position="bottom-right" title="Web App 📱" />

      {/* Main Content with sequential animations */}
      <motion.div
        className="flex flex-col items-center justify-center self-center gap-8 px-4 md:px-8 max-w-xl"
        // initial={{ opacity: 0, y: 30 }}
        // animate={{ opacity: 1, y: 0 }}
        // transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      >
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
              <Image
                className="relative flex-shrink-0 size-14"
                alt="Icon"
                src={getImageUrl("/icon.svg")}
                width="56"
                height="56"
              />
              <Image
                className="relative flex-shrink-0 h-5"
                alt="Adriel zimbril"
                src={getImageUrl("/adriel-zimbril.svg")}
                width="195"
                height="20"
              />
            </motion.div>
          </nav>
        </motion.header>

        {/* Logo section */}
        {/* <motion.div
          className="content-stretch flex flex-col gap-6 items-center justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <LoadingIcon />
          <div className="content-stretch flex gap-3 items-center justify-center">
            <LoadingAdriel />
            <LoadingZimbrilu />
          </div>
        </motion.div> */}

        {/* Main loading animation */}
        <motion.div
          className="relative"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {isPage ? (
            <motion.div
              className="size-24 border-4 border-stone-100 border-t-stone-800 rounded-full"
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                ease: "linear",
                repeat: Infinity,
              }}
            />
          ) : (
            <motion.div
              className="size-24 bg-stone-100 rounded-full"
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
                className="w-12 h-12 bg-greys-08 rounded-full flex items-center justify-center"
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
              <div className="w-12 h-12 bg-greys-08 rounded-full flex items-center justify-center">
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
            className="text-xl text-stone-400 font-normal max-w-md"
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

        {/* Animated loading points */}
        {/* <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-greys-08 rounded-full animate-bounce animate-infinite delay-0"></div>
          <div className="w-3 h-3 bg-greys-08 rounded-full animate-bounce animate-infinite delay-150"></div>
          <div className="w-3 h-3 bg-greys-08 rounded-full animate-bounce animate-infinite delay-300"></div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-greys-08 rounded-full animate-pulse animate-infinite delay-0"></div>
          <div className="w-3 h-3 bg-greys-08 rounded-full animate-pulse animate-infinite delay-300"></div>
          <div className="w-3 h-3 bg-greys-08 rounded-full animate-pulse animate-infinite delay-600"></div>
        </div> */}
        <div className="flex items-center gap-2">
          <LoadingDots />
        </div>
      </motion.div>

      {/* Stats preview with animation */}
      <motion.div
        className="content-stretch flex gap-8 items-center justify-center mt-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.6 }}
      >
        {statsData.map((stat, index) => (
          <>
            <motion.div
              key={stat.label}
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
          </>
        ))}
      </motion.div>
    </div>
  );
};
