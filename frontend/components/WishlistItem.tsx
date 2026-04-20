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
    <div className="flex py-[16px] px-[20px] card-default gap-[8px]">
      <div className="w-[87px] h-[87px] relative rounded-[12px] overflow-hidden shrink-0">
        <Image src={imageSrc} alt="product" fill />
      </div>
      <div className="flex flex-col max-w-[700px] gap-[4px]">
        <span className=" font-medium text-[16px] leading-[20px">{title}</span>
        <span className="flex items-center text-[12px] leading-[16px] gap-[3px]">
          <span className="text-main/50">{rating}</span>
          <StarsRating size={13} rating={rating} />
        </span>
      </div>
      <div className="flex flex-col ml-auto items-end gap-[8px]">
        <DeleteButton onClick={onDelete} />
        <span className="text-[20px] leading-[100%] text-right">{price}</span>
        <button
          className="whitespace-nowrap text-[14px] leading-[20px] text-center align-middle 
          h-[30px] px-[22.5px] bg-surface-accent rounded-[20px]"
          onClick={onAddToCart}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
