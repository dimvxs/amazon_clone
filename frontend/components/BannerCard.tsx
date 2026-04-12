"use client";

import Image from "next/image";

type Banner = {
  id: number;
  title: string;
  price: number;
  rating: number;
  imageUrl: string;
};

export default function BannerCard({ product }: { product: Banner }) {
  return (
    <div
      className="
        cursor-pointer w-full rounded-[10px] overflow-hidden
        flex flex-col justify-between bg-red-400
        h-auto layout-catalog-xs:h-[430px]
      "
    >
      <div className="relative w-full bg-gray-300 aspect-[188/261] layout-catalog-xs:flex-1 layout-catalog-xs:aspect-auto">
        <Image
          src={product.imageUrl}
          alt={product.title}
          fill
          className="object-cover"
        />

        <div className="absolute top-[10px] left-[8px] bg-surface-accent text-main text-[11px] leading-[16px] px-[6px] py-[4px] rounded-[3px]">
          Limited time deal
        </div>
      </div>

      <div className="p-[10px] flex flex-col gap-[14px] text-main bg-gray-700">
        <p className="layout-catalog-md:line-clamp-3  line-clamp-2 font-medium text-[16px] leading-[20px]">
          {product.title}
        </p>
        <div className="flex items-start flex-col">
          <div className="flex justify-between w-full items-center">
            <span className="flex justify-between items-top">
              <span className="text-[13px] leading-[100%] ">$</span>
              <span className="text-[26px] leading-[100%] ">
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
    </div>
  );
}
