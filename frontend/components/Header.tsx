"use client";

import { useState } from "react";
import HeaderTopBar from "./HeaderTopBar";
import HeaderNavBar from "./HeaderNavBar";
import AllMenuModal from "./AllMenuModal";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full relative z-50">
      <HeaderTopBar />
      <HeaderNavBar onAllClick={() => setIsMenuOpen((v) => !v)} />

      {isMenuOpen && (
        <AllMenuModal onClose={() => setIsMenuOpen(false)} />
      )}
    </header>
  );
}