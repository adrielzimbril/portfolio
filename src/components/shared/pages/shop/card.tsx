"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "@aurthle/icons";
import { cn } from "@/utils/utils";
import Image from "next/image";
import { useState } from "react";

export interface Product {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  currency: string;
  primaryTag: string;
  tags: string[];
  featured?: boolean;
  createdAt: string;
}

export function ProductCard({ product }: { product: Product }) {
  const [imageError, setImageError] = useState(false);

  return (
    <Card className="group relative flex flex-col squircle squircle-b-base-second squircle-6xl squircle-smooth-xl border-0 size-full overflow-hidden">
      <CardContent className="relative flex flex-col gap-4 size-full p-6">
        {/* Image */}
        <div className="relative w-full aspect-[4/3] overflow-hidden squircle squircle-b-base squircle-4xl squircle-smooth-lg">
          {!imageError ? (
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-b-base">
              <span className="text-b-white-invert-sec text-sm">
                Image non disponible
              </span>
            </div>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          <Badge
            className="squircle-primary text-b-black-unchanged"
            variant="colored"
          >
            {product.primaryTag}
          </Badge>
          {product.tags.slice(0, 3).map((tag) => (
            <Badge
              key={tag}
              className="squircle-sh-white text-b-white-invert"
              variant="colored"
            >
              {tag}
            </Badge>
          ))}
        </div>

        {/* Title */}
        <h3 className="h4 line-clamp-2 leading-[120%]">{product.title}</h3>

        {/* Description */}
        <p className="text-sm text-b-white-invert-sec line-clamp-3 leading-[140%]">
          {product.description}
        </p>

        {/* Price and Button */}
        <div className="flex items-center justify-between mt-auto gap-3">
          <div className="flex flex-col">
            <span className="text-xl font-semibold text-b-white-invert">
              {product.price} {product.currency}
            </span>
          </div>
          <Button variant="default" size="xs" className="gap-2">
            <ShoppingBag size={16} />
            Acheter
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export function ProductCardSkeleton() {
  return (
    <Card className="squircle squircle-b-base-second squircle-6xl squircle-smooth-xl border-0 size-full">
      <CardContent className="flex flex-col gap-4 size-full p-6">
        <div className="w-full aspect-[4/3] squircle squircle-b-base squircle-4xl squircle-smooth-lg animate-pulse" />
        <div className="flex flex-wrap gap-2">
          <div className="h-6 w-16 squircle squircle-b-base animate-pulse" />
          <div className="h-6 w-12 squircle squircle-b-base animate-pulse" />
          <div className="h-6 w-14 squircle squircle-b-base animate-pulse" />
        </div>
        <div className="h-6 w-3/4 squircle squircle-b-base animate-pulse" />
        <div className="h-16 w-full squircle squircle-b-base animate-pulse" />
        <div className="flex items-center justify-between mt-auto gap-3">
          <div className="h-8 w-20 squircle squircle-b-base animate-pulse" />
          <div className="h-10 w-24 squircle squircle-b-base animate-pulse" />
        </div>
      </CardContent>
    </Card>
  );
}
