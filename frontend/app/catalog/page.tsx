"use client";
import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";

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
    <main className="w-full flex bg-page-default layout-product-px">
      <div className="w-full max-w-[1680px] flex justify-between gap-[72px] py-[44px] bg-gray-800">
        <div className="w-full max-w-[200px] flex flex-col gap-[44px] py-[44px] bg-gray-500">
          <span>Filter menu</span>
        </div>
        <div className="w-full w-[1400px] flex flex-col bg-gray-600">
          <div
            className="
            grid
              items-stretch
            gap-x-[10px]
            gap-y-[18px]
            grid-cols-[repeat(auto-fit,minmax(180px,1fr))]
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
