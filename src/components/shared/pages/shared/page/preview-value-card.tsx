import { Card, CardContent } from "@/components/ui/card";
import { PreviewValueCardDetails } from "@/components/shared/pages/shared/page/preview-value-card-details";

export interface CardInfoProps {
  icon: string;
  badge: string;
  title: string;
  description: string;
}

export function PreviewValueCard({
  icon,
  badge,
  title,
  description,
}: CardInfoProps) {
  return (
    <Card className="squircle size-full max-w-[75%] md:max-w-[95%] squircle-stone-100 squircle-6xl squircle-smooth-lg border-0 overflow-hidden mx-auto">
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
