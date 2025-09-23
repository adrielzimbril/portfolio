import { Link } from "@/components/ui/link";
import { ArrowRightOne, ArrowDownOne } from "@aurthle/icons";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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

export function ContentSection({
  title,
  description,
  badge,
  buttonLink,
  buttonText,
  buttonVariant,
  actionButton,
  onClick,
}: {
  title: string;
  description: string | React.ReactNode;
  badge?: string;
  buttonLink?: string;
  buttonText?: string;
  buttonVariant: "default" | "secondary";
  actionButton: boolean;
  onClick: () => void;
}) {
  return (
    <div className="flex flex-col gap-8 items-start justify-start relative md:max-w-[52%]">
      {badge && (
        <Badge
          size="lg"
          variant="colored"
          className="squircle-b-white text-b-white-invert"
        >
          {badge}
        </Badge>
      )}
      <h1 className="relative leading-[1.1] whitespace-pre-line">{title}</h1>
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
