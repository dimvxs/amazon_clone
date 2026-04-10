"use client";
import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import FiltersDesktop from "@/components/FiltersDesktop";
import FiltersMobile from "@/components/FiltersMobile";

export default function CatalogPage() {
  const [products, setProducts] = useState<any[]>([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/data/catalog_products.json");
      const data = await res.json();
      setProducts(data.products);
    };
    fetchProducts();
  }, []);

  return (
    <main className="w-full flex flex-col bg-page-default">
      <FiltersMobile/>
      <div className="w-full max-w-[1680px] flex justify-between gap-[72px] py-[44px] bg-gray-800  layout-product-px">
        <FiltersDesktop />
        <div className="w-full flex flex-col bg-gray-600">
          <div
            className="
            grid
            items-stretch
            gap-x-[10px]
            gap-y-[18px]
            grid-cols-[repeat(auto-fit,minmax(175px,1fr))]
            xl:grid-cols-5
          "
          >
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
