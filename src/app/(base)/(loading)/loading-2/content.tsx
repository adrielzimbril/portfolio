"use client";
import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

interface GenericLoadingPageProps {
  title?: string;
  subtitle?: string;
  emoji?: string;
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

function LoadingProgressBar() {
  const progress = useRealisticLoading();

  return (
    <div className="w-full bg-[#f5f5f5] rounded-full h-2 overflow-hidden max-w-md">
      <div
        className="bg-greys-08 h-full rounded-full transition-all duration-300 ease-out"
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
}) => {
  return (
    <div className="flex flex-col mx-auto items-center justify-center relative bg-white size-full min-h-screen overflow-hidden">
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
        {/* Animation de chargement principale */}
        <motion.div
          className="relative"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {false ? (
            <motion.div
              className="size-24 border-4 border-[#f5f5f5] border-t-greys-08 rounded-full"
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                ease: "linear",
                repeat: Infinity,
              }}
            />
          ) : (
            <motion.div
              className="size-24 bg-[#f5f5f5] rounded-full"
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
          </motion.div>
        </motion.div>
        {/* Texte de chargement avec animations */}
        <motion.div
          className="flex flex-col items-center gap-4 text-center"
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
          <div className="relative">
            <div className="size-16 bg-[#f5f5f5] rounded-full animate-ping duration-700 hidden"></div>
            {true ? (
              <div className="size-24 border-4 border-[#f5f5f5] border-t-greys-08 rounded-full animate-spin"></div>
            ) : (
              <motion.div
                className="size-16 bg-[#f5f5f5] rounded-full "
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: 0.2 + 1.5,
                }}
              />
            )}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 bg-greys-08 rounded-full flex items-center justify-center">
                <span className="text-white text-xl">{emoji}</span>
              </div>
            </div>
          </div>
          <LoadingProgressBar />

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
          { number: "12+", label: "Projets" },
          { number: "3+", label: "Années" },
          { number: "100%", label: "Passion" },
        ].map((stat, index) => (
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
              <div className="font-['SF_Pro_Display:Semibold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[24px] text-[rgba(0,0,0,0.87)]">
                <p className="leading-[1.2]">{stat.number}</p>
              </div>
              <div className="font-['SF_Pro_Text:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.6)]">
                <p className="leading-[1.2]">{stat.label}</p>
              </div>
            </motion.div>
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
