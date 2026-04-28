"use client";
import { NavMenu } from "@/components/shared/_layouts/nav-menu";
import { ThemeToggle } from "@/components/shared/_layouts/theme-toggle";
import { siteConfig } from "@/data/config";
import { cn } from "@/utils/utils";
import { Menu, X } from "@aurthle/icons";
import { useScroll, type Variants } from "motion/react";
import { useEffect, useState } from "react";
import { routes } from "@/data/routes";
import { Link } from "@/components/ui/link";
import { Button } from "@/components/ui/button";
import { useTranslations } from "use-intl";
import { getActivePathInArray, getImageUrl, sleep } from "@/utils";
import { usePathname } from "next/navigation";
import { LogoIcon } from "@/components/shared/icons/logo/logo-icon";
import { useCompareIOSVersion } from "@/hooks/useIsMobile";
import Image from "next/image";

const INITIAL_WIDTH = "68rem";
const MAX_WIDTH = "65rem";

export function Navbar() {
  const t = useTranslations();
  const { scrollY } = useScroll();
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isBadIOS = useCompareIOSVersion();

  useEffect(() => {
    if (isBadIOS) return;
    const unsubscribe = scrollY.on("change", (latest) => {
      setHasScrolled(latest > 10);
    });
    return unsubscribe;
  }, [scrollY, isBadIOS]);

  const toggleDrawer = () => setIsDrawerOpen((prev) => !prev);
  const handleOverlayClick = () => setIsDrawerOpen(false);

  const route = usePathname();
  const menuRoutes = Object.values(routes);
  const menuRoutesFiltered = menuRoutes.filter((item) => item.inHeader);

  const activePath = getActivePathInArray({
    path: route,
    array: menuRoutes.map((item) => item.link),
    withSlash: true,
  });

  // Find the current route directly from filtered menu routes
  const currentRoute = menuRoutesFiltered.find(
    (item) => item.link === activePath,
  );
  const currentKey = currentRoute?.key || routes.home.key;
  const [activeTab, setActiveTab] = useState<string>(currentKey);

  return (
    <header
      className={cn(
        "sticky z-50 flex justify-center transition-all duration-300 md:mx-0",
        hasScrolled ? "top-6" : "top-4 mx-0",
      )}
    >
      <div
        className={cn(
          "container p-0",
          // "w-full!"
        )}
      >
        <div
          className={cn(
            "mx-auto container rounded-2xl transition-all duration-300 px-0 bg-b-white shadow-md",
            hasScrolled
              ? "px-2 py-1 backdrop-blur-lg bg-b-white/80"
              : "shadow-none",
          )}
        >
          <div className="flex h-[56px] items-center justify-between px-2 md:p-4">
            <Link
              href={routes.home.link}
              onClick={async () => {
                setActiveTab(routes.home.key);
              }}
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
              {/* <LogoName
                className={cn(
                  "hidden lg:block",
                  "h-5! qlg:h-6! w-48! qlg:w-60! shrink-0"
                  // hasScrolled && "h-3.5! w-36!"
                )}
              /> */}
            </Link>

            <NavMenu
              menuRoutes={menuRoutesFiltered}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />

            <div className="flex flex-row items-center gap-1 md:gap-3 shrink-0">
              <div className="hidden lg:flex items-center space-x-6">
                <Link href={routes.contact.link} likeButton whileTap>
                  {t("common.page-sections.header.cta")}
                </Link>
              </div>
              <ThemeToggle />
              <Button
                className="lg:hidden"
                size="icon"
                //variant="secondary"
                onClick={toggleDrawer}
              >
                {isDrawerOpen ? (
                  <X size={20} className="size-5" />
                ) : (
                  <Menu size={20} className="size-5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isDrawerOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleOverlayClick}
          />

          <div className="fixed inset-x-0 w-[95%] h-[95%] mx-auto top-3 bg-b-white border-4 border-b-base-accent p-4 rounded-xl">
            {/* Mobile menu content */}
            <div className="flex flex-col h-full justify-between gap-4">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <Link
                    href={routes.home.link}
                    className="flex items-center gap-3"
                    onClick={async () => {
                      setActiveTab(routes.home.key);
                      sleep(2000).then(() => {
                        toggleDrawer();
                      });
                    }}
                  >
                    <Image
                      className="size-12! rounded-2xl overflow-hidden object-cover pointer-events-none"
                      src={getImageUrl("icon-three.png")}
                      alt={siteConfig.description}
                      width={256}
                      height={256}
                    />
                    {/* <LogoIcon
                        className={cn(
                          "size-12! rounded-2xl overflow-hidden",
                          // hasScrolled && "w-10! h-10!"
                        )}
                      /> */}
                    {/* <LogoName className={cn("h-8! shrink-0")} /> */}
                  </Link>
                  <Button
                    onClick={toggleDrawer}
                    className="border border-border rounded-md p-1 cursor-pointer"
                  >
                    <X className="size-8!" />
                  </Button>
                </div>

                <ul className="w-full flex flex-col gap-2 text-sm mb-4">
                  {menuRoutesFiltered.map((item) => (
                    <li
                      key={item.key}
                      className={cn(
                        "w-full p-2.5 squircle squircle-7xl squircle-smooth-xl hover:squircle-xl squircle-border-2 squircle-border-b-base-accent hover:squircle-b-base",
                        activeTab === item.key
                          ? "squircle-b-white-invert-fr"
                          : "squircle-sh-white",
                      )}
                    >
                      <Link
                        href={item.link}
                        className={cn(
                          "w-full underline-offset-4 hover:text-b-white-invert/80 transition-colors",
                          activeTab === item.key
                            ? "text-b-white-invert font-medium"
                            : "text-b-white-invert/80",
                        )}
                        onClick={async () => {
                          setActiveTab(item.key);
                          sleep(2000).then(() => {
                            toggleDrawer();
                          });
                        }}
                      >
                        {/* {t("common.menu." + item.key + ".mobile")} */}
                        {t("common.menu." + item.key + ".desktop")}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col gap-2">
                <Link href={routes.contact.link} likeButton whileTap asFull>
                  {t("common.page-sections.header.cta")}
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
