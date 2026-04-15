import { useState, useEffect } from "react";
import { cn } from "@/utils";
import {
  ShieldCheckedTwo,
  AlertTriangle,
  XCircle,
  Checked,
  Star,
  InfoCircle,
} from "@aurthle/icons";
import { getScoreColor } from "./lighthouse-utils";

interface ScoreBarProps {
  score: number;
  label: string;
  delay?: number;
  isHovered: boolean;
}

export function ScoreBar({
  score,
  label,
  delay = 0,
  isHovered,
}: ScoreBarProps) {
  const [displayScore, setDisplayScore] = useState(score);
  const colors = getScoreColor(score);
  const ScoreIcon = (() => {
    if (score === 100) return Star;
    if (score >= 90) return ShieldCheckedTwo;
    if (score >= 70) return Checked;
    if (score >= 50) return InfoCircle;
    if (score >= 25) return AlertTriangle;
    return XCircle;
  })();

  useEffect(() => {
    const duration = 1200;
    const startTime = performance.now();
    const startDelay = delay * 1000;

    const animateScore = (currentTime: number) => {
      const elapsed = currentTime - startTime - startDelay;

      if (elapsed < 0) {
        requestAnimationFrame(animateScore);
        return;
      }

      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayScore(Math.floor(eased * score));

      if (progress < 1) {
        requestAnimationFrame(animateScore);
      }
    };

    requestAnimationFrame(animateScore);
  }, [score, delay]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* <ScoreIcon size={14} className={colors.iconColor} variant="bulk" /> */}
          <span className="text-xs font-medium text-muted-foreground">
            {label}
          </span>
        </div>
        <span className={cn("text-sm font-bold tabular-nums", colors.text)}>
          {displayScore}
        </span>
      </div>
      <div
        className={cn(
          "h-2.5 w-full overflow-hidden rounded-full",
          colors.barBg,
        )}
      >
        <div
          style={{ width: `${displayScore}%` }}
          className={cn(
            "h-full rounded-full",
            colors.bar,
            "shadow-lg",
            colors.glow,
          )}
        />
      </div>
    </div>
  );
}
