import { Link } from "@/components/ui/link";
import { LinkDiagonalOne } from "@aurthle/icons";
import { routes } from "@/data/route";
import {
  ProjectCategories,
  ProjectTags,
} from "@/components/shared/pages/projects/tags";
import { cn } from "@/utils/utils";
import { ProjectPreviewCardInfoProps } from "@/types/type";

export function CardInfo({ details, isWide }: ProjectPreviewCardInfoProps) {
  return (
    <div
      className={cn(
        "flex flex-col flex-1 items-start justify-between gap-4 w-full",
        isWide && "justify-center"
      )}
    >
      <div className="flex flex-col items-start justify-center gap-4 w-full">
        <ProjectTags tags={details.tags} />

        <Header title={details.title} />

        <ProjectCategories categories={details.categories} />

        <Description description={details.description} />
      </div>

      <Action buttonText={details.buttonText} />
    </div>
  );
}

function Header({ title }: { title: string }) {
  return <h3 className="relative capitalize">{title}</h3>;
}

function Description({ description }: { description: string }) {
  return (
    <>
      <p className="w-full relative text-[1.5rem] leading-[120%] font-medium text-zinc-600">
        {description}
      </p>
    </>
  );
}

function Action({ buttonText }: { buttonText: string }) {
  return (
    <Link href={routes.projects.link} likeButton whileTap size="xs" asIcon>
      <span className="flex items-center gap-1">
        {buttonText}
        <LinkDiagonalOne size={16} />
      </span>
    </Link>
  );
}
