"use client";
import { useEffect, useState } from "react";

export function usePageViews(path: string) {
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      try {
        // Increment view count
        const incRes = await fetch(`/api/views`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ path }),
        });
        const incJson = await incRes.json();
        if (!incRes.ok) throw new Error(incJson?.error || "Failed to increment");
        if (!cancelled) setCount(incJson.count);
      } catch (e: any) {
        try {
          // Fallback: just read
          const res = await fetch(`/api/views?path=${encodeURIComponent(path)}`);
          const json = await res.json();
          if (!res.ok) throw new Error(json?.error || "Failed to fetch");
          if (!cancelled) setCount(json.count ?? 0);
        } catch (err: any) {
          if (!cancelled) setError(err?.message || "Unknown error");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [path]);

  return { count, loading, error } as const;
}
