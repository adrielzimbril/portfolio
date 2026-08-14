import { Badge } from "@/components/ui/badge"
import { cn, pickRandomColor } from "@/utils"
import { DEFAULT_COLOR_CODE_NAME } from "@/types"

interface TagsProps {
  primaryTag?: string
  primaryTagColor?: DEFAULT_COLOR_CODE_NAME
  secondaryTag?: string
  secondaryTagColor?: DEFAULT_COLOR_CODE_NAME
  tags: string[]
  isCentered?: boolean
  className?: string
}

export function Tags({
  primaryTag,
  primaryTagColor,
  secondaryTag,
  secondaryTagColor,
  tags,
  isCentered,
  className,
}: TagsProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-start gap-1.5 px-1 py-1 w-full squircle-2xl/100 md:squircle-7xl/100 bg-sh-white overflow-hidden",
        isCentered && "text-center items-center justify-center",
        className,
      )}
    >
      {primaryTag && (
        <Badge className={cn(pickRandomColor(primaryTagColor ?? DEFAULT_COLOR_CODE_NAME.PURPLE))} variant="colored">
          {primaryTag}
        </Badge>
      )}

      {secondaryTag && (
        <Badge className={cn(pickRandomColor(secondaryTagColor ?? DEFAULT_COLOR_CODE_NAME.PURPLE))} variant="colored">
          {secondaryTag}
        </Badge>
      )}

      {tags.map((tag, index) => (
        <Badge key={index}>{tag}</Badge>
      ))}
    </div>
  )
}
