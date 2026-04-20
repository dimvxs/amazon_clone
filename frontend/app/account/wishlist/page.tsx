"use client";
import placeholderImage from "@/assets/img/catalog-img.png";
import WishlistItem from "@/components/WishlistItem";
import { useRef } from "react";
import useDraggableScroll from "use-draggable-scroll";
import AddButton from "@/components/AddButton";

export default function AccountWishlist() {
  const ref = useRef<HTMLDivElement>(null!);
  const { onMouseDown } = useDraggableScroll(ref);
  const categories = [
    { id: 1, label: "All" },
    { id: 2, label: "Electronics list" },
    { id: 3, label: "Accessories" },
    { id: 4, label: "Dresses" },
    { id: 5, label: "Electonics list" },
    { id: 6, label: "For sport" },
    { id: 7, label: "For insta" },
    { id: 8, label: "Games" },
    { id: 9, label: "Food" },
    { id: 10, label: "For kitchen" },
    { id: 11, label: "Electronics list" },
    { id: 12, label: "Accessories" },
  ];
  const wishlistItems = [
    {
      id: 1,
      title: "Product 1",
      rating: 3.5,
      price: "1,899.30$",
      image: placeholderImage,
    },
    {
      id: 2,
      title: "Product 2",
      rating: 4.2,
      price: "2,499.00$",
      image: placeholderImage,
    },
  ];
  return (
    <div className="w-full flex flex-col">
      <div className="flex items-center justify-between w-full min-w-0 mb-[12px]">
        <div
          ref={ref}
          onMouseDown={onMouseDown}
          className="flex h-[40px] gap-[10px] w-full overflow-x-auto cursor-grab no-scrollbar mr-[16px]"
        >
          {categories.map((item) => (
            <span
              key={item.id}
              className="bg-card-light text-dark px-[15px] rounded-[10px] h-full flex items-center shrink-0"
            >
              {item.label}
            </span>
          ))}
        </div>
        <AddButton />
      </div>

      <span className="mb-[12px] font-semibold text-[16px] leading-[100%]">
        Electronics list Products
      </span>

      <div className="flex flex-col gap-3">
        {wishlistItems.map((item) => (
          <WishlistItem
            key={item.id}
            title={item.title}
            rating={item.rating}
            price={item.price}
            imageSrc={item.image}
          />
        ))}
      </div>
    </div>
  );
}
