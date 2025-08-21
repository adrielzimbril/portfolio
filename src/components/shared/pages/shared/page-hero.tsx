"use client";
import { Link } from "@/components/ui/link";
import { SectionBase } from "@/components/shared/pages/shared/section-base";
import { EmojiPlaceholder } from "@/components/shared/pages/shared/emoji-placeholder";
import { ArrowRightOne, ArrowDownOne } from "@aurthle/icons";
import { Button } from "@/components/ui/button";

function ContentSection({
  title,
  description,
  buttonLink,
  buttonText,
  buttonVariant,
  linkIsButton,
  onClick,
}: {
  title: string;
  description: string;
  buttonLink: string;
  buttonText: string;
  buttonVariant: "default" | "secondary";
  linkIsButton: boolean;
  onClick: () => void;
}) {
  return (
    <div className="flex flex-col gap-8 items-start justify-start relative md:max-w-[50%]">
      <h1 className="relative whitespace-pre-line">{title}</h1>
      <p className="relative text-2xl whitespace-pre-line">{description}</p>
      {linkIsButton ? (
        <Button
          onClick={onClick}
          variant={buttonVariant}
          size="lg"
          asIcon
          whileTap
          asPointer
        >
          <span>{buttonText}</span>
          {buttonVariant === "default" ? (
            <ArrowRightOne size={18} />
          ) : (
            <ArrowDownOne size={16} />
          )}
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
          <span>{buttonText}</span>
          {buttonVariant === "default" ? (
            <ArrowRightOne size={18} />
          ) : (
            <ArrowDownOne size={16} />
          )}
        </Link>
      )}
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
  linkIsButton = false,
  onClick = () => {},
}: {
  title: string;
  description: string;
  buttonLink: string;
  buttonText: string;
  buttonVariant?: "default" | "secondary";
  imagePath?: string;
  isMobileHidden?: boolean;
  imageContent?: React.ReactNode;
  linkIsButton?: boolean;
  onClick: () => void;
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
        linkIsButton={linkIsButton}
        onClick={onClick}
      />
    </SectionBase>
  );
}
