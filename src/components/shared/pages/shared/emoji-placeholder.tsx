import { cn } from "@/lib/utils";
import Image from "next/image";
import { useIsMobile } from "@/hooks/useIsMobile";

export function EmojiPlaceholder({
  src,
  isMobileHidden,
}: {
  src: string;
  isMobileHidden?: boolean;
}) {
  const isMobile = useIsMobile();
  return (
    <div
      className={cn(
        "relative bg-white md:order-2 flex items-center justify-center overflow-clip size-full md:size-[80%] aspect-square rounded-full pointer-events-none",
        isMobileHidden && isMobile && "hidden"
      )}
    >
      <div className="relative shrink-0 size-11 md:size-24">
        {/* <div
          className="absolute bg-center bg-cover bg-no-repeat inset-0"
          data-name="image 1001"
          style={{ backgroundImage: `url('${src}')` }}
        /> */}
        <Image
          src={src}
          className="w-full h-full object-cover pointer-events-none"
          width={100}
          height={100}
          alt=""
        />
      </div>
    </div>
  );
}
