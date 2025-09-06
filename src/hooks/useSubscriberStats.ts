"use client";
import { useEffect, useState } from "react";

async function fetchJSON(url: string) {
  const res = await fetch(url);
  const json = await res.json();
  if (!res.ok) throw new Error(json?.error || "Request failed");
  return json;
}

export function useNewsletterSubscribersCount() {
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const json = await fetchJSON(`/api/stats/subscribers?scope=newsletter`);
        if (!cancelled) setCount(json.count ?? 0);
      } catch (e: any) {
        if (!cancelled) setError(e?.message || "Unknown error");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true };
  }, []);

  return { count, loading, error } as const;
}

export function useProductTypeSubscribersCount(type: "course" | "ebook" | "video") {
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!type) return;
    let cancelled = false;
    (async () => {
      try {
        const json = await fetchJSON(`/api/stats/subscribers?scope=productType&type=${encodeURIComponent(type)}`);
        if (!cancelled) setCount(json.count ?? 0);
      } catch (e: any) {
        if (!cancelled) setError(e?.message || "Unknown error");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true };
  }, [type]);

  return { count, loading, error } as const;
}

export function useProductTitleRequestsCount(title: string) {
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!title) return;
    let cancelled = false;
    (async () => {
      try {
        const json = await fetchJSON(`/api/stats/subscribers?scope=productTitle&title=${encodeURIComponent(title)}`);
        if (!cancelled) setCount(json.count ?? 0);
      } catch (e: any) {
        if (!cancelled) setError(e?.message || "Unknown error");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true };
  }, [title]);

  return { count, loading, error } as const;
}
