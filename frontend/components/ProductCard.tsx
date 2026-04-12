"use client";

import CatalogProductCard from "./CatalogProductCard";
import StarsRating from "./StarsRating";

type Product = {
  id: number;
  title: string;
  price: number;
  rating: number;
  imageUrl: string;
};

export default function ProductCard({ product }: { product: Product }) {
  return (
    <CatalogProductCard product={product} variant="product">
      <div className="p-[10px] flex flex-col gap-[8px] text-main bg-gray-700">
        <p className="line-clamp-2 font-medium text-[16px] leading-[20px]">
          {product.title}
        </p>

        <div className="flex gap-1 items-center">
          <span>{product.rating}</span>
          <StarsRating size={13} />
        </div>

        <div className="flex items-center gap-1">
          <span>$</span>
          <span className="text-[26px] leading-[100%]">{product.price}</span>
        </div>

        <button className="flex items-start bg-surface-accent w-fit px-[19px] py-[6px] rounded-[20px]">Add to cart</button>
      </div>
    </CatalogProductCard>
  );
}