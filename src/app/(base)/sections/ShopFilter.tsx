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

  // Dynamically extract unique primary tags that actually have products
  const categories = Array.from(
    new Set(shopProducts.map((p) => p.primaryTag)),
  ).sort();

  // Types remain static
  const types = ["Personnel", "Partagé"];

  // Availability options
  const availabilities = ["Disponible", "Indisponible"];

  // Init filter from URL parameters
  const showParam = searchParams.get("show");
  const initialCategory = showParam
    ? categories.find((cat) => cat.toLowerCase() === showParam.toLowerCase()) ||
      null
    : null;

  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedAvailability, setSelectedAvailability] = useState<
    string | null
  >(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  // Normalize text for comparison
  const normalize = (text: string) =>
    text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();

  // Boosted Search Logic
  const getMatchesSearch = (product: (typeof shopProducts)[0], query: string) => {
    if (!query) return true;

    const normalizedQuery = normalize(query);
    const searchTerms = normalizedQuery.split(/\s+/).filter((t) => t.length > 1);

    const targetFields = [
      normalize(product.title),
      normalize(product.description),
      normalize(product.primaryTag),
      ...product.tags.map((t) => normalize(t)),
    ];

    // 1. Direct substring match (Strongest)
    if (targetFields.some((field) => field.includes(normalizedQuery))) return true;

    // 2. Word-by-word match (Look-alike)
    if (searchTerms.length > 0 && searchTerms.some((term) => 
      targetFields.some((field) => field.includes(term))
    )) return true;

    // 3. Category/Tag match (Cross-reference)
    if (normalizedQuery.length > 2) {
      // If query looks like a category name
      const queryInCategories = categories.some(cat => normalize(cat).includes(normalizedQuery));
      if (queryInCategories && normalize(product.primaryTag).includes(normalizedQuery)) return true;
    }

    return false;
  };

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

  // Calculate availability counts
  const availabilityCounts = availabilities.reduce(
    (acc, availability) => {
      if (availability === "Disponible") {
        acc[availability] = shopProducts.filter((p) => p.available).length;
      } else if (availability === "Indisponible") {
        acc[availability] = shopProducts.filter((p) => !p.available).length;
      }
      return acc;
    },
    {} as Record<string, number>,
  );

  // Central filtering logic
  const performFiltering = (products: typeof shopProducts, query: string, cat: string[], type: string | null, avail: string | null) => {
    return products.map((product) => {
      const matchesCategory =
        cat.length === 0 ||
        cat.includes(product.primaryTag);
      const matchesType =
        !type ||
        (type === "Personnel" && !product.isShared) ||
        (type === "Partagé" && product.isShared);
      const matchesAvailability =
        !avail ||
        (avail === "Disponible" && product.available) ||
        (avail === "Indisponible" && !product.available);
      
      const searchMatch = getMatchesSearch(product, query);
      
      // A "Lookalike" match is a search match that isn't a direct title match
      const normalizedQuery = normalize(query);
      const isExactTitleMatch = query ? normalize(product.title).includes(normalizedQuery) : true;
      const isLookalike = query && searchMatch && !isExactTitleMatch;

      return {
        ...product,
        _isVisible: matchesCategory && matchesType && matchesAvailability && searchMatch,
        _isLookalike: isLookalike
      };
    }).filter(p => p._isVisible);
  };

  const filteredProducts = performFiltering(shopProducts, searchQuery, selectedCategory, selectedType, selectedAvailability);

  const hasActiveFilters =
    selectedCategory.length > 0 ||
    selectedType !== null ||
    selectedAvailability !== null ||
    searchQuery !== "";

  // Notify parent when filter changes
  useEffect(() => {
    const filtered = performFiltering(shopProducts, searchQuery, selectedCategory, selectedType, selectedAvailability);
    onFilteredProductsChangeRef.current(filtered as any);
  }, [selectedCategory, searchQuery, selectedType, selectedAvailability]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  const handleTypeClick = (type: string) => {
    setSelectedType((prev) => (prev === type ? null : type));
  };

  const handleAvailabilityClick = (availability: string) => {
    setSelectedAvailability((prev) =>
      prev === availability ? null : availability,
    );
  };

  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement> | string,
  ) => {
    const value = typeof e === "string" ? e : e?.target?.value || "";
    setSearchQuery(value);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  const handleClearFilters = () => {
    setSelectedCategory([]);
    setSelectedType(null);
    setSelectedAvailability(null);
    setSearchQuery("");
    router.push("/");
  };

  return (
    <div className="w-full flex flex-col">
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
        selectedAvailability={selectedAvailability}
        onAvailabilityClick={handleAvailabilityClick}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onClearFilters={handleClearFilters}
        categoryCounts={categoryCounts}
        typeCounts={typeCounts}
        availabilityCounts={availabilityCounts}
        categories={categories}
        types={types}
        availabilities={availabilities}
        resultCount={filteredProducts.length}
      />
    </div>
  );
}
