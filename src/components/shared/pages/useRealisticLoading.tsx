"use client";
import { useState, useEffect } from "react";

// OPTION 1: Infinite realistic loading
function useRealisticLoading() {
  const [progress, setProgress] = useState(0);
  const [cycle, setCycle] = useState(0);
  const { timeOutDelay, animateTimeOutDelay } = {
    timeOutDelay: 1000,
    animateTimeOutDelay: 200,
  };

  useEffect(() => {
    let currentProgress = 0;
    const steps = [
      { target: 15, duration: 400 },
      { target: 35, duration: 800 },
      { target: 55, duration: 400 },
      { target: 78, duration: 600 },
      { target: 90, duration: 500 },
      { target: 100, duration: 300 },
    ];

    let stepIndex = 0;

    const executeStep = () => {
      if (stepIndex < steps.length) {
        const step = steps[stepIndex] || { target: 100, duration: 2000 };
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
      } else {
        // Restart the cycle
        setTimeout(() => {
          setProgress(0);
          currentProgress = 0;
          stepIndex = 0;
          setCycle((prev) => prev + 1);
          setTimeout(executeStep, timeOutDelay);
        }, 1000);
      }
    };

    setTimeout(executeStep, timeOutDelay);
  }, [cycle, timeOutDelay, animateTimeOutDelay]);

  return progress;
}

export { useRealisticLoading };
