"use client";

import { useEffect, useState } from "react";
import HeaderTopBar from "./HeaderTopBar";
import HeaderNavBar from "./HeaderNavBar";
import AllMenuModal from "./AllMenuModal";
type Item = {
  label: string;
  key: string;
};

type Subsection = {
  title: string;
  items: Item[];
};

type Category = {
  title: string;
  icon?: string;
  subsections: Subsection[];
};
type RecommendedItem = {
  key: string;
  title: string;
  image: string;
};
export default function Header({
  setMenuHeight,
}: {
  setMenuHeight: (h: number) => void;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [recommended, setRecommended] = useState<RecommendedItem[]>([]);
   useEffect(() => {
    fetch("/data/categories.json")
      .then((res) => res.json())
      .then((json) => {
        setCategories(json.categories);
        setRecommended(json.recommended);
      });
  }, []);
  return (
    <header className="w-full relative z-50">
      <HeaderTopBar onAllClick={() => setIsMenuOpen(v => !v)} />
      <HeaderNavBar onAllClick={() => setIsMenuOpen(v => !v)} />

      {isMenuOpen && (
        <AllMenuModal
          categories={categories}
          recommended={recommended}
          onClose={() => setIsMenuOpen(false)}
          onHeightChange={setMenuHeight}
        />
      )}
    </header>
  );
}