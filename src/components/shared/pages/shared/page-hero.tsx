import { SectionBase } from "@/components/shared/pages/shared/section-base";
import { EmojiPlaceholder } from "@/components/shared/pages/shared/emoji-placeholder";
import { ContentSection } from "./page-hero-content";

export function PageHero({
  title,
  description,
  badge,
  buttonLink,
  buttonText,
  buttonVariant = "default",
  imagePath,
  imgClassName,
  imageVariant = "default",
  isMobileShowed = false,
  imageContent,
  actionButton = false,
  onClick = () => {},
}: {
  title: string;
  description: string | React.ReactNode;
  badge?: string;
  buttonLink?: string;
  buttonText?: string;
  buttonVariant?: "default" | "secondary";
  imagePath?:
    | string
    | { emoji: string }
    | { mp4: string; webm: string; poster: string };
  imgClassName?: string;
  imageVariant?: "default" | "bordered" | "squircle";
  isMobileShowed?: boolean;
  imageContent?: React.ReactNode;
  actionButton?: boolean;
  onClick?: () => void;
}) {
  return (
    <SectionBase>
      {imagePath && (
        <EmojiPlaceholder
          src={imagePath}
          imgClassName={imgClassName}
          isMobileShowed={isMobileShowed}
          variant={imageVariant}
        />
      )}
      {imageContent}
      <ContentSection
        title={title}
        description={description}
        badge={badge}
        buttonLink={buttonLink}
        buttonText={buttonText}
        buttonVariant={buttonVariant}
        actionButton={actionButton}
        onClick={onClick}
      />
    </SectionBase>
  );
}
