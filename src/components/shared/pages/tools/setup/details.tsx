"use client";
import { Link } from "@/components/ui/link";
import { Tags } from "@/components/shared/pages/resources/tags";
import { getExternalUrl } from "@/utils";
import { useTranslations } from "use-intl";
import { DEFAULT_COLOR_CODE_NAME } from "@/types";

export function CardInfo({
  title,
  description,
  category,
  tags,
  purchaseUrl,
}: {
  title: string;
  description: string;
  category: string;
  tags: string[];
  purchaseUrl?: string;
}) {
  const t = useTranslations("toolbox.setup");

  const translatedCategory = t(`categories.${category}`);
  const translatedTags = tags.map((tag) => t(`tags.${tag.toLowerCase()}`));

  return (
    <div className="flex flex-col items-start justify-center gap-4 size-full">
      <Header title={title} slug={purchaseUrl ?? ""} />
      <Tags
        primaryTag={translatedCategory}
        primaryTagColor={DEFAULT_COLOR_CODE_NAME.ORANGE}
        tags={translatedTags}
      />
      <Description description={description} />
    </div>
  );
}

function Header({ title, slug }: { title: string; slug: string }) {
  return (
    <Link href={getExternalUrl(slug)}>
      <h3 className="relative h4 capitalize leading-[120%] line-clamp-2">
        {title}
      </h3>
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
