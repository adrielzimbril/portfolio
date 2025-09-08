"use client";

import { useEffect, useState } from "react";
import { GenericLoadingPage } from "@/components/shared/pages/page-loader";

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const asLoader = false;

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
      {asLoader && !isLoaded ? (
        <GenericLoadingPage
          title="Your ideas into products that your users adore"
          emoji="🦄"
          subtitle="Problem Solver & Your SaaS Product designer ❣️"
        />
      ) : (
        children
      )}
    </>
  );
}
