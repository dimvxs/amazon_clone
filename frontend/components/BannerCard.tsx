"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import StarsRating from "@/components/StarsRating";

type Banner = {
  id: number;
  title: string;
  price: number;
  rating: number;
  imageUrl: string;
};

export default function BannerCard({ product }: { product: Banner }) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/product/${product.id}`)}
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
      </div>

      <div className="p-[10px] flex flex-col gap-[6px] text-main bg-gray-700">
        <p className="text-[14px] leading-[20px] line-clamp-2">
          {product.title}
        </p>

        <p className="flex items-start">
          <span>$</span>
          <span>{product.price}</span>
          <span>ListPrice</span>
          <span>Discount</span>
        </p>
      </div>
    </div>
  );
}