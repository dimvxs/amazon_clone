"use client";

import { useEffect, useState } from "react";
import HeaderTopBar from "./HeaderTopBar";
import HeaderNavBar from "./HeaderNavBar";
import AllMenuModal from "./AllMenuModal";
import { Category, RecommendedItem } from "@/lib/types/menu";
import { useCategories } from "@/lib/hooks/useCategories";

export default function Header({
  setMenuHeight,
}: {
  setMenuHeight: (h: number) => void;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { categories, recommended } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  useEffect(() => {
    if (categories.length && !selectedCategory) {
      setSelectedCategory(categories[0]);
    }
  }, [categories, selectedCategory]);

  return (
    <header className="w-full relative z-50">
      <HeaderTopBar onAllClick={() => setIsMenuOpen((v) => !v)} />
      <HeaderNavBar onAllClick={() => setIsMenuOpen((v) => !v)} />

      {isMenuOpen && (
        <AllMenuModal
          categories={categories}
          recommended={recommended}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          onClose={() => setIsMenuOpen(false)}
          onHeightChange={setMenuHeight}
        />
      )}
    </header>
  );
}
