"use client";
import { NavMenu } from "@/components/shared/_layouts/nav-menu";
import { ThemeToggle } from "@/components/shared/_layouts/theme-toggle";
import { siteConfig } from "@/data/config";
import { cn } from "@/utils/utils";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion, useScroll, Variants } from "motion/react";
import { useEffect, useState } from "react";
import { LogoName } from "@/components/shared/icons/logo-name";
import Image from "next/image";
import { routes } from "@/data/route";
import { Link } from "@/components/ui/link";
import { Button } from "@/components/ui/button";
import { getImageUrl } from "@/utils/base-url";
import { useTranslations } from "next-intl";
import { getActivePathInArray, sleep } from "@/utils";
import { usePathname } from "next/navigation";

const INITIAL_WIDTH = "70rem";
const MAX_WIDTH = "70rem";

// Animation variants
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const drawerVariants: Variants = {
  hidden: { opacity: 0, y: 100 },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 200,
      staggerChildren: 0.03,
    },
  },
  exit: {
    opacity: 0,
    y: 100,
    transition: { duration: 0.1 },
  },
};

const drawerMenuContainerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const drawerMenuVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export function Navbar() {
  const t = useTranslations();
  const { scrollY } = useScroll();
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const sections = siteConfig.links.navbar.map((item) =>
        item.href.substring(1)
      );

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      setHasScrolled(latest > 10);
    });
    return unsubscribe;
  }, [scrollY]);

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
    (item) => item.link === activePath
  );
  const currentKey = currentRoute?.key || routes.home.key;
  const [activeTab, setActiveTab] = useState<string>(currentKey);

  return (
    <header
      className={cn(
        "sticky z-50 flex justify-center transition-all duration-300 md:mx-0",
        hasScrolled ? "top-6" : "top-4 mx-0"
      )}
    >
      <motion.div
        initial={{ width: INITIAL_WIDTH }}
        animate={{ width: hasScrolled ? MAX_WIDTH : INITIAL_WIDTH }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className="container p-0 w-full!"
      >
        <div
          className={cn(
            "mx-auto container rounded-2xl transition-all duration-300 px-0",
            hasScrolled
              ? "px-2 shadow-lg backdrop-blur-lg bg-background/70"
              : "shadow-none"
          )}
        >
          <div className="flex h-[56px] items-center justify-between md:p-4">
            <Link
              href={routes.home.link}
              variant="none"
              size="none"
              className="flex items-center gap-1 md:gap-1"
            >
              <Image
                width={56}
                height={56}
                className={cn(
                  "w-10! md:w-12! h-10! md:h-12!"
                  // hasScrolled && "w-10! h-10!"
                )}
                alt="Icon"
                src={getImageUrl("/icon.svg")}
              />
              {/* <LogoIcon className="size-7 md:size-10" /> */}
              <LogoName
                className={cn(
                  "hidden md:block",
                  "h-5! md:h-6! w-48! md:w-60! flex-shrink-0"
                  // hasScrolled && "h-3.5! w-36!"
                )}
              />
            </Link>

            <NavMenu
              hasScrolled={hasScrolled}
              menuRoutes={menuRoutesFiltered}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />

            <div className="flex flex-row items-center gap-1 md:gap-3 shrink-0">
              <div className="hidden md:flex items-center space-x-6">
                <Link href={routes.contact.link} likeButton whileTap>
                  {t("common.page-sections.header.cta")}
                </Link>
              </div>
              <ThemeToggle />
              <Button
                className="md:hidden"
                size="icon"
                //variant="secondary"
                onClick={toggleDrawer}
              >
                {isDrawerOpen ? (
                  <X className="size-5" />
                ) : (
                  <Menu className="size-5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={overlayVariants}
              transition={{ duration: 0.2 }}
              onClick={handleOverlayClick}
            />

            <motion.div
              className="fixed inset-x-0 w-[95%] h-[95%] mx-auto top-3 bg-background border border-border p-4 rounded-xl shadow-lg"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={drawerVariants}
            >
              {/* Mobile menu content */}
              <div className="flex flex-col h-full justify-between gap-4">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3">
                      <Image
                        width={56}
                        height={56}
                        className={cn("size-12")}
                        alt="Icon"
                        src={getImageUrl("/icon.svg")}
                      />
                      <LogoName className={cn("h-8! flex-shrink-0")} />
                    </Link>
                    <Button
                      onClick={toggleDrawer}
                      className="border border-border rounded-md p-1 cursor-pointer"
                    >
                      <X className="size-8!" />
                    </Button>
                  </div>

                  <motion.ul
                    className="flex flex-col gap-2 text-sm mb-4"
                    variants={drawerMenuContainerVariants}
                  >
                    <AnimatePresence>
                      {menuRoutesFiltered.map((item) => (
                        <motion.li
                          key={item.name}
                          className={cn(
                            "p-2.5 squircle squircle-7xl squircle-smooth-xl hover:squircle-xl squircle-border-2 squircle-border-stone-200 hover:squircle-stone-100",
                            activeTab === item.key
                              ? "squircle-stone-200"
                              : "squircle-white"
                          )}
                          variants={drawerMenuVariants}
                        >
                          <Link
                            href={item.link}
                            className={`underline-offset-4 hover:text-primary/80 transition-colors ${
                              activeTab === item.key
                                ? "text-primary font-medium"
                                : "text-primary/60"
                            }`}
                            onClick={async () => {
                              setActiveTab(item.key);
                              await sleep(5000);
                              toggleDrawer();
                            }}
                          >
                            {item.name}
                          </Link>
                        </motion.li>
                      ))}
                    </AnimatePresence>
                  </motion.ul>
                </div>

                {/* Action buttons */}
                <div className="flex flex-col gap-2">
                  <Link href={routes.contact.link} likeButton whileTap asFull>
                    {t("common.page-sections.header.cta")}
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
