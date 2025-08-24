"use client";
import { AnimatePresence, motion } from "motion/react";
import svgPaths from "./svg-bgtumon3tx";
import imgIcon from "./576887334bdcab59385ed7ed507c00d867dd7f03.png";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

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
        <g id="ZimbrilÃ¹">
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

function LoadingProgressBara() {
  return (
    <motion.div className="w-80 bg-[#f9f9f9] h-1 relative rounded-full overflow-hidden">
      <motion.div
        className="bg-[#2a2a2a] h-full rounded-full"
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{
          duration: 2.5,
          ease: [0.25, 0.1, 0.25, 1],
          delay: 1,
        }}
      />
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

function LoadingProgressBar() {
  const progress = useRealisticLoading();

  return (
    <div className="w-80 bg-[#f9f9f9] h-1 relative rounded-full overflow-hidden">
      <div
        className="bg-[#2a2a2a] h-full rounded-full transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
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
// Hook pour simuler le chargement réaliste
function useRealisticLoading() {
  const [progress, setProgress] = useState(0);

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
            setTimeout(executeStep, 100);
          }
        };

        requestAnimationFrame(animate);
      }
    };

    setTimeout(executeStep, 1000); // Délai initial
  }, []);

  return progress;
}

export function GenericLoadingPage() {
  return (
    <div className="bg-[#ffffff] content-stretch flex flex-col items-center justify-center relative size-full min-h-screen overflow-hidden">
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

      {/* Main loading content */}
      <div className="content-stretch flex flex-col gap-12 items-center justify-center relative z-10">
        {/* Logo section */}
        <motion.div
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
        </motion.div>

        {/* Loading text */}
        <motion.div
          className="content-stretch flex flex-col gap-4 items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="font-['SF_Pro_Display:Semibold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[32px] text-[rgba(0,0,0,0.87)] tracking-[0.1408px] text-center">
            <p className="leading-[1.2]">Chargement de mes projets</p>
          </div>
          <div className="font-['SF_Pro_Display:Medium',_sans-serif] leading-[0] not-italic relative shrink-0 text-[18px] text-[rgba(0,0,0,0.6)] tracking-[0.0168px] text-center">
            <p className="leading-[1.2]">
              Préparation d&apos;une expérience exceptionnelle...
            </p>
          </div>
        </motion.div>

        {/* Progress indicators */}
        <div className="content-stretch flex flex-col gap-4 items-center justify-center">
          <div className="w-full bg-[#f5f5f5] rounded-full h-2 overflow-hidden">
            <div className="h-full bg-greys-08 rounded-full animate-loading-progress"></div>
          </div>
          <LoadingProgressBar />
          <LoadingProgressBara />
          <LoadingDots />
        </div>

        {/* Stats preview */}
        <motion.div
          className="content-stretch flex gap-8 items-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.6 }}
        >
          <div className="content-stretch flex flex-col gap-1 items-center justify-center">
            <div className="font-['SF_Pro_Display:Semibold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[24px] text-[rgba(0,0,0,0.87)]">
              <p className="leading-[1.2]">12+</p>
            </div>
            <div className="font-['SF_Pro_Text:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.6)]">
              <p className="leading-[1.2]">Projets</p>
            </div>
          </div>

          <div className="bg-[rgba(0,0,0,0.1)] w-px h-12"></div>

          <div className="content-stretch flex flex-col gap-1 items-center justify-center">
            <div className="font-['SF_Pro_Display:Semibold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[24px] text-[rgba(0,0,0,0.87)]">
              <p className="leading-[1.2]">3+</p>
            </div>
            <div className="font-['SF_Pro_Text:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.6)]">
              <p className="leading-[1.2]">Années</p>
            </div>
          </div>

          <div className="bg-[rgba(0,0,0,0.1)] w-px h-12"></div>

          <div className="content-stretch flex flex-col gap-1 items-center justify-center">
            <div className="font-['SF_Pro_Display:Semibold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[24px] text-[rgba(0,0,0,0.87)]">
              <p className="leading-[1.2]">100%</p>
            </div>
            <div className="font-['SF_Pro_Text:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.6)]">
              <p className="leading-[1.2]">Passion</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
