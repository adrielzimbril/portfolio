"use client";

import { useEffect, useState } from "react";
import { GenericLoadingPage } from "@/components/shared/pages/page-loader";
import { sleep } from "@/utils";
import { useTranslations } from "next-intl";

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const asLoader = true;
  const t = useTranslations();

  useEffect(() => {
    sleep(5000).then(() => setIsLoaded(true));
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
