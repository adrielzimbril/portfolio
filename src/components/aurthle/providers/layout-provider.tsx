"use client";
import { useEffect, useState } from "react";
import { GenericLoadingPage } from "@/components/shared/pages/page-loader";
import { useTranslations } from "use-intl";
import { usePathname } from "next/navigation";
import { routes } from "@/data/routes";
import { getActivePathInArray, sleep } from "@/utils";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { AnalyticsScript } from "@/integrations/analytics";
import ReactLenis from "lenis/react";
import { useCompareIOSVersion } from "@/hooks/useIsMobile";
import { init } from "@squircle/core";

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const asLoader = true;
  const isBadIOS = useCompareIOSVersion();
  const t = useTranslations();

  const route = usePathname();
  const isAdminRoute = route.startsWith("/landlord");
  const menuRoutes = Object.values(routes);
  const menuRoutesFiltered = menuRoutes.filter((item) => item.inHeader);

  const activePath = getActivePathInArray({
    path: route,
    array: menuRoutes.map((item) => item.link),
    withSlash: true,
  });

  const currentRoute = menuRoutesFiltered.find(
    (item) => item.link === activePath,
  );
  const currentKey = currentRoute?.key || routes.home.key;

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      await init();
      await sleep(4000);

      if (!cancelled) {
        setIsLoaded(true);
      }
    };

    void run();

    return () => {
      cancelled = true;
    };
  }, [route, currentRoute, currentKey]);

  const pageLoader = (key: string) => ({
    emoji: t(`common.shared.page-loader.${key}.emoji`),
    title: t(`common.shared.page-loader.${key}.title`),
    subtitle: t(`common.shared.page-loader.${key}.subtitle`),
  });

  const loader = pageLoader(currentKey);
  const showLoader = !isAdminRoute && asLoader && !isLoaded;
  const isHomePage =
    currentRoute?.key === routes.home.key || currentRoute === undefined;

  return (
    <>
      <SpeedInsights />
      <AnalyticsScript />

      {isBadIOS ? (
        showLoader ? (
          <GenericLoadingPage
            title={loader.title}
            emoji={loader.emoji}
            subtitle={loader.subtitle}
            isPage={isHomePage}
          />
        ) : (
          children
        )
      ) : showLoader ? (
        <GenericLoadingPage
          title={loader.title}
          emoji={loader.emoji}
          subtitle={loader.subtitle}
          isPage={isHomePage}
        />
      ) : (
        <ReactLenis root>{children}</ReactLenis>
      )}
    </>
  );
}
