import { Badge } from "@/components/ui/badge";
import { pickRandomColor } from "@/utils/pick-random-color";
import { cn } from "@/utils/utils";

function ProjectTags({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap items-start gap-[8px_8px] w-full">
      {tags.map((tag, index) => (
        <Badge key={index} className="squircle-white" variant="colored">
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
    color: number;
  }[];
}) {
  return (
    <div className="flex flex-wrap items-start gap-1.5 px-1 py-1 w-full squircle squircle-smooth-xl squircle-2xl md:squircle-7xl squircle-white overflow-hidden">
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
