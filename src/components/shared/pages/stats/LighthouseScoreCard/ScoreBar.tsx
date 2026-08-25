import { cn } from "@/utils/utils"
import {
  ShieldCheckIcon as ShieldCheckedTwo,
  DangerTriangleIcon as AlertTriangle,
  CloseCircleIcon as XCircle,
  CheckCircleIcon as Checked,
  StarIcon as Star,
  InfoCircleIcon as InfoCircle,
} from "@solar-icons/react/bold-duotone"
import { getScoreColor } from "@/lib/stats/lighthouse-utils"

interface ScoreBarProps {
  score: number
  label: string
  delay?: number
}

const getCategoryIcon = (label: string) => {
  const normalized = label.toLowerCase()
  if (normalized.includes("performance")) return <Star size={14} />
  if (normalized.includes("accessibility")) return <InfoCircle size={14} />
  if (normalized.includes("best") || normalized.includes("pratiques")) return <ShieldCheckedTwo size={14} />
  if (normalized.includes("seo")) return <Checked size={14} />
  return <Star size={14} />
}

export function ScoreBar({ score, label, delay = 0 }: ScoreBarProps) {
  const colors = getScoreColor(score)

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* <ScoreIcon size={14} className={colors.iconColor} variant="bulk" /> */}
          <span className="text-xs font-medium text-muted-foreground">{label}</span>
        </div>
        <span className={cn("text-sm font-bold tabular-nums", colors.text)}>{score}</span>
      </div>
      <div className={cn("h-2.5 w-full overflow-hidden rounded-full", colors.barBg)}>
        <div
          style={{ width: `${score}%` }}
          className={cn("h-full rounded-full", colors.bar, "shadow-lg", colors.glow)}
        />
      </div>
    </div>
  )
}
