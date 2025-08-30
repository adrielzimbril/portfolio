import { Card, CardContent } from "@/components/ui/card";
import { CardPreview } from "@/components/shared/pages/resources/page/details";

export interface Resource {
  icon: string;
  number: string;
  description: string;
}

export interface CardInfoProps {
  details: Resource;
}

export function ResourceCard({ details }: CardInfoProps) {
  return (
    <Card className="squircle size-full aspect-square max-w-[75%] md:max-w-[95%] squircle-stone-100 squircle-7xl squircle-smooth-lg border-0 overflow-hidden">
      <CardContent className="grid grid-cols-1 size-full p-4 gap-2">
        <CardPreview details={details} />
      </CardContent>
    </Card>
  );
}
