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

const getCurrentUserId = () => {
    if (typeof window === "undefined") return null;

    const rawUser = localStorage.getItem("user");

    if (!rawUser) return null;

    try {
        const user = JSON.parse(rawUser);
        return user.id;
    } catch {
        return null;
    }
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
        const userId = getCurrentUserId();

        if (!userId) {
            console.error("User is not authorized");
            return;
        }

        const res = await fetch(API);

        if (!res.ok) {
            console.error("Failed to load wishlists:", res.status);
            return;
        }

        const data = await res.json();

        setWishlists(
            data.filter((wishlist: Wishlist) => wishlist.userId === userId)
        );
    };

    useEffect(() => {
        loadWishlists();
    }, []);

    const handleSelect = (id: number) => {
        router.push(`/account/wishlist/${id}`);
    };

    const handleAddWishlist = async () => {
        const userId = getCurrentUserId();

        if (!userId) {
            console.error("User is not authorized");
            return;
        }

        const name = window.prompt("Wishlist name");

        if (!name?.trim()) return;

        const res = await fetch(API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId,
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
