"use client";
import { Link } from "@/components/ui/link";
import { ShoppingBag } from "@aurthle/icons";
import { Tags } from "@/components/shared/pages/resources/tags";
import { useTranslations } from "use-intl";
import { formatPricingForUser } from "@/utils/formatPricing";
import { useEffect, useState } from "react";

export function CardInfo({
  title,
  slug,
  primaryTag,
  tags,
  description,
  price,
  currency,
}: {
  title: string;
  slug: string;
  primaryTag: string;
  tags: string[];
  description: string;
  price: number;
  currency: string;
}) {
  const t = useTranslations();
  const [formattedPrice, setFormattedPrice] = useState<{
    price: string;
    currency: string;
  }>({
    price: `${price} ${currency}`,
    currency,
  });

  useEffect(() => {
    formatPricingForUser(price, currency).then((result) => {
      setFormattedPrice({
        price: result.price,
        currency: result.currency,
      });
    });
  }, [price, currency]);

  return (
    <div className="flex flex-col items-start justify-between gap-4 size-full">
      <div className="flex flex-col items-start justify-center gap-4 w-full">
        <Header title={title} slug={slug} />

        <Tags primaryTag={primaryTag} tags={tags} />

        <Description description={description} />
      </div>

      <div className="flex items-center justify-between w-full gap-3 mt-auto">
        <div className="flex flex-col">
          <span className="text-xl font-semibold text-b-white-invert">
            {formattedPrice.price}
          </span>
        </div>
        <Action slug={slug} />
      </div>
    </div>
  );
}

function Header({ title, slug }: { title: string; slug: string }) {
  return (
    <Link href={`/shop/${slug}`}>
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

function Action({ slug }: { slug: string }) {
  const t = useTranslations();

  return (
    <Link
      href={`/shop/${slug}`}
      likeButton
      whileTap
      size="xs"
      asIcon
      className="gap-2"
    >
      <span className="flex items-center gap-1">
        {t("shop.buy")}
        <ShoppingBag size={16} />
      </span>
    </Link>
  );
}
