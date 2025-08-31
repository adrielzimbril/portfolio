"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { GenericLoadingPage } from "@/components/shared/pages/page-loader";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayout";
import { sleep } from "@/utils";

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 5000);
  }, [isLoaded]);

  // useEffect(() => {
  //   sleep(5000).then(() => setIsLoaded(true));
  // }, []);

  return (
    <>
      {isLoaded ? (
        children
      ) : (
        <GenericLoadingPage
          title="Your ideas into products that your users adore"
          emoji="🦄"
          subtitle="Problem Solver & Your SaaS Product designer ❣️"
        />
      )}
    </>
  );
}
