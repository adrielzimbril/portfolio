import { Card, CardContent } from "@/components/ui/card";
import { PreviewValueCardDetails } from "@/components/shared/pages/shared/page/preview-value-card-details";
import { cn } from "@/utils/utils";

export interface CardInfoProps {
  icon: string;
  badge: string;
  title: string;
  description: string;
  className?: string;
}

export function PreviewValueCard({
  icon,
  badge,
  title,
  description,
  className,
}: CardInfoProps) {
  return (
    <Card
      className={cn(
        "squircle size-full max-w-[95%] squircle-stone-100 squircle-6xl squircle-smooth-lg border-0 overflow-hidden mx-auto",
        className
      )}
    >
      <CardContent className="grid grid-cols-1 size-full p-4 gap-2">
        <PreviewValueCardDetails
          icon={icon}
          badge={badge}
          title={title}
          description={description}
        />
      </CardContent>
    </Card>
  );
}
