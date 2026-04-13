"use client";

import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

interface MostViewedArticleCardProps {
  title: string;
  slug: string;
  imageName: string;
  viewCount: number;
  delay?: number;
}

export function MostViewedArticleCard({
  title,
  slug,
  imageName,
  viewCount,
  delay = 0,
}: MostViewedArticleCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const cardClassName = "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background transition-all duration-300 hover:border-primary hover:bg-card";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={cardClassName}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/blog/${slug}`} className="relative h-full">
        <div className="relative h-full min-h-[200px]">
          <Image
            src={`/img/blog/${imageName}`}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <motion.div
              animate={{ y: isHovered ? -4 : 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold rounded-full bg-primary/20 text-primary">
                Most Viewed
              </span>
              <h3 className="mb-2 text-xl font-bold text-white line-clamp-2">
                {title}
              </h3>
              <p className="text-sm text-gray-200">
                {viewCount.toLocaleString()} views
              </p>
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
