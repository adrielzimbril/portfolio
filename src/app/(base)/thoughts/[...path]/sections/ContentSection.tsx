import React from "react";
import { PageDetails } from "@/components/shared/pages/thoughts/page/page-details";

export function ContentsSection({ content }: { content: string }) {
  return <PageDetails content={content} />;
}
