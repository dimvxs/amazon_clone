"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [menuHeight, setMenuHeight] = useState(0);

  return (
    <>
      <Header setMenuHeight={setMenuHeight} />
      <main 
        className="flex-1"
        style={{ minHeight: menuHeight ? `${menuHeight}px` : undefined }}
      >
        {children}
      </main>
      <Footer />
    </>
  );
}