"use client";
import { Link } from "@/components/ui/link";
import { ShoppingBag } from "@aurthle/icons";
import { Tags } from "@/components/shared/pages/resources/tags";
import { formatPrice } from "@/utils/formatPricing";
import { siteConfig } from "@/data/config";
import { DEFAULT_COLOR_CODE_NAME } from "@/types";

export function CardInfo({
  title,
  primaryTag,
  tags,
  isAvailable,
  description,
  price,
  currency,
}: {
  title: string;
  primaryTag: string;
  tags: string[];
  isAvailable: boolean;
  description: string;
  price: number;
  currency: string;
}) {
  return (
    <div className="flex flex-col items-start justify-between gap-4 size-full">
      <div className="flex flex-col items-start justify-center gap-4 w-full">
        <Header title={title} />

        <Tags
          primaryTag={isAvailable ? "Disponible" : "Indisponible"}
          primaryTagColor={
            isAvailable
              ? DEFAULT_COLOR_CODE_NAME.GREEN
              : DEFAULT_COLOR_CODE_NAME.RED
          }
          tags={tags}
        />

        <Description description={description} />
      </div>

      <div className="flex items-center justify-between w-full gap-3 mt-auto">
        <div className="flex flex-col">
          <span className="text-xl font-semibold text-b-white-invert">
            {formatPrice(price, currency)}
          </span>
        </div>
        <Action />
      </div>
    </div>
  );
}

function Header({ title }: { title: string }) {
  return (
    <Link href={siteConfig.links.contact.social.whatsapp.url}>
      <h3 className="relative h4 capitalize leading-[120%] line-clamp-2">
        {title}
      </h3>
    </Link>
  );
}

function Description({ description }: { description: string }) {
  return (
    <p className="w-full relative text-sm text-b-white-invert-sec line-clamp-3 leading-[140%]">
      {description}
    </p>
  );
}

function Action() {
  return (
    <Link
      href={siteConfig.links.contact.social.whatsapp.url}
      likeButton
      whileTap
      size="xs"
      asIcon
      className="gap-2"
    >
      <span className="flex items-center gap-1">
        Acheter
        <ShoppingBag size={16} />
      </span>
    </Link>
  );
}
