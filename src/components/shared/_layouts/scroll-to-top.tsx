"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpOne } from "@aurthle/icons";

// Detect mobile basic (iOS/Android)
const isMobileDevice = () => /Mobi|Android/i.test(navigator.userAgent);

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const ticking = useRef(false);
  const targetProgress = useRef(0);
  const animationFrame = useRef<number | null>(null);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    setIsMobile(isMobileDevice());
  }, []);

  useEffect(() => {
    if (isMobile) return; // Do nothing on mobile

    const updateScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      targetProgress.current = (scrollTop / docHeight) * 100;
      setIsVisible(scrollTop > 300);

      if (!ticking.current) {
        ticking.current = true;
        animateProgress();
      }
    };

    const animateProgress = () => {
      setScrollProgress((prev) => {
        const diff = targetProgress.current - prev;
        const step = diff * 0.2;
        const next =
          Math.abs(step) < 0.1 ? targetProgress.current : prev + step;
        if (next !== targetProgress.current) {
          animationFrame.current = requestAnimationFrame(animateProgress);
        } else {
          ticking.current = false;
        }
        return next;
      });
    };

    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateScroll);
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
    };
  }, [isMobile]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const size = 48;
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (scrollProgress / 100) * circumference;

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-20 md:bottom-6 right-6 z-40">
      <Button
        onClick={scrollToTop}
        className="relative rounded-full p-3 transition-all duration-200 group active:scale-95"
        variant="outline"
        asIcon
        style={{ width: size, height: size }}
      >
        {!isMobile && (
          <svg
            className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
          >
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              strokeWidth={strokeWidth}
              fill="none"
              className="stroke-b-base-accent"
            />
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              strokeWidth={strokeWidth}
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="stroke-b-white-invert-sec"
              strokeLinecap="round"
            />
          </svg>
        )}
        <div className="flex items-center justify-center relative z-10">
          <ArrowUpOne />
        </div>
      </Button>
    </div>
  );
}
