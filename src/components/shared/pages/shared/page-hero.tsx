"use client";
import { Link } from "@/components/ui/link";
import { SectionBase } from "@/components/shared/pages/shared/section-base";
import { EmojiPlaceholder } from "@/components/shared/pages/shared/emoji-placeholder";
import { ArrowRightOne, ArrowDownOne } from "@aurthle/icons";
import { Button } from "@/components/ui/button";

function ButtonContent({
  variant,
  buttonText,
}: {
  variant: "default" | "secondary";
  buttonText: string;
}) {
  return (
    <span className="flex items-center gap-1">
      {buttonText}
      {variant === "default" ? (
        <ArrowDownOne size={18} />
      ) : (
        <ArrowRightOne size={18} />
      )}
    </span>
  );
}

function ContentSection({
  title,
  description,
  buttonLink,
  buttonText,
  buttonVariant,
  actionButton,
  onClick,
}: {
  title: string;
  description: string;
  buttonLink?: string;
  buttonText?: string;
  buttonVariant: "default" | "secondary";
  actionButton: boolean;
  onClick: () => void;
}) {
  return (
    <div className="flex flex-col gap-8 items-start justify-start relative md:max-w-[50%]">
      <h1 className="relative whitespace-pre-line">{title}</h1>
      <p className="relative text-2xl whitespace-pre-line">{description}</p>
      {buttonLink &&
        buttonText &&
        (actionButton ? (
          <Button
            onClick={onClick}
            variant={buttonVariant}
            size="lg"
            asIcon
            whileTap
            asPointer
          >
            <ButtonContent variant={buttonVariant} buttonText={buttonText} />
          </Button>
        ) : (
          <Link
            href={buttonLink}
            variant={buttonVariant}
            size="lg"
            onClick={onClick}
            asIcon
            whileTap
            likeButton
          >
            <ButtonContent variant={buttonVariant} buttonText={buttonText} />
          </Link>
        ))}
    </div>
  );
}

export function PageHero({
  title,
  description,
  buttonLink,
  buttonText,
  buttonVariant = "default",
  imagePath,
  isMobileHidden = true,
  imageContent,
  actionButton = false,
  onClick = () => {},
}: {
  title: string;
  description: string;
  buttonLink?: string;
  buttonText?: string;
  buttonVariant?: "default" | "secondary";
  imagePath?: string;
  isMobileHidden?: boolean;
  imageContent?: React.ReactNode;
  actionButton?: boolean;
  onClick?: () => void;
}) {
  return (
    <SectionBase>
      {imagePath && (
        <EmojiPlaceholder src={imagePath} isMobileHidden={isMobileHidden} />
      )}
      {imageContent}
      <ContentSection
        title={title}
        description={description}
        buttonLink={buttonLink}
        buttonText={buttonText}
        buttonVariant={buttonVariant}
        actionButton={actionButton}
        onClick={onClick}
      />
    </SectionBase>
  );
}
