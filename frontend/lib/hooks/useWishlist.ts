"use client";

const API_BASE = "http://localhost:5012";
const WISHLIST_API = `${API_BASE}/api/wishlist`;
const MY_WISHLIST_API = `${WISHLIST_API}/my`;
const WISHLIST_ITEM_API = `${API_BASE}/api/wishlistitem`;

type WishlistItem = {
  id: number;
  wishlistId: number;
  productId: number;
};

type Wishlist = {
  id: number;
  userId: number;
  name: string;
  items?: WishlistItem[];
};

const loadUserWishlists = async () => {
  const res = await fetch(MY_WISHLIST_API, {
    credentials: "include",
  });

  if (!res.ok) {
    console.error("Failed to load wishlists:", res.status);
    return [];
  }

  const wishlists: Wishlist[] = await res.json();

  return wishlists;
};

const createDefaultWishlist = async () => {
  const res = await fetch(WISHLIST_API, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "Default",
    }),
  });

  if (!res.ok) {
    console.error("Failed to create wishlist:", res.status);
    return null;
  }

  const created: Wishlist = await res.json();

  return created;
};

const selectWishlist = async () => {
  const wishlists = await loadUserWishlists();

  if (wishlists.length === 0) {
    const created = await createDefaultWishlist();

    if (!created) return null;

    return created.id;
  }

  if (wishlists.length === 1) {
    return wishlists[0].id;
  }

  const listText = wishlists
      .map((wishlist) => `${wishlist.id}: ${wishlist.name}`)
      .join("\n");

  const selectedId = window.prompt(`Choose wishlist ID:\n${listText}`);

  if (!selectedId) return null;

  const wishlistId = Number(selectedId);

  if (!Number.isFinite(wishlistId)) {
    console.error("Invalid wishlist id");
    return null;
  }

  const exists = wishlists.some((wishlist) => wishlist.id === wishlistId);

  if (!exists) {
    console.error("Wishlist not found");
    return null;
  }

  return wishlistId;
};

export function useWishlist() {
  const addToWishlist = async (productId: number) => {
    const wishlistId = await selectWishlist();

    if (!wishlistId) return;

    const res = await fetch(WISHLIST_ITEM_API, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId,
        wishlistId,
      }),
    });

    if (!res.ok) {
      console.error("Failed to add product to wishlist:", res.status);
      return;
    }

    console.log("Product added to wishlist");
  };

  const removeFromWishlist = async (wishlistItemId: number) => {
    const res = await fetch(`${WISHLIST_ITEM_API}/${wishlistItemId}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!res.ok) {
      console.error("Failed to remove product from wishlist:", res.status);
      return;
    }

    window.location.reload();
  };

  return {
    addToWishlist,
    removeFromWishlist,
  };
}
