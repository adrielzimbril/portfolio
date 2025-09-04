import { Link } from "@/components/ui/link";
import { LinkDiagonalOne } from "@aurthle/icons";
import { Tags } from "@/components/shared/pages/resources/tags";
import { Post } from "@/module/content/types";
import { getResourcesUrl } from "@/utils/base-url";

export function CardInfo({
  title,
  excerpt,
  tags,
  slug,
  created_at,
}: {
  title: string;
  excerpt: string;
  tags: { name: string }[];
  slug: string;
  created_at: string;
}) {
  return (
    <div className="flex flex-col items-start justify-between gap-4 size-full">
      <div className="flex flex-col items-start justify-center gap-4 w-full">
        <Header title={title} />

        {tags && (
          <Tags
            primaryTag={tags[0].name}
            tags={tags.slice(1, 5).map((tag) => tag.name)}
          />
        )}

        <Description description={excerpt} />
      </div>

      <Action slug={slug} />
    </div>
  );
}

function Header({ title }: { title: string }) {
  return (
    <h3 className="relative h4 capitalize leading-[120%] line-clamp-2">
      {title}
    </h3>
  );
}

function Description({ description }: { description: string }) {
  return (
    <>
      <p className="w-full relative text-xl line-clamp-3 leading-[120%] font-medium text-zinc-600">
        {description}
      </p>
    </>
  );
}

function Action({ slug }: { slug: string }) {
  return (
    <Link
      href={`${getResourcesUrl("thoughts", slug)}`}
      likeButton
      whileTap
      size="xs"
      asIcon
    >
      <span className="flex items-center gap-1">
        Lire
        <LinkDiagonalOne size={16} />
      </span>
    </Link>
  );
}
