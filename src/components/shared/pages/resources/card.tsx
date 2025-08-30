import { Card, CardContent } from "@/components/ui/card";
import { CardPreview } from "@/components/shared/pages/shared/preview";
import { CardInfo } from "@/components/shared/pages/resources/details";
import { ResourcePreviewCardInfoProps } from "@/types/type";

export function ResourceCard({ details }: ResourcePreviewCardInfoProps) {
  return (
    <Card className="squircle squircle-neutral-100 squircle-6xl squircle-smooth-xl border-0 overflow-hidden">
      <CardContent className="grid grid-cols-1 px-6 md:px-8 py-8 md:py-10 gap-4">
        <CardPreview iconType={details.type} iconAlt={details.title} />
        <CardInfo details={details} />
      </CardContent>
    </Card>
  );
}
