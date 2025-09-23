"use client";
import { useEffect, useMemo, useState } from "react";
import { PageType } from "@/types";
import { apiRoutes } from "@/data/api-routes";

export function usePageViews(
  path: string,
  slug: string,
  type: PageType,
  details?: Record<string, unknown>,
  wantResponse?: boolean
) {
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const stringifiedDetails = details ? JSON.stringify(details) : null;
  const memoizedDetails = useMemo(
    () => stringifiedDetails,
    [stringifiedDetails]
  );

  useEffect(() => {
    let cancelled = false;

    async function run() {
      try {
        // Increment view count
        const incRes = await fetch(apiRoutes.views.link, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            path,
            slug,
            type,
            details: memoizedDetails,
            wantResponse,
          }),
        });
        const incJson = await incRes.json();
        if (!incRes.ok)
          throw new Error(incJson?.error || "Failed to increment");
        if (!cancelled) setCount(incJson.count);
      } catch (e: unknown) {
        try {
          // Fallback: just read
          const res = await fetch(
            `${apiRoutes.views.link}?path=${encodeURIComponent(
              path
            )}&slug=${encodeURIComponent(slug)}&type=${encodeURIComponent(
              type
            )}&details=${encodeURIComponent(
              memoizedDetails ?? ""
            )}&wantResponse=${wantResponse}`
          );
          const json = await res.json();
          if (!res.ok) throw new Error(json?.error || "Failed to fetch");
          if (!cancelled) setCount(json.count ?? 0);
        } catch (err) {
          if (!cancelled)
            setError((err as { message: string })?.message || "Unknown error");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [path, slug, type, memoizedDetails, wantResponse]);

  return { count, loading, error } as const;
}
