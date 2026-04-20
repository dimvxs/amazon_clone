"use client";
import placeholder from "@/assets/img/catalog-img.png";
import WishlistItem from "@/components/WishlistItem";

export default function AccountWishlist() {
  return (
    <div>
      <WishlistItem
        title="Product"
        rating={3.5}
        price="1,899.30$"
        imageSrc={placeholder}
      />
    </div>
  );
}
