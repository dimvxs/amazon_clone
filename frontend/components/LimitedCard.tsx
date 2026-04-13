"use client";

import CatalogProductCard from "./CatalogProductCard";

type Limited = {
  id: number;
  title: string;
  price: number;
  rating: number;
  imageUrl: string;
};

export default function LimitedCard({ product }: { product: Limited }) {
  return (
    <CatalogProductCard product={product} variant="limited">
      <div className="p-[10px] flex flex-col gap-[14px] text-main ">
        <p className="layout-catalog-md:line-clamp-3 line-clamp-2 font-medium text-[16px] leading-[20px]">
          {product.title}
        </p>
        <div className="flex items-start flex-col">
          <div className="flex justify-between w-full items-center">
            <span className="flex justify-between items-top">
              <span className="text-[11px] leading-[100%]">$</span>

              <span className=" text-[20px] leading-[100%] ">
                {product.price}
              </span>
              <span className="text-[11px] leading-[100%]">99</span>
            </span>
            <span className="font-light text-[24px] leading-[32px]">-16%</span>
          </div>
          <span className="text-[12px] leading-[16px] ">
            List price: $79.99
          </span>
        </div>
      </div>
    </CatalogProductCard>
  );
}
