import { cn } from "@/utils/utils";
import {
  ShieldCheckedTwo,
  AlertTriangle,
  XCircle,
  Checked,
  Star,
  InfoCircle,
} from "@aurthle/icons";
import { getScoreColor } from "@/lib/stats/lighthouse-utils";

interface ScoreBarProps {
  score: number;
  label: string;
  delay?: number;
}

export function ScoreBar({ score, label, delay = 0 }: ScoreBarProps) {
  const colors = getScoreColor(score);
  const ScoreIcon = (() => {
    if (score === 100) return Star;
    if (score >= 90) return ShieldCheckedTwo;
    if (score >= 70) return Checked;
    if (score >= 50) return InfoCircle;
    if (score >= 25) return AlertTriangle;
    return XCircle;
  })();

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
          {score}
        </span>
      </div>
      <div
        className={cn(
          "h-2.5 w-full overflow-hidden rounded-full",
          colors.barBg,
        )}
      >
        <div
          style={{ width: `${score}%` }}
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
