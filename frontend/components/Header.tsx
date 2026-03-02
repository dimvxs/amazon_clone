"use client";
import HeaderTopBar from "./HeaderTopBar";
import HeaderNavBar from "./HeaderNavBar";

export default function Header() {
  return (
    <header className="w-full border-b">
      <HeaderTopBar />
      <HeaderNavBar />
    </header>
  );
}
