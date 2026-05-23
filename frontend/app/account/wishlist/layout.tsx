"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import WishlistSlider from "@/components/WishlistSlider";
import React from "react";
import WishlistModal from "@/components/WishlistModal";
import WishlistHeader from "@/components/WishlistHeader";

const API = "http://localhost:5012/api/wishlist";
import { createDefaultWishlist, loadUserWishlists } from "@/lib/api/wishlist";
import ModalWrapper from "@/components/ModalWrapper";

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
  const [modalMode, setModalMode] = useState<
    "edit" | "create" | "delete" | null
  >(null);
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
  const handleDeleteList = () => {
    console.log("Wishlist Delete clicked:", {
      id: wishlistId,
      name: activeWishlist?.name ?? "unknown",
    });
    setModalMode("delete");
  };
  const handleAddWishlist = () => {
    setModalMode("create");
  };
  
  const confirmDeleteWishlist = async () => {
    try {
      const res = await fetch(`${API}/${wishlistId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        console.error("Failed to delete wishlist");
        return;
      }

      setWishlists((prev) => prev.filter((w) => w.id !== wishlistId));
      setModalMode(null);

      router.push("/account/wishlist");
    } catch (err) {
      console.error(err);
    }
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
      {modalMode === "delete" ? (
        <ModalWrapper
          title="Delete wishlist"
          onClose={() => setModalMode(null)}
        >
          <div className="flex flex-col gap-5">
            <p className="text-sm text-surface-accent-muted">
              Are you sure you want to delete this wishlist?
            </p>

            <button
              onClick={confirmDeleteWishlist}
              className="w-full rounded-xl bg-red-500 py-3 text-white font-medium"
            >
              Delete
            </button>
          </div>
        </ModalWrapper>
      ) : (
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
      )}
    </div>
  );
}
