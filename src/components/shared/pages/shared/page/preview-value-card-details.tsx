import Image from "next/image";
import { cn } from "@/lib/utils";
import { CardInfoProps } from "@/components/shared/pages/shared/page/preview-value-card";
import { Badge } from "@/components/ui/badge";

function PreviewContent({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-start gap-4 md:gap-6 w-full">
      <h4 className="text-3xl leading-[120%]">{title}</h4>

      <p className="text-zinc-500 leading-[120%]">{description}</p>
    </div>
  );
}

function PreviewIcon({ icon }: { icon: string }) {
  return (
    <div className="inline-flex items-center justify-center gap-3 p-4 aspect-square bg-zinc-100 rounded-full overflow-hidden">
      <Image
        width={100}
        height={100}
        className="size-10 object-cover pointer-events-none"
        alt={icon}
        src={icon!}
      />
    </div>
  );
}

export function PreviewValueCardDetails({
  icon,
  badge,
  title,
  description,
}: CardInfoProps) {
  return (
    <div
      className={cn(
        "flex relative flex-col gap-12 md:gap-16 min-h-60 items-start justify-between px-6 py-8 md:px-8 md:py-14 squircle squircle-smooth-md squircle-4xl squircle-white overflow-hidden"
      )}
    >
      <div className="flex flex-row items-center justify-between w-full mx-auto">
        <Badge size="md">{badge}</Badge>
        <PreviewIcon icon={icon} />
      </div>
      <PreviewContent title={title} description={description} />
    </div>
  );
}
