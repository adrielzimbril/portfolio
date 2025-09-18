import { Badge } from "@/components/ui/badge";
import { pickRandomColor } from "@/utils/pick-random-color";
import { cn } from "@/utils/utils";
import { DEFAULT_CATEGORY_COLOR_NAME } from "@/types/default";

function ProjectTags({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap items-start gap-2 w-full">
      {tags.map((tag, index) => (
        <Badge
          key={index}
          className="squircle-b-white text-b-white-invert"
          variant="colored"
        >
          {tag}
        </Badge>
      ))}
    </div>
  );
}

function ProjectCategories({
  categories,
}: {
  categories: {
    name: string;
    color: DEFAULT_CATEGORY_COLOR_NAME;
  }[];
}) {
  return (
    <div className="flex flex-wrap items-start gap-1.5 px-1 py-1 w-full squircle squircle-smooth-xl squircle-2xl md:squircle-7xl squircle-b-white overflow-hidden">
      {categories.map((category, index) => (
        <Badge
          key={index}
          className={cn(pickRandomColor(category.color))}
          variant="colored"
        >
          {category.name}
        </Badge>
      ))}
    </div>
  );
}

export { ProjectTags, ProjectCategories };
