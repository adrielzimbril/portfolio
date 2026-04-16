import { Badge } from "@/components/ui/badge";
import { cn } from "@/utils/utils";
import { pickRandomColor } from "@/utils/pick-random-color";
import { DEFAULT_COLOR_CODE_NAME_TYPE } from "@/types/default";

interface TagsProps {
  primaryTag?: string;
  primaryTagColor?: DEFAULT_COLOR_CODE_NAME_TYPE;
  secondaryTag?: string;
  secondaryTagColor?: DEFAULT_COLOR_CODE_NAME_TYPE;
  tags?: string[];
  isCentered?: boolean;
  className?: string;
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
        "flex flex-wrap items-start gap-1.5 px-1 py-1 w-full squircle squircle-smooth-xl squircle-2xl md:squircle-7xl squircle-sh-white overflow-hidden",
        isCentered && "text-center items-center justify-center",
        className,
      )}
    >
      {primaryTag && (
        <Badge
          className={cn(
            pickRandomColor(
              primaryTagColor ?? DEFAULT_COLOR_CODE_NAME_TYPE.PURPLE,
            ),
          )}
          variant="colored"
        >
          {primaryTag}
        </Badge>
      )}

      {secondaryTag && (
        <Badge
          className={cn(
            pickRandomColor(
              secondaryTagColor ?? DEFAULT_COLOR_CODE_NAME_TYPE.PURPLE,
            ),
          )}
          variant="colored"
        >
          {secondaryTag}
        </Badge>
      )}

      {tags?.map((tag, index) => (
        <Badge key={index}>{tag}</Badge>
      ))}
    </div>
  );
}
