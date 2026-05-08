"use client";

import { useEffect, useRef, useState } from "react";
import { ProductCard } from "@/components/shared/pages/shop/card";
import { shopProducts } from "@/data/personal/shop-products";
import { SectionLayout } from "@/components/shared/sections/layout";

const ITEMS_PER_PAGE = 6;

export function ShopListing() {
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);
  const [isLoading, setIsLoading] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const displayedProducts = shopProducts.slice(0, visibleItems);
  const hasMore = visibleItems < shopProducts.length;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          setIsLoading(true);
          // Simulate loading delay
          setTimeout(() => {
            setVisibleItems((prev) =>
              Math.min(prev + ITEMS_PER_PAGE, shopProducts.length),
            );
            setIsLoading(false);
          }, 500);
        }
      },
      { threshold: 0.1 },
    );

    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasMore, isLoading, shopProducts.length]);

  return (
    <SectionLayout
      title={undefined}
      description={undefined}
      className="py-14 md:py-[104px]"
      contentClassName="md:grid-cols-2 lg:grid-cols-3"
    >
      {displayedProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}

      <div ref={loadMoreRef} className="w-full h-10" />

      {!hasMore && !isLoading && displayedProducts.length > 0 && (
        <div className="col-span-full text-center py-8">
          <p className="text-b-white-invert-sec">
            Tous les produits ont été affichés
          </p>
        </div>
      )}
    </SectionLayout>
  );
}
