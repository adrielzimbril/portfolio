"use client";
import { NextSeo, NextSeoProps } from "next-seo";

interface SeoProps extends NextSeoProps {
  url: string;
}

export function Seo({ title, description, url, ...props }: SeoProps) {
  return (
    <NextSeo
      title={title}
      description={description}
      openGraph={{
        url: url,
        title,
        description,
      }}
      {...props}
    />
  );
}
