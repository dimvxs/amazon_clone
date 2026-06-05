"use client";

import { useEffect, useState } from "react";
import HeaderTopBar from "./HeaderTopBar";
import HeaderNavBar from "./HeaderNavBar";
import AllMenuModal from "./AllMenuModal";
import { Category, RecommendedItem } from "@/lib/types/menu";

export default function Header({
  setMenuHeight,
}: {
  setMenuHeight: (h: number) => void;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [recommended, setRecommended] = useState<RecommendedItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  // --- ДИНАМИЧЕСКИЙ СТЕЙТ ДЛЯ ТЕСТИРОВАНИЯ UI ---
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true); // Переключи в false для проверки "Sign in / Register"
  const [cartCount, setCartCount] = useState<number>(1);       // Количество товаров (0 — скроет счетчик)
  const [userAvatar, setUserAvatar] = useState<string>("");    // Можешь передать тестовую ссылку на аватарку

  useEffect(() => {
    fetch("/data/categories.json")
      .then((res) => res.json())
      .then((json) => {
        setCategories(json.categories);
        setRecommended(json.recommended);
        setSelectedCategory((prev) => prev ?? json.categories[0]);
      });
  }, []);

  return (
    <header className="w-full relative z-50">
      <HeaderTopBar 
        onAllClick={() => setIsMenuOpen((v) => !v)} 
        isLoggedIn={isLoggedIn}
        cartCount={cartCount}
        userAvatar={userAvatar}
      />
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