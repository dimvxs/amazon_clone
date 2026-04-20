"use client";

import { useRouter, useParams } from "next/navigation";
import WishlistSlider from "@/components/WishlistSlider";

export default function WishlistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const params = useParams();
  const categoryId = Number(params.categoryId);

  const categories = [
    { id: 1, label: "All" },
    { id: 2, label: "Electronics list" },
    { id: 3, label: "Accessories" },
    { id: 4, label: "Dresses" },
    { id: 5, label: "For sport" },
    { id: 6, label: "For insta" },
    { id: 7, label: "Games" },
    { id: 8, label: "Food" },
  ];
  const title =
    categories.find((c) => c.id === categoryId)?.label ?? "Wishlist";

  const handleSelect = (id: number) => {
    router.push(`/account/wishlist/${id}`);
  };
  return (
    <div className="w-full flex flex-col">
      <WishlistSlider categories={categories} onSelect={handleSelect} activeId={categoryId}/>

      <span className="mb-[12px] font-semibold text-[16px] leading-[100%]">
        {title} Products
      </span>

      <div className="flex flex-col gap-3">{children}</div>
    </div>
  );
}
