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

interface ShopFilterProps {
  onFilterChange: (category: string | null, search: string) => void;
}

export function ShopFilter({ onFilterChange }: ShopFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Extraire les catégories uniques des produits
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

  // Initialiser le filtre depuis les paramètres URL
  useEffect(() => {
    const showParam = searchParams.get("show");
    if (showParam) {
      const normalizedParam = showParam.toLowerCase();
      const matchedCategory = categories.find(
        (cat) => cat.toLowerCase() === normalizedParam,
      );
      if (matchedCategory) {
        setSelectedCategory(matchedCategory);
      }
    }
  }, [searchParams]);

  // Notifier le parent quand le filtre change
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
    router.push("/shop");
  };

  return (
    <div className="w-full flex flex-col gap-4 mb-8">
      {/* Filter Button */}
      <SectionLayout isFlex className="p-0!">
        <div className="flex justify-center w-full">
          <FilterButton
            onClick={() => setIsFilterModalOpen(true)}
            hasActiveFilters={Boolean(hasActiveFilters)}
            resultCount={filteredChangelog.length}
          />
        </div>
      </SectionLayout>

      {/* Barre de recherche */}
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
            className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 hover:bg-b-base"
            onClick={handleClearSearch}
            asIcon
            asPointer
            whileTap
            className="gap-2"
          >
            <Badge variant="white" size="xs" circle className="ml-1">
              <X className="h-4 w-4 text-b-white-invert-sec" />
            </Badge>
          </Button>
        )}
      </div>

      {/* Filtres par catégorie */}
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

      {/* Bouton pour effacer les filtres */}
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
    </div>
  );
}
