import { cn } from "@/utils/utils";
import { ResourceInnerStatementPreviewCardInfoProps } from "@/types";

export function CardPreview({
  details,
}: ResourceInnerStatementPreviewCardInfoProps) {
  return (
    <div
      className={cn(
        "flex flex-row items-center gap-6 md:gap-8 px-6 py-6 md:px-8 md:py-8 squircle squircle-smooth-xl squircle-4xl squircle-sh-white overflow-hidden",
      )}
    >
      <PreviewIcon icon={details.icon} />
      <PreviewContent
        number={details.number}
        description={details.description}
      />
    </div>
  );
}

function PreviewContent({
  number,
  description,
}: {
  number: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-start gap-2">
      <h4 className="h3 tracking-wide">{number}</h4>
      <p className="text-b-white-invert-thr leading-[120%]">{description}</p>
    </div>
  );
}

function PreviewIcon({ icon }: { icon: string }) {
  return (
    <div className="flex items-center justify-center gap-3 p-4 aspect-square bg-b-base rounded-full overflow-hidden">
      {/* <Image
        width={100}
        height={100}
        className="size-10 object-cover pointer-events-none"
        alt={icon}
        //src={{ emoji: icon }}
        src={getImageUrl(getEmojiHub(icon, "apple"))}
        // src={getImageUrl(getEmojiHub(icon, "fluent", "anim"))}
      /> */}
      <span className="size-full flex items-center justify-center text-4xl md:text-5xl object-cover pointer-events-none">
        {icon}
      </span>
    </div>
  );
}
