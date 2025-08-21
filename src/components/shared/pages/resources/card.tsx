import { Card, CardContent } from "@/components/ui/card";
import { CardPreview } from "@/components/shared/pages/shared/preview";
import { CardInfo } from "@/components/shared/pages/resources/details";

interface Resource {
  id: string | number;
  title: string;
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

interface ResourceCardProps {
  resource: Resource;
}

export function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <Card className="squircle squircle-neutral-100 squircle-6xl squircle-smooth-xl rounded-4sxl border-0 overflow-hidden">
      <CardContent className="grid grid-cols-1 px-6 md:px-8 py-8 md:py-10 gap-4">
        <CardPreview icon={resource.icon} iconAlt={resource.iconAlt} />
        <CardInfo details={resource} />
      </CardContent>
    </Card>
  );
}
