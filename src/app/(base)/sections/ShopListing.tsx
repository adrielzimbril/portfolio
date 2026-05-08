"use client";

import { useEffect, useRef, useState } from "react";
import { ProductCard } from "@/components/shared/pages/shop/card";
import { shopProducts } from "@/data/personal/shop-products";
import { SectionLayout } from "@/components/shared/sections/layout";
import { ShopFilter } from "./ShopFilter";

const ITEMS_PER_PAGE = 6;

export function ShopListing() {
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(shopProducts);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const displayedProducts = filteredProducts.slice(0, visibleItems);
  const hasMore = visibleItems < filteredProducts.length;

  const handleFilterChange = (
    category: string | null,
    search: string,
    type: string | null,
  ) => {
    let filtered = shopProducts;

    if (category) {
      filtered = filtered.filter((product) => product.primaryTag === category);
    }

    if (type) {
      filtered = filtered.filter((product) => {
        if (type === "Personnel") {
          return !product.isShared;
        } else if (type === "Partagé") {
          return product.isShared;
        }
        return true;
      });
    }

    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower) ||
          product.tags.some((tag) => tag.toLowerCase().includes(searchLower)),
      );
    }

    setFilteredProducts(filtered);
    setVisibleItems(12); // Reset pagination when filter changes
  };

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
      <ShopFilter onFilterChange={handleFilterChange} />

      <SectionLayout
        title={undefined}
        description={undefined}
        className="py-0"
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

        {displayedProducts.length === 0 && (
          <div className="col-span-full text-center py-16">
            <p className="text-b-white-invert-sec text-lg">
              Aucun produit ne correspond à votre recherche
            </p>
          </div>
        )}
      </SectionLayout>
    </div>
  );
}
