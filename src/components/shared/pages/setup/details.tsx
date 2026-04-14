"use client";
import { Link } from "@/components/ui/link";
import { LinkDiagonalOne } from "@aurthle/icons";
import { Tags } from "@/components/shared/pages/resources/tags";
import { getExternalUrl } from "@/utils/base-url";

export function CardInfo({
  title,
  description,
  category,
  purchaseUrl,
}: {
  title: string;
  description: string;
  category: string;
  purchaseUrl?: string;
}) {
  return (
    <div className="flex flex-col items-start justify-between gap-4 size-full">
      <div className="flex flex-col items-start justify-center gap-4 w-full">
        <Header title={title} slug={purchaseUrl ?? ""} />
        <Tags primaryTag={category} />
        <Description description={description} />
      </div>

      {purchaseUrl ? <Action label="Learn more" href={purchaseUrl} /> : null}
    </div>
  );
}

function Header({ title, slug }: { title: string; slug: string }) {
  return (
    <Link href={getExternalUrl(slug)}>
      <h3 className="relative h4 capitalize leading-[120%] line-clamp-2">{title}</h3>
    </Link>
  );
}

function Description({ description }: { description: string }) {
  return (
    <p className="w-full relative text-base text-b-white-invert-thr leading-6">
      {description}
    </p>
  );
}

function Action({ label, href }: { label: string; href: string }) {
  return (
    <Link href={href} likeButton whileTap size="xs" asIcon>
      <span className="flex items-center gap-1">
        {label}
        <LinkDiagonalOne size={16} />
      </span>
    </Link>
  );
}
