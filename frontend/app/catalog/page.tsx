"use client";

import { useEffect, useState } from "react";

import ProductCard from "@/components/ProductCard";
import FiltersDesktop from "@/components/FiltersDesktop";
import FiltersMobile from "@/components/FiltersMobile";
import LimitedCard from "@/components/LimitedCard";
import ProductResultsHeader from "@/components/ProductResultsHeader";
import Pagination from "@/components/Pagination";

import { CatalogGrid } from "@/components/CatalogGrid";

import { useFilters } from "@/lib/hooks/useFilters";
import { useIsAbove } from "@/lib/hooks/useIsAbove";

import { limitedCards } from "@/public/data/limitedCards";

export default function CatalogPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [filters, setFilters] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { selectedFilters, updateFilter } = useFilters();
  const showThird = useIsAbove(847);

  useEffect(() => {
    const fetchProducts = async () => {
      console.log("fetch for page:", currentPage);
      console.log("with filters:", selectedFilters);

      if (filters.length === 0) {
        const resFilters = await fetch("/data/filters.json");
        const filtersData = await resFilters.json();
        setFilters(filtersData);
      }
      const res = await fetch("http://localhost:5012/api/product/catalog");
      const data = await res.json();

      setTotalPages(9);
      setProducts(data.products);
    };

    fetchProducts();
  }, [currentPage, selectedFilters]);

  return (
    <main className="w-full flex flex-col bg-page-default pt-[50px] gap-[21px]">
      <ProductResultsHeader className="layout-catalog-lg:hidden layout-product-px" />
      <FiltersMobile
        filters={filters}
        onChange={updateFilter}
        selectedFilters={selectedFilters}
      />
      <div className="w-full max-w-[1680px] flex justify-between gap-[72px] py-[44px]  layout-product-px">
        <FiltersDesktop
          filters={filters}
          onChange={updateFilter}
          selectedFilters={selectedFilters}
        />
        <div className="w-full flex flex-col gap-[24px]">
          <ProductResultsHeader className="layout-catalog-lg:flex hidden" />

          <CatalogGrid
            className="
              layout-catalog-xs:grid-cols-[repeat(auto-fit,minmax(188px,1fr))]
              xl:grid-cols-3
            "
          >
            {limitedCards.slice(0, showThird ? 3 : 2).map((limited) => (
              <LimitedCard key={limited.id} product={limited} />
            ))}
          </CatalogGrid>
          <CatalogGrid
            className="
              layout-catalog-xs:grid-cols-[repeat(auto-fill,minmax(200px,1fr))]
              layout-catalog-lg:grid-cols-[repeat(auto-fill,minmax(240px,1fr))]
              xl:grid-cols-5
            "
          >
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </CatalogGrid>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </main>
  );
}
