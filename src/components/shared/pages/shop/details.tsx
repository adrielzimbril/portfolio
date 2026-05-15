"use client";
import { Link } from "@/components/ui/link";
import { ShoppingBag } from "@aurthle/icons";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/utils/utils";
import { formatPrice } from "@/utils/formatPricing";
import { siteConfig } from "@/data/config";
import { DEFAULT_COLOR_CODE, DEFAULT_COLOR_CODE_NAME } from "@/types";
import { pickRandomColor, pickRandomColorCode } from "@/utils";

export function CardInfo({
  title,
  primaryTag,
  tags,
  isAvailable,
  description,
  price,
  officialPrice,
  currency,
  duration,
  isLookalike,
}: {
  title: string;
  primaryTag: string;
  tags: string[];
  isAvailable: boolean;
  description: string;
  price: number;
  officialPrice?: number;
  currency: string;
  duration: string;
  isLookalike?: boolean;
}) {
  const discountPercentage =
    officialPrice && officialPrice > price
      ? Math.round(((officialPrice - price) / officialPrice) * 100)
      : 0;

  return (
    <div className="flex flex-col items-start justify-between gap-4 size-full">
      <div className="flex flex-col items-start justify-center gap-2 w-full">
        <Header title={title} />

        <div className="flex items-center gap-2">
          <AvailabilityIndicator isAvailable={isAvailable} />
          {discountPercentage > 0 && (
            <Badge
              variant="colored"
              className={cn(
                pickRandomColor(DEFAULT_COLOR_CODE_NAME.GREEN),
                "squircle-border-green-400",
                "font-bold h-auto! py-1 px-2",
              )}
            >
              -{discountPercentage}%
            </Badge>
          )}
        </div>

        <Tags
          primaryTag={primaryTag}
          primaryTagColor={DEFAULT_COLOR_CODE_NAME.PURPLE}
          secondaryTag={duration}
          secondaryTagColor={DEFAULT_COLOR_CODE_NAME.YELLOW}
          tags={tags}
          lookalikeTag={isLookalike ? "Lookalike" : undefined}
        />

        <div className="flex flex-col gap-1 w-full">
          <Description description={description} />
          {discountPercentage > 0 && (
            <p className="w-full relative text-sm text-b-white-invert-sec line-clamp-3 leading-[140%] font-bold uppercase tracking-wider">
              ✨ Économisez {discountPercentage}% sur le prix officiel
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between w-full gap-3 mt-auto">
        <div className="flex flex-col">
          {officialPrice && officialPrice > price && (
            <span className="text-[10px] line-through text-b-white-invert-sec opacity-70 leading-none mb-0.5">
              {formatPrice((officialPrice + 0.4) as number, currency)}
            </span>
          )}
          <span className="text-xl font-semibold text-b-white-invert leading-tight">
            {formatPrice(price, currency, true)}
          </span>
        </div>

        <Action />
      </div>
    </div>
  );
}

interface AvailabilityIndicatorProps {
  isAvailable: boolean;
}

function AvailabilityIndicator({ isAvailable }: AvailabilityIndicatorProps) {
  const colorName = isAvailable
    ? DEFAULT_COLOR_CODE_NAME.GREEN
    : DEFAULT_COLOR_CODE_NAME.RED;
  const color = pickRandomColorCode(colorName) ?? DEFAULT_COLOR_CODE.GREEN;

  return (
    <Badge
      className={cn(
        "mb-1 self-start h-auto! md:h-auto! w-max! px-3.5 py-2 gap-2",
        "squircle-sh-white text-b-white-invert",
        "",
      )}
      variant="colored"
      size="sm"
      contentClassName="flex items-center gap-2 text-sm font-semibold leading-none"
    >
      <span className="relative inline-flex size-4 shrink-0 items-center justify-center">
        <span
          className={cn(
            "absolute inline-flex size-full animate-ping-slow rounded-full opacity-60",
            isAvailable ? "bg-green-300" : "bg-red-300",
          )}
        />
        <span
          className={cn(
            "relative inline-flex size-3 rounded-full",
            isAvailable ? "bg-green-500" : "bg-red-500",
          )}
        />
      </span>
      {isAvailable ? "Disponible" : "Indisponible"}
    </Badge>
  );
}

interface TagsProps {
  primaryTag?: string;
  primaryTagColor?: DEFAULT_COLOR_CODE_NAME;
  secondaryTag?: string;
  secondaryTagColor?: DEFAULT_COLOR_CODE_NAME;
  tags?: string[];
  lookalikeTag?: string;
  isCentered?: boolean;
  className?: string;
}

export function Tags({
  primaryTag,
  primaryTagColor,
  secondaryTag,
  secondaryTagColor,
  tags,
  lookalikeTag,
  isCentered,
  className,
}: TagsProps) {
  const renderedLabels = new Set<string>();

  return (
    <div
      className={cn(
        "flex flex-wrap items-start gap-1.5 px-1 py-1 w-full squircle squircle-smooth-xl squircle-2xl md:squircle-7xl squircle-sh-white overflow-hidden",
        isCentered && "text-center items-center justify-center",
        className,
      )}
    >
      {primaryTag &&
        (() => {
          const label = primaryTag.trim();
          if (!label || renderedLabels.has(label.toLowerCase())) return null;
          renderedLabels.add(label.toLowerCase());

          return (
            <Badge
              className={cn(
                "h-auto!",
                pickRandomColor(primaryTagColor ?? DEFAULT_COLOR_CODE_NAME.PURPLE),
              )}
              variant="colored"
            >
              {label}
            </Badge>
          );
        })()}

      {secondaryTag &&
        (() => {
          const label = secondaryTag.trim();
          if (!label || renderedLabels.has(label.toLowerCase())) return null;
          renderedLabels.add(label.toLowerCase());

          return (
            <Badge
              className={cn(
                "h-auto!",
                pickRandomColor(
                  secondaryTagColor ?? DEFAULT_COLOR_CODE_NAME.YELLOW,
                ),
              )}
              variant="colored"
            >
              {label}
            </Badge>
          );
        })()}

      {lookalikeTag &&
        (() => {
          const label = lookalikeTag.trim();
          if (!label || renderedLabels.has(label.toLowerCase())) return null;
          renderedLabels.add(label.toLowerCase());

          return (
            <Badge
              className={cn(
                "h-auto!",
                pickRandomColor(DEFAULT_COLOR_CODE_NAME.BLUE),
                "squircle-border-blue-400 font-bold",
              )}
              variant="colored"
            >
              ✨ {label}
            </Badge>
          );
        })()}

      {tags?.map((tag, index) => {
        const label = tag.trim();
        if (!label || renderedLabels.has(label.toLowerCase())) return null;
        renderedLabels.add(label.toLowerCase());

        return (
          <Badge className="h-auto!" key={index}>
            {label}
          </Badge>
        );
      })}
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
