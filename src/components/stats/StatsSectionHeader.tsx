import { cn } from "@/utils/utils";

interface StatsSectionHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export function StatsSectionHeader({
  title,
  description,
  className,
}: StatsSectionHeaderProps) {
  return (
    <div className={cn("mb-6", className)}>
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      {description && (
        <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
