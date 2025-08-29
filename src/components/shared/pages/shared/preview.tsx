import Image from "next/image";
import { cn } from "@/lib/utils";
import { ResourceType } from "@/types/enum";

interface PreviewProps {
  iconType?: ResourceType;
  icon?: string;
  iconAlt?: string;
  isWide?: boolean;
}

export function CardPreview({
  iconType,
  icon = "bold-duotone---school---book.svg",
  iconAlt,
  isWide,
}: PreviewProps) {
  return (
    <div
      className={cn(
        "flex relative flex-col min-h-60 items-center justify-center p-4 squircle squircle-smooth-xl squircle-3xl squircle-white overflow-hidden",
        isWide && "md:min-h-96"
      )}
    >
      <PreviewContent />
      {iconType && <PreviewIcon icon={icon} iconAlt={iconAlt} />}
    </div>
  );
}

function PreviewContent({ children }: { children?: React.ReactNode }) {
  return (
    <div className="flex flex-col items-start gap-3 w-full max-w-[90%] mx-auto">
      {children ?? (
        <>
          <h4 className="text-3xl tracking-wide leading-[120%]">
            😎
            <br />I made you looked.
          </h4>

          <p className="font-medium text-zinc-500 text-2xl leading-[120%]">
            You can have the rest of the empty space here.
          </p>
        </>
      )}
    </div>
  );
}

function PreviewIcon({ icon, iconAlt }: PreviewProps) {
  return (
    <div className="inline-flex items-center justify-center gap-3 p-2.5 absolute top-2 right-2 bg-zinc-100 rounded-full overflow-hidden">
      <Image
        width={24}
        height={24}
        className="w-6 h-6"
        alt={iconAlt ?? ""}
        src={icon!}
      />
    </div>
  );
}
