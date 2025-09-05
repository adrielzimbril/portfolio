import Image from "next/image";
import { cn } from "@/utils/utils";
import { ResourceInnerStatementPreviewCardInfoProps } from "@/types/type";
import { getImageUrl } from "@/utils/base-url";

export function CardPreview({
  details,
}: ResourceInnerStatementPreviewCardInfoProps) {
  return (
    <div
      className={cn(
        "flex relative flex-col gap-12 md:gap-16 min-h-60 items-start justify-between px-6 py-8 md:px-8 md:py-8 squircle squircle-smooth-xl squircle-6xl squircle-white overflow-hidden"
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
    <div className="flex flex-col items-start gap-2 w-full max-w-[90%] mx-auto">
      <>
        <h4 className="h2 tracking-wide">{number}</h4>

        <p className="text-zinc-500 leading-[120%]">{description}</p>
      </>
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
        src={getImageUrl(icon)}
      />
    </div>
  );
}
