"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import WishlistSlider from "@/components/WishlistSlider";
import React from "react";
import WishlistModal from "@/components/WishlistModal";
import WishlistHeader from "@/components/WishlistHeader";

const API = "http://localhost:5012/api/wishlist";
import { createDefaultWishlist, loadUserWishlists } from "@/lib/api/wishlist";

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
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const init = async () => {
      const data = await loadUserWishlists();

      if (!data || data.length === 0) {
        const created = await createDefaultWishlist();

        if (created) {
          setWishlists([created]);
          router.replace(`/account/wishlist/${created.id}`);
        }
      } else {
        setWishlists(data);
      }

      setInitialized(true);
    };

    init();
  }, []);

  useEffect(() => {
    if (!initialized) return;
    if (!wishlists.length) return;

    const exists = wishlists.some((w) => w.id === wishlistId);

    if (!exists) {
      router.replace(`/account/wishlist/${wishlists[0].id}`);
    }
  }, [initialized, wishlists, wishlistId, router]);

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
