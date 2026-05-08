"use client";
import { ThemeToggle } from "@/components/shared/_layouts/theme-toggle";
import { siteConfig } from "@/data/config";
import { cn } from "@/utils/utils";
import { MessageCircle } from "lucide-react";
import { useScroll } from "motion/react";
import { useEffect, useState } from "react";
import { routes } from "@/data/routes";
import { Link } from "@/components/ui/link";
import { getImageUrl } from "@/utils";
import { Whatsapp } from "@aurthle/icons";
import { useCompareIOSVersion } from "@/hooks/useIsMobile";
import Image from "next/image";

export function Navbar() {
  const { scrollY } = useScroll();
  const [hasScrolled, setHasScrolled] = useState(false);
  const isBadIOS = useCompareIOSVersion();

  useEffect(() => {
    if (isBadIOS) return;
    const unsubscribe = scrollY.on("change", (latest) => {
      setHasScrolled(latest > 10);
    });
    return unsubscribe;
  }, [scrollY, isBadIOS]);

  return (
    <header
      className={cn(
        "sticky z-50 flex justify-center transition-all duration-300 md:mx-0",
        hasScrolled ? "top-6" : "top-4 mx-0",
      )}
    >
      <div className="container p-0">
        <div
          className={cn(
            "mx-auto container rounded-2xl transition-all duration-300 px-0 bg-b-white",
            hasScrolled
              ? "px-2 py-1 backdrop-blur-lg bg-b-white/60"
              : "shadow-none",
          )}
        >
          <div className="flex h-[56px] items-center justify-between px-2 md:p-4">
            <Link
              href={routes.home.link}
              variant="none"
              size="none"
              className="flex items-center gap-1 md:gap-2"
            >
              <Image
                className="size-10! lg:size-12! rounded-2xl overflow-hidden object-cover pointer-events-none"
                src={getImageUrl("icon-five.png")}
                alt={siteConfig.description}
                width={256}
                height={256}
              />
            </Link>

            <div className="flex flex-row items-center gap-1 md:gap-3 shrink-0">
              <ThemeToggle />
              <Link
                className="md:size-auto md:p-2 aspect-square squircle-[#0fe01a]"
                size="icon"
                likeButton
                asIcon
                target="_blank"
                variant="colored"
                href={siteConfig.links.contact.social.whatsapp.url}
              >
                <Whatsapp size={24} className="size-5" variant="duotone" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
