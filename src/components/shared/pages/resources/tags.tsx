import { Badge } from "@/components/ui/badge";

interface TagsProps {
  primaryTag: string;
  tags: string[];
}

export function Tags({ primaryTag, tags }: TagsProps) {
  return (
    <div className="flex flex-wrap items-start gap-1.5 px-1 py-1 w-full squircle squircle-smooth-xl squircle-7xl squircle-white overflow-hidden">
      <Badge className="squircle-[#e2e4ff]" variant="colored">
        {primaryTag}
      </Badge>

      {tags.map((tag, index) => (
        <Badge key={index}>{tag}</Badge>
      ))}
    </div>
  );
}
