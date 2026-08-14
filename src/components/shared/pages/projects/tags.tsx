import { Badge } from "@/components/ui/badge"
import { cn, pickRandomColor } from "@/utils"
import { DEFAULT_COLOR_CODE_NAME_TYPE } from "@/types"

function ProjectTags({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap items-start gap-2 w-full">
      {tags.map((tag, index) => (
        <Badge key={index} className="bg-sh-white text-b-white-invert" variant="colored">
          {tag}
        </Badge>
      ))}
    </div>
  )
}

function ProjectCategories({
  categories,
}: {
  categories: {
    name: string
    color: DEFAULT_COLOR_CODE_NAME_TYPE
  }[]
}) {
  return (
    <div className="flex flex-wrap items-start gap-1.5 px-1 py-1 w-full squircle-2xl/100 md:squircle-7xl/100 bg-sh-white overflow-hidden">
      {categories.map((category, index) => (
        <Badge key={index} className={cn("h-auto!", pickRandomColor(category.color))} variant="colored">
          {category.name}
        </Badge>
      ))}
    </div>
  )
}

export { ProjectTags, ProjectCategories }
