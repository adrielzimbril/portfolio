"use client";
import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/utils/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { SectionLayout } from "@/components/shared/sections/layout";
import { FilterButton } from "@/components/shared/pages/shop/FilterButton";
import { FilterModal } from "@/components/shared/pages/shop/FilterModal";
import { shopProducts } from "@/data/personal/shop-products";

interface ShopFilterProps {
  onFilterChange: (category: string | null, search: string) => void;
}

export function ShopFilter({ onFilterChange }: ShopFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

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
    "Personnel",
    "Partagé",
  ];

  // Init filter from URL parameters
  const showParam = searchParams.get("show");
  const initialCategory = showParam
    ? categories.find((cat) => cat.toLowerCase() === showParam.toLowerCase()) ||
      null
    : null;

  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    initialCategory,
  );
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

  // Calculate filtered products for counter
  const filteredProducts = shopProducts.filter((product) => {
    const matchesCategory =
      !selectedCategory || product.primaryTag === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    return matchesCategory && matchesSearch;
  });

  const hasActiveFilters = selectedCategory !== null || searchQuery !== "";

  // Notify parent when filter changes
  useEffect(() => {
    onFilterChange(selectedCategory, searchQuery);
  }, [selectedCategory, searchQuery, onFilterChange]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory((prev) => (prev === category ? null : category));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  const handleClearFilters = () => {
    setSelectedCategory(null);
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

      {/* Search bar */}
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-b-white-invert-sec h-4 w-4" />
        <Input
          type="text"
          placeholder="Rechercher un abonnement..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="pl-10 pr-10 border-0"
        />
        {searchQuery && (
          <Button
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 hover:bg-b-base gap-2"
            onClick={handleClearSearch}
            asIcon
            asPointer
            whileTap
          >
            <Badge variant="white" size="xs" circle className="ml-1">
              <X className="h-4 w-4 text-b-white-invert-sec" />
            </Badge>
          </Button>
        )}
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Badge
            key={category}
            variant={selectedCategory === category ? "colored" : "primary"}
            className={cn(
              "cursor-pointer transition-all hover:scale-105",
              selectedCategory === category && "squircle-blue-500 text-white",
            )}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </Badge>
        ))}
      </div>

      {/* Clear filters button */}
      {(selectedCategory || searchQuery) && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClearFilters}
          className="text-sm text-b-white-invert-sec hover:text-b-white-invert"
        >
          Effacer les filtres
        </Button>
      )}

      {/* Filter Modal */}
      <FilterModal
        isOpen={isFilterModalOpen}
        onOpenChange={setIsFilterModalOpen}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onClearFilters={handleClearFilters}
        categoryCounts={categoryCounts}
        categories={categories}
      />
    </div>
  );
}
