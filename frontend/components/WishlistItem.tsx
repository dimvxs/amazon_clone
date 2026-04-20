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
      <div className="flex flex-col w-full">
        <div className="flex flex-col w-full h-fit gap-[4px] ">
          <div className="flex justify-between">
            <span className=" font-medium text-[16px] leading-[20px">
              {title}
            </span>
            <DeleteButton onClick={onDelete} />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-start">
          <span className="flex items-start text-[12px] leading-[16px] gap-[3px]">
            <span className="text-main/50">{rating}</span>
            <StarsRating size={13} rating={rating} />
          </span>

          <div className="flex flex-col mt-[8px] sm:mt-0 sm:ml-auto sm:items-end gap-[8px]">
            <span className="text-[20px] leading-[100%] sm:text-right">
              {price}
            </span>

            <button
              className="whitespace-nowrap text-[14px] leading-[20px] text-center align-middle 
              h-[30px] px-[22.5px] bg-surface-accent rounded-[20px]"
              onClick={onAddToCart}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
