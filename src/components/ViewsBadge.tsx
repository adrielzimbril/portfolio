"use client";
import { EyeIcon } from "lucide-react";
import { usePageViews } from "@/hooks/usePageViews";
import { Badge } from "@/components/ui/badge";
import { PageType } from "@/types";

export function ViewsBadge({ path, type }: { path: string; type: PageType }) {
  const { count, loading } = usePageViews(path, "", type);
  const text = loading ? "..." : formatCount(count ?? 0);

  return (
    <Badge className="justify-center gap-1 px-3 py-1.5 bg-[#e2e4ff] rounded-[10px]">
      <EyeIcon className="w-4 h-4" />
      <span className="font-medium text-xs leading-4 whitespace-nowrap">
        {text}
      </span>
    </Badge>
  );
}

function formatCount(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M reads`;
  if (n >= 1_000) return `${Math.floor(n / 1_000)}K reads`;
  return `${n} reads`;
}
