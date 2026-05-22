"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import WishlistSlider from "@/components/WishlistSlider";
import React from "react";
import WishlistModal from "@/components/WishlistModal";
import WishlistHeader from "@/components/WishlistHeader";

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
  const [modalMode, setModalMode] = useState<"create" | "edit" | null>(null);

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

  const categories = wishlists.map((wishlist) => ({
    id: wishlist.id,
    label: wishlist.name,
  }));

  const title =
    categories.find((c) => c.id === wishlistId)?.label ?? "Wishlist";

  const activeWishlist = wishlists.find((w) => w.id === wishlistId);

  const handleSelect = (id: number) => {
    router.push(`/account/wishlist/${id}`);
  };

  const handleEditList = () => {
    console.log("Wishlist Edit clicked:", {
      id: wishlistId,
      name: activeWishlist?.name ?? "unknown",
    });

    setModalMode("edit");
  };
  const handleUpdateWishlist = (name: string) => {
    console.log("Updating wishlist:", {
      id: wishlistId,
      name,
    });

    setWishlists((prev) =>
      prev.map((w) => (w.id === wishlistId ? { ...w, name } : w)),
    );
  };
  const handleDeleteList = () => {
    console.log("Wishlist Delete clicked:", {
      id: wishlistId,
      name: activeWishlist?.name ?? "unknown",
    });
  };

  const handleAddWishlist = () => {
    setModalMode("create");
  };

  const handleCreateWishlist = async (name: string) => {
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
  
  return (
    <div className="w-full flex flex-col">
      <WishlistSlider
        categories={categories}
        onSelect={handleSelect}
        onAdd={handleAddWishlist}
        activeId={wishlistId}
      />

      <WishlistHeader
        title={title}
        onEdit={handleEditList}
        onDelete={handleDeleteList}
      />

      <div className="flex flex-col gap-3">{children}</div>

      <WishlistModal
        open={modalMode !== null}
        title={modalMode === "edit" ? "Edit list" : "Create list"}
        initialName={modalMode === "edit" ? activeWishlist?.name : ""}
        confirmLabel={modalMode === "edit" ? "Save changes" : "Create list"}
        onClose={() => setModalMode(null)}
        onSubmit={
          modalMode === "edit" ? handleUpdateWishlist : handleCreateWishlist
        }
      />
    </div>
  );
}
