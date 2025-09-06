"use client";
import { usePageViews } from "@/hooks/usePageViews";
import { PageType } from "@/types";
import { useRouter } from "next/router";

export function ViewsIncrementor({
  path,
  slug,
  type,
  locale,
}: {
  path: string;
  slug: string;
  type: PageType;
  locale?: string;
}) {
  const router = useRouter();
  usePageViews(path, slug, type, { locale: locale, router });
  return null;
}
