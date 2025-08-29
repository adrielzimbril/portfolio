"use client";

import { useEffect, useState } from "react";
import { GenericLoadingPage } from "@/components/shared/pages/page-loader";

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 5000);
  }, [isLoaded]);

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
