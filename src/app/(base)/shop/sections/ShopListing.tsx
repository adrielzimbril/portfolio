"use client";

import { useEffect, useRef, useState } from "react";
import { ProductCard, ProductCardSkeleton, type Product } from "@/components/shared/pages/shop/card";
import shopProducts from "@/data/personal/shop-products.json";
import { SectionLayout } from "@/components/shared/sections/layout";

const ITEMS_PER_PAGE = 6;

export function ShopListing() {
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);
  const [isLoading, setIsLoading] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const products = shopProducts as Product[];
  const displayedProducts = products.slice(0, visibleItems);
  const hasMore = visibleItems < products.length;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          setIsLoading(true);
          // Simulate loading delay
          setTimeout(() => {
            setVisibleItems((prev) => Math.min(prev + ITEMS_PER_PAGE, products.length));
            setIsLoading(false);
          }, 500);
        }
      },
      { threshold: 0.1 }
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
  }, [hasMore, isLoading, products.length]);

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
      
      {isLoading && (
        <>
          <ProductCardSkeleton />
          <ProductCardSkeleton />
          <ProductCardSkeleton />
        </>
      )}
      
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
