"use client";

import Image from "next/image";
import placeholder from "@/assets/img/catalog-img.png";
import StarsRating from "@/components/StarsRating";
import DeleteButton from "@/components/DeleteButton";

import { StaticImageData } from "next/image";

type WishlistItemProps = {
  title: string;
  rating: number;
  price: string;
  onDelete?: () => void;
  onAddToCart?: () => void;
  imageSrc?: string | StaticImageData;
};

export default function WishlistItem({
  title,
  rating,
  price,
  onDelete,
  onAddToCart,
  imageSrc = placeholder,
}: WishlistItemProps) {
  return (
    <div className="flex gap-4 p-2 bg-red-500">
      <div className="w-[87px] h-[87px] relative shrink-0">
        <Image src={imageSrc} alt="product" fill />
      </div>
      <div className="flex flex-col bg-green-200 max-w-[700px]">
        <span className="text-black">{title}</span>

        <span className="flex items-center text-[12px] leading-[16px] gap-[3px]">
          <span className="text-black">{rating}</span>
          <StarsRating size={13} rating={rating} />
        </span>
      </div>
      <div className="flex flex-col bg-blue-200 ml-auto text-black items-end gap-[8px]">
        <DeleteButton onClick={onDelete} />
        <span>{price}</span>
        <button className="whitespace-nowrap" onClick={onAddToCart}>
          Add to cart
        </button>
      </div>

    </div>
  );
}