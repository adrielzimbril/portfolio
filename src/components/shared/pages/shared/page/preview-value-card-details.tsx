import { cn } from "@/utils/utils";
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

      <p className="text-b-white-invert-thr leading-[120%]">{description}</p>
    </div>
  );
}

function PreviewIcon({ icon }: { icon: string }) {
  return (
    <div className="inline-flex items-center justify-center gap-3 p-4 aspect-square bg-b-base rounded-full overflow-hidden">
      {/* <Image
        width={100}
        height={100}
        className="size-12 object-cover pointer-events-none"
        alt={icon}
        //src={getImageUrl(getEmojiHub(icon!, "apple"))}
        src={getImageUrl(getEmojiHub(icon!, "fluent", "anim"))}
        //src={{ emoji: icon }}
      /> */}
      <span className="size-full flex items-center justify-center text-4xl object-cover pointer-events-none">
        {icon}
      </span>
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
        "flex relative flex-col gap-12 md:gap-16 min-h-60 items-start justify-between px-6 py-8 md:px-8 md:py-14 squircle squircle-smooth-md squircle-2xl md:squircle-4xl squircle-sh-white/100 overflow-hidden"
      )}
    >
      <div className="flex flex-row items-center justify-between w-full mx-auto">
        <Badge className="capitalize" size="md">
          {badge}
        </Badge>
        <PreviewIcon icon={icon} />
      </div>
      <PreviewContent title={title} description={description} />
    </div>
  );
}
