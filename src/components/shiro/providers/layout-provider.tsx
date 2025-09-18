"use client";

import { useEffect, useState } from "react";
import { GenericLoadingPage } from "@/components/shared/pages/page-loader";
import { getActivePathInArray, sleep } from "@/utils";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { routes } from "@/data/route";
import logger from "@/utils/logger";

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

  // Find the current route directly from filtered menu routes
  const currentRoute = menuRoutesFiltered.find(
    (item) => item.link === activePath
  );
  const currentKey = currentRoute?.key || routes.home.key;

  useEffect(() => {
    // sleep(6000).then(() => setIsLoaded(true));
    logger.info("currentRoute", currentRoute);
    logger.info("currentKey", currentKey);
    if (route === "/") {
      logger.info("pathname", route);
      setIsLoaded(true);
    }
  }, []);

  return (
    <>
      {asLoader && !isLoaded ? (
        <GenericLoadingPage
          title={t("common.shared.base.title")}
          emoji="🦄"
          subtitle={t("common.shared.base.subtitle")}
        />
      ) : (
        children
      )}
    </>
  );
}
