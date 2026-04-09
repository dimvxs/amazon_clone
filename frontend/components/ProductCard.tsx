"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import StarsRating from "@/components/StarsRating";

type Product = {
  id: number;
  title: string;
  price: number;
  rating: number;
  imageUrl: string;
};

export default function ProductCard({ product }: { product: Product }) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/product/${product.id}`)}
      className="cursor-pointer w-full rounded-[10px] overflow-hidden flex flex-col"
    >
      <div className="relative aspect-[272/285] w-full bg-gray-300">
        <Image
          src={product.imageUrl}
          alt={product.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-[10px] flex flex-col gap-[6px] text-main bg-gray-700">
        <p className="text-[14px] leading-[20px] line-clamp-2">
          {product.title}
        </p>

        <div className="flex gap-1">
          <span>{product.rating}</span>
          <StarsRating size={13} />
        </div>

        <p className="flex items-start">
          <span>$</span>
          <span>{product.price}</span>
        </p>

        <button className="flex items-start">Add to cart</button>
      </div>
    </div>
  );
}