import { useState, useEffect } from "react";
import {
  ShieldCheck,
  AlertTriangle,
  XCircle,
  Check,
  Star,
  TrendUp,
  InfoCircle,
} from "@aurthle/icons";

interface ScoreBarProps {
  score: number;
  label: string;
  delay?: number;
  isHovered: boolean;
  shouldReduceAnimations: boolean;
}

function getScoreColor(score: number) {
  if (score === 100) {
    return {
      bar: "bg-yellow-400",
      barBg: "bg-yellow-400/10",
      text: "text-yellow-400",
      glow: "shadow-yellow-400/20",
      icon: Star,
      iconColor: "text-yellow-400",
    };
  }
  if (score >= 90) {
    return {
      bar: "bg-primary",
      barBg: "bg-primary/10",
      text: "text-primary",
      glow: "shadow-primary/20",
      icon: ShieldCheck,
      iconColor: "text-primary",
    };
  }
  if (score >= 70) {
    return {
      bar: "bg-green-500",
      barBg: "bg-green-500/10",
      text: "text-green-500",
      glow: "shadow-green-500/20",
      icon: Check,
      iconColor: "text-green-500",
    };
  }
  if (score >= 50) {
    return {
      bar: "bg-accent",
      barBg: "bg-accent/10",
      text: "text-accent",
      glow: "shadow-accent/20",
      icon: TrendUp,
      iconColor: "text-accent",
    };
  }
  if (score >= 25) {
    return {
      bar: "bg-orange-500",
      barBg: "bg-orange-500/10",
      text: "text-orange-500",
      glow: "shadow-orange-500/20",
      icon: InfoCircle,
      iconColor: "text-orange-500",
    };
  }
  return {
    bar: "bg-destructive",
    barBg: "bg-destructive/10",
    text: "text-destructive",
    glow: "shadow-destructive/20",
    icon: XCircle,
    iconColor: "text-destructive",
  };
}

export function ScoreBar({
  score,
  label,
  delay = 0,
  isHovered,
  shouldReduceAnimations,
}: ScoreBarProps) {
  const [displayScore, setDisplayScore] = useState(
    shouldReduceAnimations ? score : 0,
  );
  const colors = getScoreColor(score);
  const ScoreIcon = colors.icon;

  useEffect(() => {
    if (shouldReduceAnimations) {
      return;
    }

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
  }, [score, delay, shouldReduceAnimations]);

  if (shouldReduceAnimations) {
    return (
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ScoreIcon size={14} className={colors.iconColor} />
            <span className="text-xs font-medium text-muted-foreground">
              {label}
            </span>
          </div>
          <span className={`text-sm font-bold tabular-nums ${colors.text}`}>
            {displayScore}
          </span>
        </div>
        <div
          className={`h-2.5 w-full overflow-hidden rounded-full ${colors.barBg}`}
        >
          <div
            style={{ width: `${displayScore}%` }}
            className={`h-full rounded-full ${colors.bar}`}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ScoreIcon size={14} className={colors.iconColor} />
          <span className="text-xs font-medium text-muted-foreground">
            {label}
          </span>
        </div>
        <span className={`text-sm font-bold tabular-nums ${colors.text}`}>
          {displayScore}
        </span>
      </div>
      <div
        className={`h-2.5 w-full overflow-hidden rounded-full ${colors.barBg}`}
      >
        <div
          style={{ width: `${displayScore}%` }}
          className={`h-full rounded-full ${colors.bar} ${isHovered ? `shadow-lg ${colors.glow}` : ""}`}
        />
      </div>
    </div>
  );
}
