"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import WishlistSlider from "@/components/WishlistSlider";

const API = "http://localhost:5012/api/wishlist";

type Wishlist = {
  id: number;
  userId: number;
  name: string;
};

export default function WishlistLayout({
                                         children,
                                       }: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const params = useParams();
  const wishlistId = Number(params.categoryId);

  const [wishlists, setWishlists] = useState<Wishlist[]>([]);

  useEffect(() => {
    const loadWishlists = async () => {
      const res = await fetch(API);

      if (!res.ok) {
        console.error("Failed to load wishlists:", res.status);
        return;
      }

      const data = await res.json();
      setWishlists(data);
    };

    loadWishlists();
  }, []);

  const categories = wishlists.map((wishlist) => ({
    id: wishlist.id,
    label: wishlist.name,
  }));

  const title =
      categories.find((c) => c.id === wishlistId)?.label ?? "Wishlist";

  const handleSelect = (id: number) => {
    router.push(`/account/wishlist/${id}`);
  };

  return (
      <div className="w-full flex flex-col">
        <WishlistSlider
            categories={categories}
            onSelect={handleSelect}
            activeId={wishlistId}
        />

        <span className="mb-[12px] font-semibold text-[16px] leading-[100%]">
                {title} Products
            </span>

        <div className="flex flex-col gap-3">{children}</div>
      </div>
  );
}
