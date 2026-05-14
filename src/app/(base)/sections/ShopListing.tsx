"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Skeleton } from "boneyard-js/react";
import { ProductCard } from "@/components/shared/pages/shop/card";
import { shopProducts } from "@/data/personal/shop-products";
import { SectionLayout } from "@/components/shared/sections/layout";
import { ShopFilter } from "@/app/(base)/sections/ShopFilter";
import { useSquircleReady } from "@/components/providers/layout-provider";

const DEFAULT_VISIBLE_ITEMS = 6;
const ITEMS_PER_PAGE = 3;

export function ShopListing() {
  const [visibleItems, setVisibleItems] = useState(DEFAULT_VISIBLE_ITEMS);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(shopProducts);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const { isReady } = useSquircleReady();

  const displayedProducts = filteredProducts.slice(0, visibleItems);
  const hasMore = visibleItems < filteredProducts.length;

  const handleFilteredProductsChange = useCallback(
    (products: typeof shopProducts) => {
      setFilteredProducts(products);
      setVisibleItems(DEFAULT_VISIBLE_ITEMS);
    },
    [],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting && hasMore && !isLoading) {
          setIsLoading(true);
          // Simulate loading delay
          setTimeout(() => {
            setVisibleItems((prev) =>
              Math.min(prev + ITEMS_PER_PAGE, filteredProducts.length),
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
  }, [hasMore, isLoading, filteredProducts.length]);

  return (
    <div className="flex flex-col gap-8 py-14 md:py-[104px]">
      <Skeleton name="shop-filter" loading={!isReady}>
        <ShopFilter onFilteredProductsChange={handleFilteredProductsChange} />
      </Skeleton>

      <SectionLayout
        title={undefined}
        description={undefined}
        className="py-0"
        contentClassName="md:grid-cols-2 lg:grid-cols-3"
      >
        {displayedProducts.map((product) => (
          <Skeleton
            key={product.id}
            name="shop-product-card"
            loading={!isReady}
          >
            <ProductCard product={product} />
          </Skeleton>
        ))}

        <div ref={loadMoreRef} className="w-full h-10" />

        {!hasMore && !isLoading && displayedProducts.length > 0 && (
          <div className="col-span-full text-center py-8">
            <p className="text-b-white-invert-sec">
              Oups, nous n&apos;avons plus d&apos;autres abonnements 😅
            </p>
          </div>
        )}

        {displayedProducts.length === 0 && (
          <div className="col-span-full text-center py-16">
            <p className="text-b-white-invert-sec text-lg">
              Aucun abonnement ne correspond à votre recherche 😫
            </p>
          </div>
        )}
      </SectionLayout>
    </div>
  );
}
