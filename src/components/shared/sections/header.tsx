import { Badge } from "@/components/ui/badge";
import { Link } from "@/components/ui/link";
import { ArrowRightOne } from "@aurthle/icons";

export function SectionHeader({
  title,
  description,
  link,
  badge,
}: {
  title: string;
  description: string;
  link: string;
  badge: string;
}) {
  return (
    <div className="max-w-2xl mx-auto flex flex-col items-center gap-4 mb-12">
      {badge && <Badge>{badge}</Badge>}

      <h2 className="capitalize">{title}</h2>

      <p className="text-center text-xl md:text-2xl text-gray-600 font-medium">
        {description}
      </p>

      <Link href={link} variant="outline" asSquare asIcon whileTap size="xs">
        <span className="flex items-center gap-1">
          Voir plus <ArrowRightOne size={16} />
        </span>
      </Link>
    </div>
  );
}
