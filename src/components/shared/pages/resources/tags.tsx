import { Badge } from "@/components/ui/badge";
import { cn } from "@/utils/utils";
import { pickRandomColor } from "@/utils/pick-random-color";

interface TagsProps {
  primaryTag?: string;
  tags: string[];
  isCentered?: boolean;
  className?: string;
}

export function Tags({ primaryTag, tags, isCentered, className }: TagsProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-start gap-1.5 px-1 py-1 w-full squircle squircle-smooth-xl squircle-7xl squircle-white overflow-hidden",
        isCentered && "text-center items-center justify-center",
        className
      )}
    >
      {primaryTag && (
        <Badge className={cn(pickRandomColor("PURPLE"))} variant="colored">
          {primaryTag}
        </Badge>
      )}

      {tags.map((tag, index) => (
        <Badge key={index}>{tag}</Badge>
      ))}
    </div>
  );
}
