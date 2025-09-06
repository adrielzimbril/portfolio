"use client";
import { usePageViews } from "@/hooks/usePageViews";

export function ViewsIncrementor({ path }: { path: string }) {
  usePageViews(path);
  return null;
}
