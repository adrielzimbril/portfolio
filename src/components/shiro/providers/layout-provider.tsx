"use client";

import { useEffect, useState } from "react";
import { GenericLoadingPage } from "@/components/shared/pages/page-loader";
import { useTranslations } from "use-intl";
import { usePathname } from "next/navigation";
import { routes } from "@/data/routes";
import logger from "@/utils/logger";
import { getActivePathInArray, sleep } from "@/utils";

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const asLoader = true;
  const t = useTranslations();

  const route = usePathname();
  const menuRoutes = Object.values(routes);
  const menuRoutesFiltered = menuRoutes.filter((item) => item.inHeader);

  const activePath = getActivePathInArray({
    path: route,
    array: menuRoutes.map((item) => item.link),
    withSlash: true,
  });

  const currentRoute = menuRoutesFiltered.find(
    (item) => item.link === activePath
  );
  const currentKey = currentRoute?.key || routes.home.key;

  useEffect(() => {
    sleep(6000).then(() => setIsLoaded(true));
    // logger.info("currentRoute", currentRoute);
    // logger.info("currentKey", currentKey);
    // logger.info("pathname", route);
  }, [route, currentRoute, currentKey]);

  const pageLoader = (key: string) => ({
    emoji: t(`common.shared.page-loader.${key}.emoji`),
    title: t(`common.shared.page-loader.${key}.title`),
    subtitle: t(`common.shared.page-loader.${key}.subtitle`),
  });

  const loader = pageLoader(currentKey);

  return (
    <>
      {asLoader && !isLoaded ? (
        <GenericLoadingPage
          title={loader.title}
          emoji={loader.emoji}
          subtitle={loader.subtitle}
          isPage={
            currentRoute?.key === routes.home.key || currentRoute === undefined
          }
        />
      ) : (
        children
      )}
    </>
  );
}
