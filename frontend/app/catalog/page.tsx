"use client";
import { useEffect, useState } from "react";
import queryString from "query-string";

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
import { useSearchParams } from "next/navigation";

export default function CatalogPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [filters, setFilters] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;

  const {
    selectedFilters,
    getNormalizedFilters,
    updateFilter,
    removeFilter,
    clearFilters,
  } = useFilters(filters, searchParams);

  const showThird = useIsAbove(847);

  const { setPage } = useFilters(filters, searchParams);

  useEffect(() => {
      const fetchFilters = async () => {
          // http://localhost:5012/api/product/filters
          // /data/filters.json
          const res = await fetch(`http://localhost:5012/api/product/filters`);
          const data = await res.json();
      setFilters(data);
    };

    fetchFilters();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      
      // console.log("fetch for page:", currentPage);
      //   console.log("with filters:", selectedFilters);
      //   const params = {
      //       department: selectedFilters.department,
      //       brand: selectedFilters.brand,
      //       condition: selectedFilters.condition,
      //       min: selectedFilters.price?.min ?? 0,
      //       max: selectedFilters.price?.max ?? 0 ,
      //       rating: selectedFilters.rating,
      //   }
      //   const query = queryString.stringify(params, { arrayFormat: 'comma' });

      //   const res = await fetch(`http://localhost:5012/api/product/catalog/${currentPage}&1?${query}`);

      console.log("fetch for page:", page);
      console.log("raw filters:", selectedFilters);

      const params = new URLSearchParams(searchParams.toString());
      const queryString = params.toString();

      console.log("final query string:", queryString);

      const url = `http://localhost:5012/api/product/catalog/1?${queryString}`;

      console.log("final request URL:", url);

      const res = await fetch(url);
      const data = await res.json();
        console.log(data);
      // setTotalPages(data.totalPages);
      setTotalPages(5); //placeholder value
      setProducts(data.products);
    };

    fetchProducts();
  }, [searchParams]);

  return (
    <main className="w-full flex flex-col bg-page-default pt-[50px] gap-[21px]">
      <ProductResultsHeader
        selectedFilters={selectedFilters}
        removeFilter={removeFilter}
        clearFilters={clearFilters}
        className="layout-catalog-lg:hidden layout-product-px"
      />
      <FiltersMobile
        filters={filters}
        onChange={updateFilter}
        selectedFilters={getNormalizedFilters()}
      />
      <div className="w-full max-w-[1680px] flex justify-between gap-[72px] layout-product-px">
        <FiltersDesktop
          filters={filters}
          onChange={updateFilter}
          selectedFilters={getNormalizedFilters()}
        />
        <div className="w-full flex flex-col gap-[24px]">
          <ProductResultsHeader
            removeFilter={removeFilter}
            clearFilters={clearFilters}
            selectedFilters={selectedFilters}
            className="layout-catalog-lg:flex hidden"
          />

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
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      </div>
    </main>
  );
}
