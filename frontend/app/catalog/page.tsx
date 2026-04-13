"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import FiltersDesktop from "@/components/FiltersDesktop";
import FiltersMobile from "@/components/FiltersMobile";
import LimitedCard from "@/components/LimitedCard";
import ProductResultsHeader from "@/components/ProductResultsHeader";
import { CatalogGrid } from "@/components/CatalogGrid";

type Limited = {
  id: number;
  title: string;
  price: number;
  rating: number;
  imageUrl: string;
};
function useIsAbove(width: number) {
  const [isAbove, setIsAbove] = useState(false);

  useEffect(() => {
    const check = () => setIsAbove(window.innerWidth >= width);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [width]);

  return isAbove;
}
export default function CatalogPage() {
  const [products, setProducts] = useState<any[]>([]);
  const showThird = useIsAbove(847);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/data/catalog_products.json");
      const data = await res.json();
      setProducts(data.products);
    };
    fetchProducts();
  }, []);

  const limitedCards: Limited[] = [
    {
      id: 1,
      title:
        "Wireless Gaming Headset with RGB Lighting, Noise-Canceling Microphone & Surround Sound for PC, PlayStation & Mobile",
      price: 19.99,
      rating: 4.5,
      imageUrl: "/images/limited1.jpg",
    },
    {
      id: 2,
      title:
        "Mechanical Gaming Keyboard with Custom RGB Backlight, Fast Response Switches & Anti-Ghosting for Gaming and Work",
      price: 59.99,
      rating: 4.2,
      imageUrl: "/images/limited2.jpg",
    },
    {
      id: 3,
      title:
        "Ergonomic Gaming Mouse with Adjustable DPI, Programmable Buttons & RGB Lighting for High-Precision Performance",
      price: 89.99,
      rating: 4.8,
      imageUrl: "/images/limited3.jpg",
    },
  ];

  return (
    <main className="w-full flex flex-col bg-page-default pt-[50px] gap-[21px]">
      <ProductResultsHeader className="layout-catalog-lg:hidden layout-product-px" />
      <FiltersMobile />
      <div className="w-full max-w-[1680px] flex justify-between gap-[72px] py-[44px]  layout-product-px">
        <FiltersDesktop />

        <div className="w-full flex flex-col gap-[24px]">
          <ProductResultsHeader className="layout-catalog-lg:flex hidden" />
          <CatalogGrid xlCols={3}>
            {limitedCards.slice(0, showThird ? 3 : 2).map((limited) => (
              <LimitedCard key={limited.id} product={limited} />
            ))}
          </CatalogGrid>
          <CatalogGrid xlCols={5}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </CatalogGrid>
        </div>
      </div>
    </main>
  );
}
