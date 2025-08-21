import { Badge } from "@/components/ui/badge";
import { Link } from "@/components/ui/link";
import { cn } from "@/lib/utils";
import { ArrowRightOne } from "@aurthle/icons";

export function SectionHeader({
  title,
  description,
  link,
  badge,
  layoutStart,
}: {
  title: string;
  description: string;
  link?: string;
  badge?: string;
  layoutStart?: boolean;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl flex flex-col items-start justify-start gap-4 mb-12",
        !layoutStart && " mx-auto items-center justify-center text-center"
      )}
    >
      {badge && <Badge>{badge}</Badge>}

      <h2 className={cn(layoutStart ? "h2 md:h3 font-normals" : "capitalize")}>
        {title}
      </h2>

      <p
        className={cn(
          "text-xl md:text-2xl text-gray-600",
          !layoutStart && "font-medium"
        )}
      >
        {description}
      </p>

      {link && (
        <Link
          href={link}
          variant="outline"
          likeButton
          asIcon
          whileTap
          size="xs"
        >
          <span className="flex items-center gap-1">
            Voir plus <ArrowRightOne size={16} />
          </span>
        </Link>
      )}
    </div>
  );
}
