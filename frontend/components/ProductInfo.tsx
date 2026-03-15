"use client";

import Link from "next/link";
import AboutItem from "./AboutItem";
import ProductPrice from "./ProductPrice";

export default function ProductInfo() {
  return (
    <section className="w-full layout-product-md:w-[637px] bg-green-200">
      <h1 className="text-black">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </h1>
      <Link href="/store" className="text-blue-600">
        Visit the Store
      </Link>
      <hr className="border-black" />

      <div className="flex justify-between items-center">
        <span className="text-black flex flex-col ">
          <ProductPrice/>
          <span>List Price: $79.99</span>
        </span>
        <span className="text-black flex flex-col items-center">-16%</span>
      </div>

      <hr className="border-black" />
      <AboutItem></AboutItem>
    </section>
  );
}
