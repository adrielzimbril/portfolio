"use client";
import React, { useEffect, useState } from "react";
import svgPaths from "../loading-1/svg-bgtumon3tx";
import imgIcon from "../loading-1/576887334bdcab59385ed7ed507c00d867dd7f03.png";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import Image from "next/image";

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

// Hook pour simuler le chargement réaliste
function useRealisticLoading() {
  const [progress, setProgress] = useState(0);
  const { timeOutDelay, animateTimeOutDelay } = {
    timeOutDelay: 1000,
    animateTimeOutDelay: 200,
  };

  useEffect(() => {
    let currentProgress = 0;
    const steps = [
      { target: 15, duration: 400 },
      { target: 35, duration: 800 },
      { target: 65, duration: 600 },
      { target: 90, duration: 500 },
      { target: 100, duration: 300 },
    ];

    let stepIndex = 0;

    const executeStep = () => {
      if (stepIndex < steps.length) {
        const step = steps[stepIndex];
        const startProgress = currentProgress;
        const startTime = Date.now();

        const animate = () => {
          const elapsed = Date.now() - startTime;
          const progressRatio = Math.min(elapsed / step.duration, 1);
          const easeOut = 1 - Math.pow(1 - progressRatio, 3);
          const newProgress =
            startProgress + (step.target - startProgress) * easeOut;

          setProgress(Math.round(newProgress));

          if (progressRatio < 1) {
            requestAnimationFrame(animate);
          } else {
            currentProgress = step.target;
            stepIndex++;
            setTimeout(executeStep, animateTimeOutDelay);
          }
        };

        requestAnimationFrame(animate);
      }
    };

    setTimeout(executeStep, timeOutDelay); // Délai initial
  }, [timeOutDelay, animateTimeOutDelay]);

  return progress;
}

function LoadingProgressBar({ isPage }: { isPage: boolean }) {
  const progress = useRealisticLoading();

  return (
    <>
      <div className="w-full bg-[#f5f5f5] rounded-full h-2 overflow-hidden max-w-md">
        {isPage ? (
          <div
            className="bg-greys-08 h-full rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${progress}%` }}
          />
        ) : (
          <div className="bg-greys-08 h-full rounded-full animate-loading-progress" />
        )}
      </div>
    </>
  );
}

function FloatingCard({
  delay,
  children,
  className,
}: {
  delay: number;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={cn(
        "absolute bg-[#f9f9f9] backdrop-blur-[50px] backdrop-filter rounded-[24px] p-6",
        className
      )}
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={{
        opacity: [0, 1, 1, 0],
        y: [20, -10, -20, -40],
        scale: [0.8, 1, 1, 0.8],
      }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        repeatDelay: 3,
      }}
    >
      {children}
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

export const GenericLoadingPage: React.FC<GenericLoadingPageProps> = ({
  title = "Chargement en cours...",
  subtitle = "Nous préparons votre contenu",
  emoji = "⚡",
  isPage = true,
}) => {
  return (
    <div className="flex flex-col mx-auto items-center justify-center relative bg-white size-full min-h-dvh">
      {/* Floating background elements */}
      <FloatingCard delay={0} className="top-20 left-20">
        <div className="font-['SF_Pro_Text:Medium',_sans-serif] text-[14px] text-[rgba(0,0,0,0.6)]">
          SaaS 🦄
        </div>
      </FloatingCard>

      <FloatingCard delay={1} className="top-32 right-24">
        <div className="font-['SF_Pro_Text:Medium',_sans-serif] text-[14px] text-[rgba(0,0,0,0.6)]">
          Design 🎨
        </div>
      </FloatingCard>

      <FloatingCard delay={2} className="bottom-32 left-32">
        <div className="font-['SF_Pro_Text:Medium',_sans-serif] text-[14px] text-[rgba(0,0,0,0.6)]">
          Innovation 💡
        </div>
      </FloatingCard>

      <FloatingCard delay={1.5} className="bottom-20 right-20">
        <div className="font-['SF_Pro_Text:Medium',_sans-serif] text-[14px] text-[rgba(0,0,0,0.6)]">
          Web App 📱
        </div>
      </FloatingCard>

      {/* Header avec animation */}
      <motion.header
        className="absolute top-0 left-0 right-0 h-28 bg-greys-00"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <nav className="flex items-center justify-center pt-14">
          <motion.div
            className="flex items-center gap-2.5"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 0.3,
              duration: 0.5,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <img className="w-14 h-14" alt="Icon" src="/icon.svg" />
            <img
              className="flex-shrink-0"
              alt="Adriel zimbril"
              src="/adriel-zimbril.svg"
            />
          </motion.div>
        </nav>
      </motion.header>

      {/* Contenu principal de chargement avec animations séquentielles */}
      <motion.div
        className="flex flex-col items-center justify-center gap-8 px-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      >
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

        {/* Animation de chargement principale */}
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

        {/* Texte de chargement avec animations */}
        <motion.div
          className="flex flex-col items-center gap-4 text-center max-w-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <motion.h1
            className="font-SF-pro-title-02-34 font-[number:var(--SF-pro-title-02-34-font-weight)] text-text-iconslight-high-emphasis text-[length:var(--SF-pro-title-02-34-font-size)] tracking-[var(--SF-pro-title-02-34-letter-spacing)] leading-[var(--SF-pro-title-02-34-line-height)] [font-style:var(--SF-pro-title-02-34-font-style)]"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            {title}
          </motion.h1>

          <motion.p
            className="[font-family:'SF_Pro_Display-Medium',Helvetica] font-medium text-text-iconslight-disabled text-[20px] text-center tracking-[0.02px] leading-[24px] max-w-md"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            {subtitle}
          </motion.p>
        </motion.div>

        {/* Indicateurs de progression avec animations */}
        <motion.div
          className="flex flex-col items-center gap-4 w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          <LoadingProgressBar isPage={isPage} />

          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.4 }}
          >
            <Loader2 className="w-4 h-4 animate-spin text-greys-06" />
            <span className="[font-family:'SF_Pro_Text-Regular',Helvetica] font-normal text-text-iconslight-medium-emphasis text-[14px] tracking-[0.07px] leading-[18px]">
              Chargement des ressources...
            </span>
          </motion.div>
        </motion.div>

        {/* Points de chargement animés */}
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

      {/* Stats preview avec animation */}
      <motion.div
        className="content-stretch flex gap-8 items-center justify-center mt-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.6 }}
      >
        {[
          { number: "12+", label: "Projects" },
          { number: "3+", label: "Years" },
          { number: "100%", label: "Enthusiast" },
        ].map((stat, index) => (
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
              <div className="relative shrink-0 text-base text-zinc-500">
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
