import { Link } from "@/components/ui/link";
import { LinkDiagonalOne } from "@aurthle/icons";
import { routes } from "@/data/route";
import { Stats } from "@/components/shared/pages/resources/avatar-stats";
import { Tags } from "@/components/shared/pages/resources/tags";

interface CardInfo {
  id: string | number;
  title: string;
  description: string;
  details: string;
  primaryTag: string;
  tags: string[];
  avatars: Array<{ bg: string }>;
  userCount: string;
  buttonText: string;
}

interface CardInfoProps {
  details: CardInfo;
}

export function CardInfo({ details }: CardInfoProps) {
  return (
    <div className="flex flex-col items-start justify-between gap-4 w-full">
      <div className="flex flex-col items-start justify-center gap-4 w-full">
        <Header title={details.title} />

        <Tags primaryTag={details.primaryTag} tags={details.tags} />

        <Description
          description={details.description}
          details={details.details}
        />

        <Stats avatars={details.avatars} userCount={details.userCount} />
      </div>

      <Action buttonText={details.buttonText} />
    </div>
  );
}

function Header({ title }: { title: string }) {
  return <h3 className="relative capitalize">{title}</h3>;
}

function Description({
  description,
  details,
}: {
  description: string;
  details: string;
}) {
  return (
    <>
      <p className="w-full relative text-[1.5rem] leading-[120%] font-medium text-zinc-600">
        {description}
      </p>

      <p className="w-full relative text-base text-zinc-500 leading-6 whitespace-pre-line">
        {details}
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
