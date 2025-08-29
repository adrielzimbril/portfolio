import { Card, CardContent } from "@/components/ui/card";
import { CardPreview } from "@/components/shared/pages/shared/preview";
import { CardInfo } from "@/components/shared/pages/resources/details";
import { ResourceType } from "@/types/enum";

export interface Resource {
  id: string | number;
  title: string;
  type: ResourceType;
  description: string;
  details: string;
  icon: string;
  iconAlt: string;
  primaryTag: string;
  tags: string[];
  avatars: Array<{ bg: string }>;
  userCount: string;
  buttonText: string;
}

export interface CardInfoProps {
  details: Resource;
}

export function ResourceCard({ details }: CardInfoProps) {
  return (
    <Card className="squircle squircle-neutral-100 squircle-6xl squircle-smooth-xl border-0 overflow-hidden">
      <CardContent className="grid grid-cols-1 px-6 md:px-8 py-8 md:py-10 gap-4">
        <CardPreview iconType={details.type} iconAlt={details.title} />
        <CardInfo details={details} />
      </CardContent>
    </Card>
  );
}
