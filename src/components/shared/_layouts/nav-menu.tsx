"use client";
import { cn } from "@/utils/utils";
import Link from "next/link";
import { useTranslations } from "use-intl";

export function NavMenu({
  menuRoutes,
  activeTab,
  setActiveTab,
}: {
  menuRoutes: { key: string; link: string }[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) {
  const t = useTranslations();
  return (
    <div className="w-fit hidden lg:block">
      <div className={cn("mx-auto flex w-full items-center justify-center")}>
        <div
          className={cn(
            "relative flex w-fit overflow-hidden items-center p-1",
            //"rounded-2xl overflow-hidden border-2 border-solid border-secondary",
            "squircle squircle-7xl squircle-transparent squircle-border-2 squircle-border-b-base-accent",
          )}
        >
          {menuRoutes.map((item) => (
            <Link
              key={item.key}
              href={item.link}
              onClick={() => setActiveTab(item.key)}
              className={cn(
                "relative transition-all duration-200",
                "px-4 py-2",
                //hasScrolled ? "px-4 py-2" : "px-5 py-3",
                //activeTab === item.name ? "z-1" : "z-0"
              )}
            >
              {activeTab === item.key && (
                <div
                  className={cn(
                    "absolute inset-0 bg-b-base-accent squircle-b-base-accent size-[95%] self-center place-self-center",
                    "squircle squircle-2xl md:squircle-7xl squircle-smooth-lg md:squircle-smooth-xl rounded-xl",
                  )}
                />
              )}
              <span
                className={cn(
                  "relative block text-sm font-medium transition-colors duration-200 hover:text-b-white-invert tracking-tight",
                  activeTab === item.key
                    ? "text-b-white-invert"
                    : "text-b-white-invert/60",
                )}
              >
                {t("common.menu." + item.key + ".desktop")}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
