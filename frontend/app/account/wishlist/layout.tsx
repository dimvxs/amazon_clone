"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import WishlistSlider from "@/components/WishlistSlider";

const API = "http://localhost:5012/api/wishlist";
const MY_WISHLIST_API = `${API}/my`;

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

    const loadWishlists = async () => {
        const res = await fetch(MY_WISHLIST_API, {
            credentials: "include",
        });

        if (!res.ok) {
            console.error("Failed to load wishlists:", res.status);
            return;
        }

        const data = await res.json();
        setWishlists(data);
    };

    useEffect(() => {
        loadWishlists();
    }, []);

    useEffect(() => {
        if (!wishlists.length) return;

        const exists = wishlists.some((wishlist) => wishlist.id === wishlistId);

        if (!exists) {
            router.replace(`/account/wishlist/${wishlists[0].id}`);
        }
    }, [wishlists, wishlistId, router]);

    const handleSelect = (id: number) => {
        router.push(`/account/wishlist/${id}`);
    };

    const handleAddWishlist = async () => {
        const name = window.prompt("Wishlist name");

        if (!name?.trim()) return;

        const res = await fetch(API, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name.trim(),
            }),
        });

        if (!res.ok) {
            console.error("Failed to create wishlist:", res.status);
            return;
        }

        const created = await res.json();

        setWishlists((prev) => [...prev, created]);
        router.push(`/account/wishlist/${created.id}`);
    };

    const categories = wishlists.map((wishlist) => ({
        id: wishlist.id,
        label: wishlist.name,
    }));

    const title =
        categories.find((c) => c.id === wishlistId)?.label ?? "Wishlist";

    return (
        <div className="w-full flex flex-col">
            <WishlistSlider
                categories={categories}
                onSelect={handleSelect}
                onAdd={handleAddWishlist}
                activeId={wishlistId}
            />

            <span className="mb-[12px] font-semibold text-[16px] leading-[100%]">
        {title} Products
      </span>

            <div className="flex flex-col gap-3">{children}</div>
        </div>
    );
}
