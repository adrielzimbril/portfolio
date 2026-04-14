import { Card, CardContent } from "@/components/ui/card";
import { CardPreview } from "@/components/shared/pages/setup/preview";
import { CardInfo } from "@/components/shared/pages/setup/details";

export function SetupCard({
  title,
  cover,
  description,
  category,
  tags,
  purchaseUrl,
}: {
  title: string;
  cover?: string;
  description: string;
  category: string;
  tags: string[];
  purchaseUrl?: string;
}) {
  return (
    <Card className="squircle squircle-b-base-second squircle-6xl squircle-smooth-xl size-full border-0 overflow-hidden">
      <CardContent className="grid grid-cols-1 px-6 md:px-8 py-8 md:py-10 gap-4 size-full grid-rows-[auto_1fr]">
        <CardPreview
          title={title}
          cover={cover}
          coverText={{
            emoji: "🛠️",
            title: title,
            description: description,
          }}
          purchaseUrl={purchaseUrl}
        />
        <CardInfo
          title={title}
          description={description}
          category={category}
          tags={tags}
          purchaseUrl={purchaseUrl}
        />
      </CardContent>
    </Card>
  );
}
