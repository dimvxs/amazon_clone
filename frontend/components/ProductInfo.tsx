"use client";

import Link from "next/link";
import AboutItem from "./AboutItem";
import ProductPrice from "./ProductPrice";
import ProductPurchaseActions from "./ProductPurchaseActions";
import Stars from "./StarsRating";

export default function ProductInfo() {
  return (
    <section className="w-full layout-product-md:w-[637px] flex flex-col gap-[4px] text-default">
      <h1 className="text-2xl leading-8 align-middle">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </h1>

      <div className="flex flex-col gap-[3px]">
        <Link href="/store" className="text-[12.9px] leading-5 align-middle">
          Visit the Store
        </Link>
            <div className="flex items-center gap-[3px] text-small-default">
          <span>4.4</span>
          <Stars size={13} gap={2} />
          <span>(4,382)</span>
        </div>
      </div>

      <hr className="mb-[20px] border-surface-1" />
      <div className="flex justify-between items-center">
        <span className="flex flex-col">
          <ProductPrice />

          <span className="flex items-center text-xs leading-4 ">
            <span className="layout-product-product-hidden text-surface-3">List Price: $79.99</span>
            <span className="w-3 h-3 rounded-full bg-surface-3 ml-1 shrink-0 layout-product-product-hidden"></span>
          </span>
        </span>

        <span className="flex flex-col items-center text-2xl leading-8 font-light text-surface-2 layout-product-product-hidden">
          -16%
        </span>
      </div>
      <ProductPurchaseActions tabletOnly />

      <AboutItem />
    </section>
  );
}
