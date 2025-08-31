import { Link } from "@/components/ui/link";
import { LinkDiagonalOne } from "@aurthle/icons";
import { routes } from "@/data/route";
import { Tags } from "@/components/shared/pages/resources/tags";
import { ThoughtPreviewCardInfoProps } from "@/types";

export function CardInfo({ details }: ThoughtPreviewCardInfoProps) {
  return (
    <div className="flex flex-col items-start justify-between gap-4 w-full">
      <div className="flex flex-col items-start justify-center gap-4 w-full">
        <Header title={details.title} />

        <Tags primaryTag={details.primaryTag} tags={details.tags} />

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
