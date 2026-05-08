"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { Search, X, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/utils/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { SectionLayout } from "@/components/shared/sections/layout";
import { FilterButton } from "@/components/shared/pages/shop/FilterButton";
import { FilterModal } from "@/components/shared/pages/shop/FilterModal";
import { shopProducts } from "@/data/personal/shop-products";

interface ShopFilterProps {
  onFilteredProductsChange: (products: typeof shopProducts) => void;
}

export function ShopFilter({ onFilteredProductsChange }: ShopFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const onFilteredProductsChangeRef = useRef(onFilteredProductsChange);

  // Update ref when prop changes
  useEffect(() => {
    onFilteredProductsChangeRef.current = onFilteredProductsChange;
  }, [onFilteredProductsChange]);

  // Extract unique categories from products
  const categories = [
    "IA",
    "Vidéo IA",
    "Audio IA",
    "Vidéo",
    "Design",
    "Musique",
    "Streaming",
    "Cloud",
    "VPN",
    "Productivité",
    "Bureautique",
    "Créatif",
    "Développement",
  ];

  // Extract unique categories from products
  const types = ["Personnel", "Partagé"];

  // Init filter from URL parameters
  const showParam = searchParams.get("show");
  const initialCategory = showParam
    ? categories.find((cat) => cat.toLowerCase() === showParam.toLowerCase()) ||
      null
    : null;

  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    initialCategory,
  );
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  // Calculate category counts
  const categoryCounts = categories.reduce(
    (acc, category) => {
      acc[category] = shopProducts.filter(
        (p) => p.primaryTag === category,
      ).length;
      return acc;
    },
    {} as Record<string, number>,
  );

  // Calculate type counts
  const typeCounts = types.reduce(
    (acc, type) => {
      if (type === "Personnel") {
        acc[type] = shopProducts.filter((p) => !p.isShared).length;
      } else if (type === "Partagé") {
        acc[type] = shopProducts.filter((p) => p.isShared).length;
      }
      return acc;
    },
    {} as Record<string, number>,
  );

  // Calculate filtered products for counter
  const filteredProducts = shopProducts.filter((product) => {
    const matchesCategory =
      !selectedCategory || product.primaryTag === selectedCategory;
    const matchesType =
      !selectedType ||
      (selectedType === "Personnel" && !product.isShared) ||
      (selectedType === "Partagé" && product.isShared);
    const matchesSearch =
      !searchQuery ||
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    return matchesCategory && matchesType && matchesSearch;
  });

  const hasActiveFilters =
    selectedCategory !== null || selectedType !== null || searchQuery !== "";

  // Notify parent when filter changes
  useEffect(() => {
    const filtered = shopProducts.filter((product) => {
      const matchesCategory =
        !selectedCategory || product.primaryTag === selectedCategory;
      const matchesType =
        !selectedType ||
        (selectedType === "Personnel" && !product.isShared) ||
        (selectedType === "Partagé" && product.isShared);
      const matchesSearch =
        !searchQuery ||
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase()),
        );
      return matchesCategory && matchesType && matchesSearch;
    });
    onFilteredProductsChangeRef.current(filtered);
  }, [selectedCategory, searchQuery, selectedType]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory((prev) => (prev === category ? null : category));
  };

  const handleTypeClick = (type: string) => {
    setSelectedType((prev) => (prev === type ? null : type));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  const handleClearFilters = () => {
    setSelectedCategory(null);
    setSelectedType(null);
    setSearchQuery("");
    router.push("/");
  };

  return (
    <div className="w-full flex flex-col gap-4 mb-8">
      {/* Filter Button */}
      <SectionLayout isFlex className="p-0!">
        <div className="flex justify-center w-full">
          <FilterButton
            onClick={() => setIsFilterModalOpen(true)}
            hasActiveFilters={hasActiveFilters}
            resultCount={filteredProducts.length}
          />
        </div>
      </SectionLayout>

      {/* Filter Modal */}
      <FilterModal
        isOpen={isFilterModalOpen}
        onOpenChange={setIsFilterModalOpen}
        selectedCategory={selectedCategory}
        onCategoryClick={handleCategoryClick}
        selectedType={selectedType}
        onTypeClick={handleTypeClick}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onClearFilters={handleClearFilters}
        categoryCounts={categoryCounts}
        typeCounts={typeCounts}
        categories={categories}
        types={types}
        resultCount={filteredProducts.length}
      />
    </div>
  );
}
