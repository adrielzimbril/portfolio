import { Card, CardContent } from "@/components/ui/card";
import { CardPreview } from "@/components/shared/pages/resources/page/details";
import { ResourceInnerStatementPreviewCardInfoProps } from "@/types";

export function ResourceCard({
  details,
}: ResourceInnerStatementPreviewCardInfoProps) {
  return (
    <Card className="squircle size-full max-w-[85%] md:max-w-[95%] squircle-b-base squircle-5xl squircle-smooth-lg border-0 overflow-hidden">
      <CardContent className="grid grid-cols-1 size-full p-4 gap-2">
        <CardPreview details={details} />
      </CardContent>
    </Card>
  );
}
